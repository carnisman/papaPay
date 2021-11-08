// SPDX-License-Identifier: MIT
pragma solidity >=0.6 <0.9.0;

//import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PapaPay is ReentrancyGuard {
  
  //using ECDSA for bytes32;

  uint public papaCount;

  mapping (uint => Papa) private papas;

  bool locked = false;

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
    // Balance of Course
    uint papaBalance;
    // Teacher and student addresses
    address papaTutor;
    address papaStudent;
  }

//
//    EVENTS
//

  event CourseCreated (uint papaCourse);
  event CourseDeposit (uint papaCourse, uint papaBalance);

//
//    MODIFIERS
//


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

	// Tutor creates the course, wich includes number of lessons, total cost, address of student and a time lock
  function papaCreate( string memory _papaDesc, uint _papaPrice, uint _papaLessons, uint _papaLock, address _papaStudent ) 
    public 
    returns (bool) 
    {
      papas[papaCount] = Papa({
        papaDesc: _papaDesc,
        papaCourse: papaCount,
        papaPrice: _papaPrice,
        papaBalance: 0,
        papaLessons: _papaLessons,
        papaLock: _papaLock,
        papaTutor: msg.sender,
        papaStudent: _papaStudent
        });
      emit CourseCreated(papaCount);
      papaCount = papaCount +1;
      return true;
    }

  // Student approves that contract, the total cost of the course is deducted from student wallet and stored on the contract
  // Pensar requires: msg.value=papaPrice
  function papaApprove(uint _papaCourse)
    external
    payable 
    isStudent(_papaCourse) 
    zeroBalance(_papaCourse) 
    exactBalance(_papaCourse)
    {
      papas[_papaCourse].papaBalance += msg.value;
      emit CourseDeposit(_papaCourse,msg.value);
    }

  function papaView(address _anyaddress) public view {

	// List all courses for any given address

  }

  // The tutor calls for the start of an individual lesson
  // requires msg.sender=tutor balance!=0 
  function papaInit(address _tutor, uint _papaCourse) 
  external 
  {

  

  }

  function papaAssist(address _student, uint _papaCourse) public {

  // The student is giving attendance, making possible a partial withdrawn for the teacher

  }

  function papaWithdrawn(address _tutor, uint _papaCourse) public {
   // require(!locked, "Reentrant call detected!");
   // locked = true;
   // ...
   // locked = false;
  // The teacher can make withdrawns from here

  }

  function papaRecover(address _student, uint _papaCourse) public {

  // If a time lock for unfulfillment is set, after that period of time, the student can recover all of his remaining tokens

  }

  fallback () external {
  //  A fallback here
  }

}
