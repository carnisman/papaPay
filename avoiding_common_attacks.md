# Avoiding common attacks

## SWC-101 (Integer Overflow and Underflow)

We use compiler pragma `0.8.10` because starting with solidity 0.8 the compiler has built in overflow checking.

## SWC-103 (Floating pragma)

We use compiler pragma `0.8.10` to avoid using outdated compiler versions who can have bugs that affect the contract system negatively 

## SWC-105 (Unprotected Ether Withdrawal)

The withdraw functions (papaWithdraw and papaRecover) implements access control, papaWithdraw can only be executed by a tutor address, and papaRecover by a student address.

## SWC-107 (Reentrancy)

The withdraw functions (papaWithdraw and papaRecover) implements the OpenZeppelin ReentrancyGuard modifier

## Checks-Effects-Interactions

The withdraw functions (papaWithdraw and papaRecover) are written taking in account the Checks-Effects-Interactions model

## Modifiers used only for validation

All modifiers only use `require` for validating.