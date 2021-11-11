// SPDX-License-Identifier: MIT
pragma solidity >=0.6 <0.9.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PapaPay is ReentrancyGuard {

  uint public papaCount;

  mapping (uint => Papa) private papas;

  struct Papa {
          // Short description of the contract 
          string papaDesc;
          // Course number (unique)
          uint papaCourse;
          // Total price for the course
          uint papaPrice;
          // Amount of lessons
          uint papaLessons;
          // Timelock period in days. After that the student can recover his tokens
          uint8 papaLock;
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

  event CourseCreated (uint papaCourse, string papaDesc);
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

  constructor()  {
  }

/// Anyone who call this function will be a Tutor. Tutor creates the course, wich includes number of lessons, total cost, address of student and a time lock
  function papaCreate( string memory _papaDesc, uint _papaPrice, uint _papaLessons, uint8 _papaLock, address _papaStudent ) 
    external 
    returns (bool)
    {
      require(_papaLock <= 168,"Timelock cannot exceed 7 days or 168 hours");
      require(msg.sender != _papaStudent,"Student and teacher cannot be the same");
      papas[papaCount] = Papa({
        papaDesc: _papaDesc,
        papaCourse: papaCount,
        papaPrice: _papaPrice,
        papaBalance: 0,
        papaLessons: _papaLessons,
        papaLock: _papaLock,
        papaTS: 0,
        papaTutor: msg.sender,
        papaTutorSign: 0,
        papaStudent: _papaStudent,
        papaStudentSign: 0,
        papaWithdrew: 0
        });
      emit CourseCreated(papaCount, _papaDesc);
      papaCount = papaCount +1;
      return true;
    }

/// Only a student can access this
/// Student approves that contract, the total cost of the course is deducted from student wallet and stored on the contract

  function papaApprove(uint _papaCourse)
    external
    payable 
    isStudent(_papaCourse) 
    zeroBalance(_papaCourse) 
    exactBalance(_papaCourse)
    {
      papas[_papaCourse].papaBalance += msg.value;
      papas[_papaCourse].papaTS = block.timestamp + (papas[_papaCourse].papaLock * 60);
      emit CourseDeposit(_papaCourse,msg.value);
    }

/// List all courses for any given address
  function papaView(address _anyaddress) 
    external 
    view 
    { }

/// Only a tutor can access this
/// The tutor calls for the start of an individual lesson. The tutor cannot sign this if the student didn't sign attendance
  function papaInitLesson(uint _papaCourse) 
    external 
    {
      require (msg.sender == papas[_papaCourse].papaTutor, "Not a Tutor");
      require (papas[_papaCourse].papaBalance != 0, "Course has no balance");
      require (papas[_papaCourse].papaTutorSign != papas[_papaCourse].papaLessons, "All lessons were given");
      require (papas[_papaCourse].papaTutorSign < papas[_papaCourse].papaStudentSign, "Student didn't sign attendance");
      papas[_papaCourse].papaTutorSign += 1;
      papas[_papaCourse].papaTS = block.timestamp + (papas[_papaCourse].papaLock * 60);
      emit LessonStarted(_papaCourse,papas[_papaCourse].papaTutorSign);
    }

/// Only a student can access this  
/// The student is giving attendance, making possible a partial withdrawn for the teacher
  function papaAttendLesson(uint _papaCourse) 
    external 
    {
      require (msg.sender == papas[_papaCourse].papaStudent, "Not a student");
      require (papas[_papaCourse].papaBalance != 0, "Course has no balance");
      require (papas[_papaCourse].papaStudentSign != papas[_papaCourse].papaLessons, "All lessons were taken");
      require (papas[_papaCourse].papaStudentSign == papas[_papaCourse].papaTutorSign, "You already signed attendace. Lesson not started");
      papas[_papaCourse].papaStudentSign += 1;
      emit LessonAttended(_papaCourse,papas[_papaCourse].papaStudentSign);
    }

/// Only a tutor can access this
/// Tutor can withdraw one lesson at a time, or multiple lessons given at once
  function papaWithdraw(uint _papaCourse) 
    external
    nonReentrant
    {
      require (msg.sender == papas[_papaCourse].papaTutor, "Not a tutor");
      require (papas[_papaCourse].papaBalance != 0 && papas[_papaCourse].papaTutorSign != 0,"Check course balance or lesson signature");
      require (papas[_papaCourse].papaTutorSign != papas[_papaCourse].papaWithdrew,"Already withdrawn your last lesson");
      uint papaAmount = (papas[_papaCourse].papaPrice / papas[_papaCourse].papaLessons) * (papas[_papaCourse].papaTutorSign - papas[_papaCourse].papaWithdrew);
      papas[_papaCourse].papaWithdrew = papas[_papaCourse].papaTutorSign;
      papas[_papaCourse].papaBalance = papas[_papaCourse].papaBalance - papaAmount;
      (bool sent, ) = msg.sender.call{value: papaAmount}("");
      require(sent, "Failed to send Ether");
    }

/// Only a student can access this
/// If a time lock for unfulfillment is set, after that period of time, the student can recover all of his remaining tokens
  function papaRecover(uint _papaCourse) 
  external 
  nonReentrant
  {
    require (msg.sender == papas[_papaCourse].papaStudent, "Not a student");
    require (papas[_papaCourse].papaBalance != 0,"Course has no balance");
    require (block.timestamp >= papas[_papaCourse].papaTS,"Timelock has not expired yet");
    uint _recover = papas[_papaCourse].papaBalance;
    papas[_papaCourse].papaBalance = 0;
    (bool sent, ) = msg.sender.call{value: _recover}("");
    require(sent, "Failed to send Ether");
  }

  fallback () external {
///  A fallback here
  }

}