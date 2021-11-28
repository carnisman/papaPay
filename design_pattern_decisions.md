# Design patterns used

## Access Control Design Patterns

- The function papaInitLesson and papaWithdraw can only be accessed by the tutor who created the course. The functions papaApprove, papaAttendLesson and papaRecover can only be accessed by the student specified in the course

## Inherits

- We inherit OpenZeppelin´s ReentrancyGuard in withdrawal functions papaWithdraw and papaRecover to protect against reentrancy attacks