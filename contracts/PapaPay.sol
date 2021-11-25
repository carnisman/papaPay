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
    event CourseCreated (uint papaCourse, bytes32 papaDesc, uint papaPrice, uint papaLessons, uint papaLock, address papaTutor, address papaStudent);
    event CourseDeposit (uint papaCourse, address papaStudent, uint papaBalance);
    event LessonStarted (uint papaCourse, address papaTutor, uint papaTutorSign);
    event LessonAttended (uint papaCourse, address papaStudent, uint papaStudentSign);
    event TutorWithdraw (uint papaCourse, address papaTutor, uint withdrawn);
    event StudentRecover (uint papaCourse, address papaStudent, uint recovered);

///
///    MODIFIERS
///
    modifier isTutor(uint _papaCourse) {
        require(msg.sender == papas[_papaCourse].papaTutor, "Not a tutor");
        _;
    }

    modifier isStudent(uint _papaCourse) {
        require(msg.sender == papas[_papaCourse].papaStudent, "Not a student");
        _;
    }

    modifier notSame(address _papaStudent) {
        require(msg.sender != _papaStudent, "Student and teacher cannot be the same");
        _;
    }

    modifier zeroBalance(uint _papaCourse) {
        require(papas[_papaCourse].papaBalance == 0, "Course already funded");
        _;
    }

    modifier hasBalance(uint _papaCourse){
        require(papas[_papaCourse].papaBalance > 0, "Course has no balance");
        _;
    }

    modifier exactBalance(uint _papaCourse) {
        require(msg.value == papas[_papaCourse].papaPrice, "Not enough ETH");
        _;
    }

    modifier priceNotZero(uint _papaPrice) {
        require(_papaPrice > 0, "Price cannot be 0");
        _;
    }

    modifier lessonsNotZero(uint _papaLessons) {
        require(_papaLessons > 0, "Lessons cannot be 0");
        _;
    }

    modifier lessonsTaken(uint _papaCourse) {
        require(papas[_papaCourse].papaStudentSign < papas[_papaCourse].papaLessons, "All lessons were taken");
        _;
    }

    modifier lessonsGiven(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign < papas[_papaCourse].papaLessons, "All lessons were given"); 
        _;
    }

    modifier studentSignedBeforeTutor(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign < papas[_papaCourse].papaStudentSign, "Student didn't sign attendance");
        _;
    }

    modifier studentAlreadySigned(uint _papaCourse) {
        require(papas[_papaCourse].papaStudentSign == papas[_papaCourse].papaTutorSign, "You already signed attendace. Lesson not started");
        _;
    }

    modifier tutorInittedLesson(uint _papaCourse) {
        require(papas[_papaCourse].papaTutorSign > 0, "You must give at least one lesson before withdraw");
        _;
    }

    modifier noGivenLessons(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign == 0, "Cannot reactivate a course if you received at least one lesson");
        _;
    }

    modifier tutorCanWithdraw(uint _papaCourse){
        require(papas[_papaCourse].papaTutorSign != papas[_papaCourse].papaWithdrew,"Already withdrawn your available balance");
        _;
    }

    modifier timelock(uint _papaCourse){
        require(block.timestamp >= papas[_papaCourse].papaTS,"Timelock has not expired yet");
        _;
    }

 /// constructor()  {
 /// }

/// Anyone who call this function will be a Tutor. Tutor creates the course, 
/// wich includes number of lessons, total cost, address of student and a time lock
    function papaCreate( bytes32 _papaDesc, uint _papaPrice, uint _papaLessons, uint _papaLock, address _papaStudent ) 
    external
    notSame(_papaStudent)
    priceNotZero(_papaPrice)
    lessonsNotZero(_papaLessons)
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
/// Student approves that contract, the total cost of the course 
/// is deducted from student wallet and stored on the contract

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

/// Only a tutor can access this
/// The tutor calls for the start of an individual lesson. The tutor cannot sign this if the student didn't sign attendance
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

/// Only a student can access this  
/// The student is giving attendance, making possible a partial withdrawn for the teacher
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
/// Tutor can withdraw one lesson at a time, or multiple lessons given at once
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
/// If a time lock for unfulfillment is set, after that period of time, the student can recover all of his remaining assets
    function papaRecover(uint _papaCourse) 
    external 
    nonReentrant
    isStudent(_papaCourse)
    hasBalance(_papaCourse)
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
  /// TEST TEST TEST
   function fetchCourse(uint _papaCourse) public view
      returns (uint papaCourse, bytes32 papaDesc, uint papaPrice, uint papaLessons, uint papaLock, address papaTutor, address papaStudent)
    {
        papaDesc = papas[_papaCourse].papaDesc;
        papaCourse = papas[_papaCourse].papaCourse;
        papaPrice = papas[_papaCourse].papaPrice;
        papaLessons = papas[_papaCourse].papaLessons;
        papaLock = papas[_papaCourse].papaLock;
        papaTutor = papas[_papaCourse].papaTutor;
        papaStudent = papas[_papaCourse].papaStudent;
        return (papaCourse, papaDesc, papaPrice, papaLessons, papaLock, papaTutor, papaStudent);
    }
}