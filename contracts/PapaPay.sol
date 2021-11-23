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
        // Teacher and student addresses and signed assistance
        address papaTutor;
        uint papaTutorSign;
        address papaStudent;
        uint papaStudentSign;
        // Withdrawn lessons
        uint papaWithdrew;
    }
  
///
///    EVENTS
///
    event CourseCreated (uint papaCourse, bytes32 papaDesc);
    event CourseDeposit (uint papaCourse, uint papaBalance);
    event LessonStarted (uint papaCourse, uint papaTutorSign);
    event LessonAttended (uint papaCourse, uint papaStudentSign);

///
///    MODIFIERS
///
    modifier isStudent(uint _papaCourse) {
        require(msg.sender == papas[_papaCourse].papaStudent, "Not a student");
        _;
    }

    modifier zeroBalance(uint _papaCourse) {
        require(papas[_papaCourse].papaBalance == 0, "Course already funded");
        _;
    }

    modifier exactBalance(uint _papaCourse) {
        require(msg.value == papas[_papaCourse].papaPrice, "Not enough ETH");
        _;
    }
 /// constructor()  {
 /// }

/// Anyone who call this function will be a Tutor. Tutor creates the course, 
/// wich includes number of lessons, total cost, address of student and a time lock
    function papaCreate( bytes32 _papaDesc, uint _papaPrice, uint _papaLessons, uint _papaLock, address _papaStudent ) 
    external 
    {
        require(msg.sender != _papaStudent, "Student and teacher cannot be the same");
        require(_papaPrice > 0, "Price cannot be 0");
        require(_papaLessons > 0, "Lessons cannot be 0");
        papas[papaCount].papaDesc = _papaDesc;
        papas[papaCount].papaCourse = papaCount;
        papas[papaCount].papaPrice = _papaPrice;
        papas[papaCount].papaLessons = _papaLessons;
        papas[papaCount].papaLock = _papaLock;
        papas[papaCount].papaTutor = msg.sender;
        papas[papaCount].papaStudent = _papaStudent;
        emit CourseCreated(papaCount, _papaDesc);
        papaCount = papaCount+1;
    }
/// Only a student can access this
/// Student approves that contract, the total cost of the course 
/// is deducted from student wallet and stored on the contract

    function papaApprove(uint _papaCourse)
    external
    payable 
    isStudent(_papaCourse) 
    zeroBalance(_papaCourse) 
    exactBalance(_papaCourse)
    {
        papas[_papaCourse].papaBalance += msg.value;
        papas[_papaCourse].papaTS = block.timestamp + (papas[_papaCourse].papaLock * 60);
        emit CourseDeposit(_papaCourse, msg.value);
    }

/// Only a tutor can access this
/// The tutor calls for the start of an individual lesson. The tutor cannot sign this if the student didn't sign attendance
    function papaInitLesson(uint _papaCourse) 
    external 
    {
        require(msg.sender == papas[_papaCourse].papaTutor, "Not a Tutor");
        require(papas[_papaCourse].papaBalance != 0, "Course has no balance");
        require(papas[_papaCourse].papaTutorSign < papas[_papaCourse].papaLessons, "All lessons were given");
        require(papas[_papaCourse].papaTutorSign < papas[_papaCourse].papaStudentSign, "Student didn't sign attendance");
        papas[_papaCourse].papaTutorSign += 1;
        papas[_papaCourse].papaTS = block.timestamp + (papas[_papaCourse].papaLock * 60);
        emit LessonStarted(_papaCourse,papas[_papaCourse].papaTutorSign);
    }

/// Only a student can access this  
/// The student is giving attendance, making possible a partial withdrawn for the teacher
    function papaAttendLesson(uint _papaCourse) 
    external 
    {
        require(msg.sender == papas[_papaCourse].papaStudent, "Not a student");
        require(papas[_papaCourse].papaBalance != 0, "Course has no balance");
        require(papas[_papaCourse].papaStudentSign < papas[_papaCourse].papaLessons, "All lessons were taken");
        require(papas[_papaCourse].papaStudentSign == papas[_papaCourse].papaTutorSign, "You already signed attendace. Lesson not started");
        papas[_papaCourse].papaStudentSign += 1;
        emit LessonAttended(_papaCourse, papas[_papaCourse].papaStudentSign);
    }

/// Only a tutor can access this
/// Tutor can withdraw one lesson at a time, or multiple lessons given at once
    function papaWithdraw(uint _papaCourse) 
    external
    nonReentrant
    {
        require(msg.sender == papas[_papaCourse].papaTutor, "Not a tutor");
        require(papas[_papaCourse].papaBalance != 0 && papas[_papaCourse].papaTutorSign != 0,"Check course balance or lesson signature");
        require(papas[_papaCourse].papaTutorSign != papas[_papaCourse].papaWithdrew,"Already withdrawn your last lesson");
        uint papaAmount = (papas[_papaCourse].papaPrice / papas[_papaCourse].papaLessons) * (papas[_papaCourse].papaTutorSign - papas[_papaCourse].papaWithdrew);
        papas[_papaCourse].papaWithdrew = papas[_papaCourse].papaTutorSign;
        papas[_papaCourse].papaBalance = papas[_papaCourse].papaBalance - papaAmount;
        (bool sent, ) = msg.sender.call{value: papaAmount}("");
        require(sent, "Failed to send Ether");
    }

/// Only a student can access this
/// If a time lock for unfulfillment is set, after that period of time, the student can recover all of his remaining assets
    function papaRecover(uint _papaCourse) 
    external 
    nonReentrant
    {
        require(msg.sender == papas[_papaCourse].papaStudent, "Not a student");
        require(papas[_papaCourse].papaBalance != 0,"Course has no balance");
        require(block.timestamp >= papas[_papaCourse].papaTS,"Timelock has not expired yet");
        uint _recover = papas[_papaCourse].papaBalance;
        papas[_papaCourse].papaBalance = 0;
        (bool sent, ) = msg.sender.call{value: _recover}("");
        require(sent, "Failed to send Ether");
    }

    fallback () external {
///  A fallback here
    }
  /// TEST TEST TEST
  // function fetchItem(uint _sku) public view
  //    returns (string memory name, uint sku, uint price, uint state, address seller, address buyer)
  //  {
  //    name = items[_sku].name;
  //    sku = items[_sku].sku;
  //    price = items[_sku].price;
  //    state = uint(items[_sku].state);
  //    seller = items[_sku].seller;
  //    buyer = items[_sku].buyer;
  //    return (name, sku, price, state, seller, buyer);
  //  }
}