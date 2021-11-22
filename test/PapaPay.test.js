let BN = web3.utils.BN;
let PapaPay = artifacts.require('../contracts/PapaPay.sol')
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: ItemStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract('PapaPay', (accounts) => {
  let papapay

  before(async () => {
    papapay = await PapaPay.deployed()
  })

    describe('deployment', async () => {
    it('deploys successfully', async () => {
        const address = await papapay.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    describe('course creation', async () => {
        it('creates course', async () => {
          const course = await papapay.papaCourse[0]
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })


  })
})