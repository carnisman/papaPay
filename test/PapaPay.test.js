let BN = web3.utils.BN;
let PapaPay = artifacts.require('PapaPay')
let { catchRevert } = require('./exceptionHelpers');
const { papas: PapaStruct, isDefined, isPayable, isType } = require('./ast-helper');

contract("PapaPay", function (accounts) {
    const [alice, bob] = accounts;
    const emptyAddress = "0x0000000000000000000000000000000000000000";
  
    const price = "1000";
    const excessAmount = "2000";
    const _papaCourse=0
    const papaDesc = "0x75d8ed4e519b70c350b46b2b3811ded16fda981e000000000000000000000000";
    const papaPrice = "1000";
    const papaLessons = "10";
    const papaLock = "10";
    const papaStudent = bob;
  
    let instance;
  
    beforeEach(async () => {
      instance = await PapaPay.new();
    });
  
    describe('Deployment', async () => {
        it("Deploys successfully", async () => {
            const address = await PapaPay.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe("Variables", () => {
  
      it("should have an papaCount (Course counter)", async () => {
        assert.equal(typeof instance.papaCount, 'function', "the contract has no papaCount");
      });
  
        describe("Papa struct", () => {
        let subjectStruct;
  
            before(() => {
            subjectStruct = PapaStruct(PapaPay);
            assert(
                subjectStruct !== null, 
                "The contract should define an Course Struct (Papa)"
            );
            });
    
            it("should have a `papaDesc`", () => {
            assert(
                isDefined(subjectStruct)("papaDesc"), 
                "Struct Papa should have a `papaDesc` member"
            );
            assert(
                isType(subjectStruct)("papaDesc")("bytes32"), 
                "`papaDesc` should be of type `bytes32`"
            );
            });
    
            it("should have a `papaCourse`", () => {
            assert(
                isDefined(subjectStruct)("papaCourse"), 
                "Struct Papa should have a `papaCourse` member"
            );
            assert(
                isType(subjectStruct)("papaCourse")("uint"), 
                "`papaCourse` should be of type `uint`"
            );
            });
    
            it("should have a `papaPrice`", () => {
            assert(
                isDefined(subjectStruct)("papaPrice"), 
                "Struct Papa should have a `papaPrice` member"
            );
            assert(
                isType(subjectStruct)("papaPrice")("uint"), 
                "`price` should be of type `uint`"
            );
            });
    
            it("should have a `papaLessons`", () => {
            assert(
                isDefined(subjectStruct)("papaLessons"), 
                "Struct Papa should have a `papaLessons` member"
            );
            assert(
                isType(subjectStruct)("papaLessons")("uint"), 
                "`papaLessons` should be of type `uint`"
            );
            });

            it("should have a `papaLock`", () => {
                assert(
                isDefined(subjectStruct)("papaLock"), 
                "Struct Papa should have a `papaLock` member"
                );
                assert(
                isType(subjectStruct)("papaLock")("uint"), 
                "`papaLock` should be of type `uint`"
                );
            });

            it("should have a `papaTS`", () => {
                assert(
                isDefined(subjectStruct)("papaTS"), 
                "Struct Papa should have a `papaTS` member"
                );
                assert(
                isType(subjectStruct)("papaTS")("uint"), 
                "`papaTS` should be of type `uint`"
                );
            });

            it("should have a `papaBalance`", () => {
                assert(
                    isDefined(subjectStruct)("papaBalance"), 
                    "Struct Papa should have a `papaBalance` member"
                );
                assert(
                    isType(subjectStruct)("papaBalance")("uint"), 
                    "`papaBalance` should be of type `uint`"
                );
            });

            it("should have a `papaTutorSign`", () => {
                assert(
                    isDefined(subjectStruct)("papaTutorSign"), 
                    "Struct Papa should have a `papaTutorSign` member"
                );
                assert(
                    isType(subjectStruct)("papaTutorSign")("uint"), 
                    "`papaTutorSign` should be of type `uint`"
                );
            });

            it("should have a `papaStudentSign`", () => {
                assert(
                    isDefined(subjectStruct)("papaStudentSign"), 
                    "Struct Papa should have a `papaStudentSign` member"
                );
                assert(
                    isType(subjectStruct)("papaStudentSign")("uint"), 
                    "`papaStudentSign` should be of type `uint`"
                );
            });

            it("should have a `papaWithdrew`", () => {
                assert(
                    isDefined(subjectStruct)("papaWithdrew"), 
                    "Struct Papa should have a `papaWithdrew` member"
                );
                assert(
                    isType(subjectStruct)("papaWithdrew")("uint"), 
                    "`papaWithdrew` should be of type `uint`"
                );
            });
    
            it("should have a `papaTutor`", () => {
            assert(
                isDefined(subjectStruct)("papaTutor"), 
                "Struct Papa should have a `papaTutor` member"
            );
            assert(
                isType(subjectStruct)("papaTutor")("address"), 
                "`papaTutor` should be of type `address`"
            );
            });
    
            it("should have a `papaStudent`", () => {
            assert(
                isDefined(subjectStruct)("papaStudent"), 
                "Struct Papa should have a `papaStudent` member"
            );
            assert(
                isType(subjectStruct)("papaStudent")("address"), 
                "`papaStudent` should be of type `address`"
            );
            });
        });
    });

    describe("Use cases", () => {
      it("Should add a course with its parameters", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        
        const result = await instance.fetchCourse.call(_papaCourse);

        assert.equal(
          result[0],
          _papaCourse,
          "the description of the last added course does not match the expected value",
        );
        assert.equal(
          result[1],
          papaDesc,
          "the description of the last added course does not match the expected value",
        );
        assert.equal(
          result[2].toString(10),
          papaPrice,
          "the price of the last added course does not match the expected value",
        );
        assert.equal(
          result[3].toString(10),
          papaLessons,
          'the lessons of the last added course does not match the expected value',
        );
        assert.equal(
          result[4].toString(10),
          papaLock,
          'the timelock of the last added course does not match the expected value',
        );
        assert.equal(
          result[5].toString(10),
          alice,
          'the tutor of the last added course does not match the expected value',
        );
        assert.equal(
          result[6].toString(10),
          papaStudent,
          'the student of the last added course does not match the expected value',
        );
      });

      it("should emit a CourseCreated event when an course is added", async () => {
        let eventEmitted = false;
        const tx = await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
  
        if (tx.logs[0].event == "CourseCreated") {
          eventEmitted = true;
        }
  
        assert.equal(
          eventEmitted,
          true,
          "adding an course should emit a CourseCreated event",
        );
      });
  ////////////////////////////////
      it("should allow someone to purchase an item and update state accordingly", async () => {

        var bobBalanceBefore = await web3.eth.getBalance(bob);

        await instance.papaApprove(_papaCourse, { from: bob, value:price });

        var bobBalanceAfter = await web3.eth.getBalance(bob);
  
        const result = await instance.fetchItem.call(0);
  
        assert.equal(
          result[3].toString(10),
          SupplyChain.State.Sold,
          'the state of the item should be "Sold"',
        );
  
        assert.equal(
          result[5],
          bob,
          "the buyer address should be set bob when he purchases an item",
        );
  
        assert.equal(
          new BN(aliceBalanceAfter).toString(),
          new BN(aliceBalanceBefore).add(new BN(price)).toString(),
          "alice's balance should be increased by the price of the item",
        );
  
        assert.isBelow(
          Number(bobBalanceAfter),
          Number(new BN(bobBalanceBefore).sub(new BN(price))),
          "bob's balance should be reduced by more than the price of the item (including gas costs)",
        );
      });
  
      it("should error when not enough value is sent when purchasing an item", async () => {
        await instance.addItem(papaDesc, price, { from: alice });
        await catchRevert(instance.buyItem(0, { from: bob, value: 1 }));
      });
  
      it("should emit LogSold event when and item is purchased", async () => {
        var eventEmitted = false;
  
        await instance.addItem(papaDesc, price, { from: alice });
        const tx = await instance.buyItem(0, { from: bob, value: excessAmount });
  
        if (tx.logs[0].event == "LogSold") {
          eventEmitted = true;
        }
  
        assert.equal(eventEmitted, true, "adding an item should emit a Sold event");
      });
  
      it("should revert when someone that is not the seller tries to call shipItem()", async () => {
        await instance.addItem(papaDesc, price, { from: alice });
        await instance.buyItem(0, { from: bob, value: price });
        await catchRevert(instance.shipItem(0, { from: bob }));
      });
  
      it("should allow the seller to mark the item as shipped", async () => {
        await instance.addItem(papaDesc, price, { from: alice });
        await instance.buyItem(0, { from: bob, value: excessAmount });
        await instance.shipItem(0, { from: alice });
  
        const result = await instance.fetchItem.call(0);
  
        assert.equal(
          result[3].toString(10),
          SupplyChain.State.Shipped,
          'the state of the item should be "Shipped"',
        );
      });
  
      it("should emit a LogShipped event when an item is shipped", async () => {
        var eventEmitted = false;
  
        await instance.addItem(papaDesc, price, { from: alice });
        await instance.buyItem(0, { from: bob, value: excessAmount });
        const tx = await instance.shipItem(0, { from: alice });
  
        if (tx.logs[0].event == "LogShipped") {
          eventEmitted = true;
        }
  
        assert.equal(
          eventEmitted,
          true,
          "adding an item should emit a Shipped event",
        );
      });
  
      it("should allow the buyer to mark the item as received", async () => {
        await instance.addItem(papaDesc, price, { from: alice });
        await instance.buyItem(0, { from: bob, value: excessAmount });
        await instance.shipItem(0, { from: alice });
        await instance.receiveItem(0, { from: bob });
  
        const result = await instance.fetchItem.call(0);
  
        assert.equal(
          result[3].toString(10),
          SupplyChain.State.Received,
          'the state of the item should be "Received"',
        );
      });
  
      it("should revert if an address other than the buyer calls receiveItem()", async () => {
        await instance.addItem(papaDesc, price, { from: alice });
        await instance.buyItem(0, { from: bob, value: excessAmount });
        await instance.shipItem(0, { from: alice });
  
        await catchRevert(instance.receiveItem(0, { from: alice }));
      });
  
      it("should emit a LogReceived event when an item is received", async () => {
        var eventEmitted = false;
  
        await instance.addItem(papaDesc, price, { from: alice });
        await instance.buyItem(0, { from: bob, value: excessAmount });
        await instance.shipItem(0, { from: alice });
        const tx = await instance.receiveItem(0, { from: bob });
  
        if (tx.logs[0].event == "LogReceived") {
          eventEmitted = true;
        }
  
        assert.equal(
          eventEmitted,
          true,
          "adding an item should emit a Shipped event",
        );
      });
  
    });
  
  });