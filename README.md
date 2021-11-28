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

User and apartment owner enter an agreement for renting a property, i.e. exchanging usage rights to an apartment for as long as payments are made to a specific Ethereum account before the agreed deadline.

User receives a keycode / access token to the apartment after first payment. If a user's payments are late, they will receive a reminder after one week. After e.g. 30 days (variable depending on local jurisdiction) of no payments, usage rights will be automatically transferred back to owner and apartment access rights will be revoked from user. User agrees to this procedure when entering contract with owner.

- Checking for received payments and transferring ownership back to owner on non-payment cases could be scheduled with e.g. Gelato Network (https://docs.gelato.network/tutorial).
- Opening door locks could be done with an app with smart locks, e.g. https://api.getkisi.com/docs. Smart lock APIs won't be explored in this project.

## Example workflow

1. Enter service web site
2. Login with Metamask
3. Browse apartments
4. Select apartment
5. Agree on contract, pay first installment with Metamask (smart contract call)
6. Tenantship is transferred to user account (smart contract call)
7. Receive key phrase / token / OTP / etc. to access apartment with smart lock app (this part will be mocked in project)


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