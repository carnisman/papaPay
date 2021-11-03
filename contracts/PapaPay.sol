// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PapaPay {

  uint public papaCount;

  mapping (uint => Papa) public papas;

  // <enum State: ForSale, Sold, Shipped, Received>

  enum State {LessonStarted, LessonAssist, CourseDeposit, CourseWithdrawn}

  // <struct Item: name, sku, price, state, seller, and buyer>

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
    uint papaLock;
    // Can we use the enum to check the given lessons?
    State state;
    // Balance of Course
    uint papaBalance;
    // Teacher and student addresses
    address payable papaTutor;
    address payable papaStudent;
  }

  event CourseCreated (uint papaCourse);

  constructor() public {
  }
	// Tutor creates the course, wich includes number of lessons, total cost, address of student and a time lock
  // Requires price != 0
  function papaCreate( uint _papaDesc, uint _papaPrice, uint _papaLessons, uint _papaLock, address _papaStudent ) public returns (bool) {
    papas[papaCourse] = Papa({
      papaDesc: _papaDesc,
      papaCourse: papaCount,
      papaPrice: _price,
      papaLessons: _papaLessons,
      papaLock: _papaLock,
      papaTutor: msg.sender,
      papaStudent: _papaStudent
       });
    emit CourseCreated(papaCount);
    papaCount=papaCount +1;
    return true;
  }

  // Student approves that contract, the total cost of the course is deducted from student wallet and stored on the contract
  // Pensar requires: papaStudent=msg.sender, papaBalance=0
  function papaApprove(address _student, uint _papaCourse) public payable {

	

  }

  function papaView(address _anyaddress) public view {

	// List all courses for any given address

  }

  function papaInit(address _tutor, uint _papaCourse) {

  // The tutor calls for the start of an individual lesson

  }

  function papaAssist(address _student, uint _papaCourse) {

  // The student is giving attendance, making possible a partial withdrawn for the teacher

  }

  function papaWithdrawn(address _tutor, uint _papaCourse) {

  // The teacher can make withdrawns from here

  }

  function papaRecover(address _student, uint _papaCourse) {

  // If a time lock for unfulfillment is set, after that period of time, the student can recover all of his remaining tokens

  }

  function () {
  //  A fallback here
  }

}
