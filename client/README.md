# Final project - PapaPay - A web3 payment system between tutors and students

## Deployed version url:

https://papapay.ordinar.io

## How to run this project locally:

### Prerequisites

#### Things that need to be installed/configured before running anything:
- Node.js >= v16
- Ganache UI
- Metamask extension installed and, to run local tests, a new Localhost network configured on RPC `http://localhost:7545` (The default one is on port 8545)
- Clone this repo! :)

### Contract deployment and testing

- Run `npm install` in project´s root directory. This will install Truffle, hdwallet, dotenv and OpenZeppelin ReentrancyGuard among others dependencies
- Run Ganache UI in port `7545` and network id `1337` Remember to add the truffle-config.js in Ganache´s truffle project. You can change the Network ID clicking in the configuration gear, then going to server and setting the Network ID to 1337 there
- To test the contract, edit `./contracts/PapaPay.sol`, uncomment lines 293 to 310 (fetchCourse function), save changes, and from project´s root directory run run `truffle migrate --network development --reset` and then run `truffle test` 
- To deploy the contract locally, edit `./contracts/PapaPay.sol` and after re-commenting lines 293 to 310, run `truffle migrate --network development --reset`

### Frontend deployment

- Go to client directory `cd client`
- If you want to use the previous locally deployed contract edit `./src/index.js` and change line 22, state variable `myChain` from `0x3` (That´s Ropsten chainId) to `0x539` (Ganache´s 1337 chainId). Save and exit.
- Run `npm install` to install packages and dependencies
- To start the server run `npm run start`
- Open `http://localhost:3000`

## Video link

https://www.loom.com/share/6b82735180be439b9df677f52f145d8b

## Public Ethereum wallet for certification:

`0x2fB6E185Dd70265D86298CAF775851262048e74C`

## Project description

This aims to solve the exchange of value when a tutor and a student engage in a one-on-one lesson, specially when both resides in different countries. 
- Both parts meet to arrange an economic value and other requirements for the course wich is composed by one or more lessons. 
- When they agree, the tutor creates a course and names it, declares the price of the entire course, the lessons quantity, a timelock wich allows the student to recover it´s assets after a period of time if the tutor doesn´t give the promised class, and, of course, the student address. 
- The student then reviews that, and if agrees, approves the course, deducting the course value from the student´s wallet and storing it in the contract. 
- When the student attends to a lesson, it signs a attendance counter, that allows the tutor to give the lesson (signing a init lesson counter) and therefore allowing the tutor to withdraw a fraction of the balance stored in the contract corresponding to the given lessons
- If a tutor doesn´t start a lesson after a student gives it´s attendance, or, the student never attend any lesson, the student can recover the balance left in the contract after the timelock period specified in the course creation

## Example workflows

#### Tutor - Creating course
1. Enter PapaPay website
2. Select `I´m a tutor`
3. Clic on `Create Course`
4. Follow the on-screen instructions and fill all the fields (Use a student address under your control to test it later)
5. Clic on `Create Course`
6. See tx status under Create Course button

#### Student - Approving course and taking first lesson
1. Enter PapaPay website
2. Select `I´m a student` (Remember to use the student address declared earlier)
3. Read the on-screen sugestions, look out for your course and clic on `Approve Course`. You need to have sufficient ETH balance in your wallet for this to work
4. Then, attend your first lesson by clicking on `Take Lesson`
5. Always see tx status on bottom of the page

#### Teacher - Giving lesson and withdrawing
1. Enter PapaPay website
2. Select tutor, then select `Give a Lesson`
3. Look out for your course and clic on `Give Lesson`. 
4. After a successful transaction, you can clic on `Withdraw`, if tx is successful, check your new balance in your wallet, and the new balance on the course
5. Always see tx status on bottom of the page

#### Student - Recovering balance
1. Enter PapaPay website
2. Select student (Remember to use the student address declared earlier)
3. Read the on-screen sugestions, look out for your course and clic on Recover Balance
4. If the timestamp hasn´t passed, metamask will throw a revert. After the timelock, there will be a successful transaction, you can check your new balance in your wallet, and the new balance on the course
5. Always see tx status on bottom of the page


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

## Thanks to

#### My friend Yamenk who helped me
#### Nana who always gives me good vibes and love
#### JYMS, Ni.ca and Moniko for the future
#### The beautiful team of Consensys, the new friends in the cohort, the mentors, and all the people who invest time in spreading the word of web3
#### zombo.com for everything else