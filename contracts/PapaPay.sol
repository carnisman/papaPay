// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract PapaPay is ReentrancyGuard {

    uint public papaCount;

    mapping (uint => Papa) public papas;

    struct Papa {
        // Short description of the contract 
        bytes32 papaDesc;
        // Course number (unique)
        uint papaCourse;
        // Total price for the course
        uint papaPrice;
        // Amount of lessons
        uint papaLessons;
        // Timelock period in days. After that the student can recover his tokens
        uint papaLock;
        // Timestamp
        uint papaTS;
        // Balance of Course
        uint papaBalance;
        // Tutor address
        address papaTutor;
        // Tutor per-lesson signature
        uint papaTutorSign;
        // Student address
        address papaStudent;
        // Student per-lesson signature
        uint papaStudentSign;
        // Teacher withdrawn lessons - this variable is for making calculations on how much balance the tutor has available
        uint papaWithdrew;
    }
  
///
///    EVENTS
///
    event CourseCreated (uint papaCount, bytes32 papaDesc, uint papaPrice, uint papaLessons, uint papaLock, address papaTutor, address papaStudent);
    event CourseDeposit (uint papaCourse, address papaStudent, uint papaBalance);
    event LessonStarted (uint papaCourse, address papaTutor, uint papaTutorSign);
    event LessonAttended (uint papaCourse, address papaStudent, uint papaStudentSign);
    event TutorWithdraw (uint papaCourse, address papaTutor, uint withdrawn);
    event StudentRecover (uint papaCourse, address papaStudent, uint recovered);

///
///    MODIFIERS
///

/// This modifier checks if sender is a tutor
    modifier isTutor(uint _papaCourse) {
        require(msg.sender == papas[_papaCourse].papaTutor, "Not a tutor");
        _;
    }

/// This modifier checks if sender is a student
    modifier isStudent(uint _papaCourse) {
        require(msg.sender == papas[_papaCourse].papaStudent, "Not a student");
        _;
    }

/// This modifier checks that student and tutor are not the same
    modifier notSame(address _papaStudent) {
        require(msg.sender != _papaStudent, "Student and teacher cannot be the same");
        _;
    }


/// This modifier checks that student´s address isn´t empty
    modifier hasStudent(address _papaStudent){
        require(_papaStudent!=address(0), "Student address cannot be empty");
        _;
    }

/// This modifier checks that balance is 0
    modifier zeroBalance(uint _papaCourse) {
        require(papas[_papaCourse].papaBalance == 0, "Course already funded");
        _;
    }

/// This modifier checks that balance is 0
    modifier hasBalance(uint _papaCourse){
        require(papas[_papaCourse].papaBalance > 0, "Course has no balance");
        _;
    }

/// This modifier checks that the transferred value is equal to course price
    modifier exactBalance(uint _papaCourse) {
        require(msg.value == papas[_papaCourse].papaPrice, "Must transfer exact price");
        _;
    }

/// This modifier checks that the price isn´t 0
    modifier priceNotZero(uint _papaPrice) {
        require(_papaPrice > 0, "Price cannot be 0");
        _;
    }

/// This modifier checks that lessons aren´t 0
    modifier lessonsNotZero(uint _papaLessons) {
        require(_papaLessons > 0, "Lessons cannot be 0");
        _;
    }

/// This modifier checks that the student doesn´t attend more lessons that the total of papaLessons
    modifier lessonsTaken(uint _papaCourse) {
        require(papas[_papaCourse].papaStudentSign < papas[_papaCourse].papaLessons, "All lessons were taken");
        _;
    }

/// This modifier checks that the tutor doesn´t give more lessons that the total of papaLessons
    modifier lessonsGiven(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign < papas[_papaCourse].papaLessons, "All lessons were given"); 
        _;
    }

/// This modifier checks that the tutor doesn´t sign before the student
    modifier studentSignedBeforeTutor(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign < papas[_papaCourse].papaStudentSign, "Student didn't sign attendance");
        _;
    }

/// This modifier checks that the student doesn´t sign attendance before the tutor starts an already signed lessons (avoids double signing) 
    modifier studentAlreadySigned(uint _papaCourse) {
        require(papas[_papaCourse].papaStudentSign == papas[_papaCourse].papaTutorSign, "You already signed attendace. Lesson not started by tutor");
        _;
    }

/// This modifier checks that the tutor has given at least one lesson, cannot withdraw before that
    modifier tutorInittedLesson(uint _papaCourse) {
        require(papas[_papaCourse].papaTutorSign > 0, "You must give at least one lesson before withdraw");
        _;
    }

/// This modifier checks that the course has no given lessons, used to avoid re-funding of course
    modifier noGivenLessons(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign == 0, "Cannot reactivate a course if you received at least one lesson");
        _;
    }

/// This modifier checks that the amount of given lessons isn´t equal to withdraws
    modifier tutorCanWithdraw(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign > papas[_papaCourse].papaWithdrew,"Already withdrawn your available balance");
        _;
    }

/// This modifier checks that there is any availble balance to recover
    modifier studentCanWithdraw(uint _papaCourse){
        uint papaTutorAmount = (papas[_papaCourse].papaPrice / papas[_papaCourse].papaLessons) * (papas[_papaCourse].papaTutorSign - papas[_papaCourse].papaWithdrew);
        uint recover = papas[_papaCourse].papaBalance - papaTutorAmount;
        require(recover !=0,"Course has no balance left to recover");
        _;
    }

/// This modifier checks timelock expiration
    modifier timelock(uint _papaCourse){
        require(block.timestamp >= papas[_papaCourse].papaTS,"Timelock has not expired yet");
        _;
    }

/// constructor()  {
/// }

/// Anyone who call this function will be a Tutor. Tutor creates the course, 
/// wich includes number of lessons, total cost, address of student and a time lock
/// Requires: the address of the tutor and student cannot be the same, the price and lesson
/// quantity cannot be zero, and the student address cannot be empty.

    function papaCreate( bytes32 _papaDesc, uint _papaPrice, uint _papaLessons, uint _papaLock, address _papaStudent ) 
    external
    notSame(_papaStudent)
    priceNotZero(_papaPrice)
    lessonsNotZero(_papaLessons)
    hasStudent(_papaStudent)
    {
        papas[papaCount].papaDesc = _papaDesc;
        papas[papaCount].papaCourse = papaCount;
        papas[papaCount].papaPrice = _papaPrice;
        papas[papaCount].papaLessons = _papaLessons;
        papas[papaCount].papaLock = _papaLock;
        papas[papaCount].papaTutor = msg.sender;
        papas[papaCount].papaStudent = _papaStudent;
        emit CourseCreated(papaCount, _papaDesc, _papaPrice, _papaLessons, _papaLock, msg.sender,_papaStudent);
        papaCount = papaCount+1;
    }
/// Only a student can access this
/// Student approves the course conditions, and deposits the total price in the course balance.
/// This updates the timestamp (TS) variable, resetting the timelock
/// Requires: the address making this tx must be the student´s one, the course doesn´t had to 
/// have any lesson started by the tutor, the balance must be equal to zero and this only allows 
/// exact payment, no less, no more.

    function papaApprove(uint _papaCourse)
    external
    payable 
    isStudent(_papaCourse)
    noGivenLessons(_papaCourse)
    zeroBalance(_papaCourse) 
    exactBalance(_papaCourse)
    {
        papas[_papaCourse].papaBalance += msg.value;
        papas[_papaCourse].papaTS = block.timestamp + (papas[_papaCourse].papaLock * 60);
        emit CourseDeposit(_papaCourse, msg.sender, msg.value);
    }

/// Only a tutor can access this.
/// The tutor calls for the start of an individual lesson. The tutor cannot sign this if the student didn't sign attendance. 
/// This updates the timestamp (TS) variable, resetting the timelock
/// Requires: the address making this tx must be the tutor´s one, the course must have balance, 
/// the amount of lessons given must be lower than lesson quantity and the amount of lessons 
/// given must be lower than lessons taken, so without student attending the tutor cannot init class

    function papaInitLesson(uint _papaCourse) 
    external
    isTutor(_papaCourse)
    hasBalance(_papaCourse)
    lessonsGiven(_papaCourse)
    studentSignedBeforeTutor(_papaCourse)
    {
        papas[_papaCourse].papaTutorSign += 1;
        papas[_papaCourse].papaTS = block.timestamp + (papas[_papaCourse].papaLock * 60);
        emit LessonStarted(_papaCourse, msg.sender, papas[_papaCourse].papaTutorSign);
    }

/// Only a student can access this.
/// The student is giving attendance, allowing a partial withdraw for the teacher.
/// Requires: the address making this tx must be the student´s one, the course must have balance, 
/// the amount of lessons attended must be lower than lesson quantity and the amount of lessons 
/// given and taken must be equal

    function papaAttendLesson(uint _papaCourse) 
    external 
    isStudent(_papaCourse)
    hasBalance(_papaCourse)
    lessonsTaken(_papaCourse)
    studentAlreadySigned(_papaCourse)
    {
        papas[_papaCourse].papaStudentSign += 1;
        emit LessonAttended(_papaCourse, msg.sender,papas[_papaCourse].papaStudentSign);
    }

/// Only a tutor can access this
/// Tutor can withdraw balance for one lesson at a time, or multiple lessons given, at once
/// Requires: Reentrancy guard, the address making this tx must be the tutor´s one, the course must have balance, 
/// tutor must have given at least one lesson and the amount of withdrawals cannot be the same as lessons given

    function papaWithdraw(uint _papaCourse) 
    external
    nonReentrant
    isTutor(_papaCourse)
    hasBalance(_papaCourse)
    tutorInittedLesson(_papaCourse)
    tutorCanWithdraw(_papaCourse)
    {
        uint papaAmount = (papas[_papaCourse].papaPrice / papas[_papaCourse].papaLessons) * (papas[_papaCourse].papaTutorSign - papas[_papaCourse].papaWithdrew);
        papas[_papaCourse].papaWithdrew = papas[_papaCourse].papaTutorSign;
        papas[_papaCourse].papaBalance = papas[_papaCourse].papaBalance - papaAmount;
        (bool sent, ) = msg.sender.call{value: papaAmount}("");
        require(sent, "Failed to send Ether");
        emit TutorWithdraw(_papaCourse, msg.sender, papaAmount);
    }

/// Only a student can access this
/// If a time lock for is set the student can recover all of his remaining assets after that period of time
/// Requires: Reentrancy guard, the address making this tx must be the student´s one, the course must have balance, 
/// there must be balance available to withdraw for the student (for lessons not given) and the timelock period must
/// be over

    function papaRecover(uint _papaCourse) 
    external 
    nonReentrant
    isStudent(_papaCourse)
    hasBalance(_papaCourse)
    studentCanWithdraw(_papaCourse)
    timelock(_papaCourse)
    {
        uint papaTutorAmount = (papas[_papaCourse].papaPrice / papas[_papaCourse].papaLessons) * (papas[_papaCourse].papaTutorSign - papas[_papaCourse].papaWithdrew);
        uint _recover = papas[_papaCourse].papaBalance - papaTutorAmount;
        papas[_papaCourse].papaBalance = papaTutorAmount;
        (bool sent, ) = msg.sender.call{value: _recover}("");
        require(sent, "Failed to send Ether");
        emit StudentRecover(_papaCourse, msg.sender, _recover);
    }

    fallback () external {
///  A fallback here
    }
     /// TEST TEST TEST ---  If you want to run tests, please uncomment the following commented lines (but not this one! :-))--- TEST TEST TEST
        // function fetchCourse(uint _papaCourse) public view
        //    returns (uint papaCourse, bytes32 papaDesc, uint papaPrice, uint papaLessons, uint papaLock, address papaTutor, address papaStudent, uint papaBalance, uint papaStudentSign, uint papaTutorSign, uint papaTS, uint papaWithdrew)
        //  {
        //      papaDesc = papas[_papaCourse].papaDesc;
        //      papaCourse = papas[_papaCourse].papaCourse;
        //      papaPrice = papas[_papaCourse].papaPrice;
        //      papaLessons = papas[_papaCourse].papaLessons;
        //      papaLock = papas[_papaCourse].papaLock;
        //      papaTutor = papas[_papaCourse].papaTutor;
        //      papaStudent = papas[_papaCourse].papaStudent;
        //      papaBalance = papas[_papaCourse].papaBalance;
        //      papaTutorSign = papas[_papaCourse].papaTutorSign;
        //      papaStudentSign = papas[_papaCourse].papaStudentSign;
        //      papaTS = papas[_papaCourse].papaTS;
        //      papaWithdrew = papas[_papaCourse].papaWithdrew;

        //      return (papaCourse, papaDesc, papaPrice, papaLessons, papaLock, papaTutor, papaStudent, papaBalance, papaTutorSign, papaStudentSign, papaTS, papaWithdrew);
        //  }
}