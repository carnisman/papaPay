# Final project - PapaPay - A web3 payment system between tutor and students

## Deployed version url:

https://papapay.ordinar.io

## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache

### Contracts

- Run `npm install` in project root to install Truffle, hdwallet, dotenv and OpenZeppelin ReentrancyGuard
- Run Ganache in port `7545` and network id `1337`
- To test the contract run `truffle test`
- To deploy the contract locally run `truffle migrate --network development`

### Frontend

- Go to client directory `cd client`
- Edit `./src/index.js` and change line 22, state variable `myNetwork` from `0x3` (That´s Ropsten chainId) to `0x539` (Ganache´s 1337 chainId)
- Run `npm install` to install packages and dependencies
- To start the server run `npm run start`
- Open `http://localhost:3000`

## Video link

https://

## Public Ethereum wallet for certification:

`0x2fB6E185Dd70265D86298CAF775851262048e74C`

## Project description

This aims to solve the exchange of value when a tutor and a student engage in a one-on-one lesson, specially when both resides in different countries. 
- Both parts meet to arrange an economic value and other requirements for the course wich is composed by one or more lessons. 
- When they agree, the tutor creates a course and names it, declares the price of the entire course, the lessons quantity, a timelock wich allows the student to recover it´s assets after a period of time if the tutor doesn´t give the promised class, and, of course, the student address. 
- The student then reviews that, and if agrees, approves the course, deducting the course value from the student´s wallet and storing it in the contract. 
- When the student attends to a lesson, it signs a attendance counter, that allows the tutor to give the lesson (signing a init lesson counter) and therefore allowing the tutor to withdraw a fraction of the balance stored in the contract corresponding to the given lessons
- If a tutor doesn´t start a lesson after a student gives it´s attendance, or, the student never attend any lesson, the student can recover the balance left in the contract after the timelock period specified in the course creation

## Example workflow

1. Enter PapaPay website
2. Select if your´re a tutor or student (For this example we´ll create a course) We select tutor
3. Clic on Create Course
4. Follow the on-screen instructions and fill all the fields
5. 



## Directory structure

- `client`: React frontend.
- `contracts`: Smart contracts.
- `migrations`: Migration files for deploying contracts.
- `test`: Unit tests.

## Environment variables (not needed for running project locally)

```
ROPSTEN_INFURA_PROJECT_ID=
ROPSTEN_MNEMONIC=
```

## TODO features

- Stop using block.timestamp and use Chainlink Keepers
- Improve gas consumption
- Improve React code, implement a place where students and tutors can pre-arrange a course