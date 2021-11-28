let BN = web3.utils.BN;
let PapaPay = artifacts.require('PapaPay')
let { catchRevert } = require('./exceptionHelpers');
const { papas: PapaStruct, isDefined, isPayable, isType } = require('./ast-helper');

contract("PapaPay", function (accounts) {
    const [alice, bob] = accounts;
    const emptyAddress = "0x0000000000000000000000000000000000000000";
    const excessAmount = "2000";
    const lessAmount = "500";
    const _papaCourse=0
    const papaDesc = "0x75d8ed4e519b70c350b46b2b3811ded16fda981e000000000000000000000000";
    const papaPrice = "1000";
    const papaLessons = "1";
    const papaLock = "0";
    const papaStudent = bob;
  
    let instance;
  
    beforeEach(async () => {
      instance = await PapaPay.new();
    });
  
    // We test a succesful deployment checking that the contract creation doesn´t return a empty address

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

      // Basic variable and type checking
  
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

      describe("Course creation tests", () => {

      // Tests course creation

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

      // Test emission of event

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

      // Testing requires and reverts

      it("should error when tutor and student are the same", async () => {
        await catchRevert(instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,alice, { from: alice }));
      });

      it("should error when lessons are 0", async () => {
        await catchRevert(instance.papaCreate(papaDesc,papaPrice,0,papaLock,papaStudent, { from: alice }));
      });

      it("should error when price is 0", async () => {
        await catchRevert(instance.papaCreate(papaDesc,0,papaLessons,papaLock,papaStudent, { from: alice }));
      });

      it("should error when student is not set", async () => {
        await catchRevert(instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,emptyAddress, { from: alice }));
      });

    });

    describe("Course approval tests", () => {

      // Basic approval test, we check if the balance updates
  
      it("should allow the student to approve a course and update balance accordingly", async () => {

        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });

        const result = await instance.fetchCourse.call(_papaCourse);

        assert.equal(
          result[7].toString(10),
          papaPrice,
          'the the balance should match the price',
        ); 

      });

      // Test emission of events

      it("should emit CourseDeposit event when course is approved", async () => {
        var eventEmitted = false;
        
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        const tx = await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });

        if (tx.logs[0].event == "CourseDeposit") {
          eventEmitted = true;
        }
  
        assert.equal(eventEmitted, true, "approving course should emit CourseDeposit");
      });
      
      // Testing requires and reverts

      it("should error when a tutor tries to approve course", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await catchRevert(instance.papaApprove(_papaCourse, { from: alice, value:papaPrice }));
      });

      it("should error when not enough value is sent when approving course", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await catchRevert(instance.papaApprove(_papaCourse, { from: bob, value:lessAmount }));
      });

      it("should error when excess value is sent when approving course", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await catchRevert(instance.papaApprove(_papaCourse, { from: bob, value:excessAmount }));
      });
  
    });

    describe("Lesson attendance tests", () => {

      /// Student side

      // Test student assistance to a course, an attendance variable should increase

      it("should allow the student to attend a lesson and update student attendance counter", async () => {

        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await instance.papaAttendLesson(_papaCourse, { from: bob });
        
        const result = await instance.fetchCourse.call(_papaCourse);

        assert.equal(
          result[9].toString(10),
          "1",
          'the student must have 1 lesson attended',
        ); 

      });

      // Test emission of events

      it("should emit LessonAttended event when lesson is attended", async () => {
        var eventEmitted = false;
        
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        const tx = await instance.papaAttendLesson(_papaCourse, { from: bob });

        if (tx.logs[0].event == "LessonAttended") {
          eventEmitted = true;
        }
  
        assert.equal(eventEmitted, true, "attending lesson should emit LessonAttended");
      });
    
      // Testing requires and reverts

      it("should error when a tutor tries to attend lesson", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await catchRevert(instance.papaAttendLesson(_papaCourse, { from: alice }));
      });

      it("should error when a student tries to attend a lesson two times without tutor initting the first lesson", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await instance.papaAttendLesson(_papaCourse, { from: bob });
        await catchRevert(instance.papaAttendLesson(_papaCourse, { from: bob }));
      });

    });

    describe("Lesson init tests", () => {
      /// Tutor side

      // Test tutor giving a course, an init lesson variable should increase

      it("should allow the tutor to init a lessons and update tutor init counter", async () => {

        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await instance.papaAttendLesson(_papaCourse, { from: bob });
        await instance.papaInitLesson(_papaCourse, { from: alice });
        
        const result = await instance.fetchCourse.call(_papaCourse);

        assert.equal(
          result[8].toString(10),
          "1",
          'the tutor must have 1 lesson attended',
        );

      });

      // Test emission of events

      it("should emit LessonStarted event when lessons is started", async () => {
        var eventEmitted = false;
        
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await instance.papaAttendLesson(_papaCourse, { from: bob });
        const tx = await instance.papaInitLesson(_papaCourse, { from: alice });

        if (tx.logs[0].event == "LessonStarted") {
          eventEmitted = true;
        }
  
        assert.equal(eventEmitted, true, "initializing lessons should emit LessonStarted");
      }); 

      // Testing requires and reverts

      it("should error when a tutor tries to init lessons without a student attending it", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await catchRevert(instance.papaInitLesson(_papaCourse, { from: alice }));
      });

      it("should error when a student tries to init lessons", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await instance.papaAttendLesson(_papaCourse, { from: bob });
        await catchRevert(instance.papaInitLesson(_papaCourse, { from: bob }));
      });

      it("should error when a tutor tries to init lessons without a student attending it", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await catchRevert(instance.papaInitLesson(_papaCourse, { from: alice }));
      });

    });

    describe("One more lesson exception test", () => {

      it("should error when a student tries to attend lessons with all lessons taken", async () => {
        await instance.papaCreate(papaDesc,papaPrice,papaLessons,papaLock,papaStudent, { from: alice });
        await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
        await instance.papaAttendLesson(_papaCourse, { from: bob });
        await instance.papaInitLesson(_papaCourse, { from: alice });
        await catchRevert(instance.papaAttendLesson(_papaCourse, { from: bob }));
      });

    });

      /// Course withdrawal and recovery tests
      describe("Withdrawal and recovery tests", () => {
        /// we are increasing the amount to two lessons
        const papa2Lessons = 2
        /// we define the individual lesson value
        const lessonAmount = papaPrice / papa2Lessons

        /// testing withdrawal, we check the balance withdrawed and tht amount that has to be withdrawn

        it("should allow tutor to withdraw the equivalent to one lesson after that lesson is given", async () => {
          
          await instance.papaCreate(papaDesc,papaPrice,papa2Lessons,papaLock,papaStudent, { from: alice });
          await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
          const preresult = await instance.fetchCourse.call(_papaCourse);
          const originalBalance =  parseInt(preresult[7].toString(10),10)
          await instance.papaAttendLesson(_papaCourse, { from: bob });
          await instance.papaInitLesson(_papaCourse, { from: alice });
          await instance.papaWithdraw(_papaCourse, { from: alice });
          const result = await instance.fetchCourse.call(_papaCourse);
          const newBalance =  parseInt(result[7].toString(10),10)
          // defining the withdraw amount, wich is the total amount of lessons given, in this case one lesson
          const withdrawValue =  lessonAmount * 1
          const compBalance = newBalance + withdrawValue
          
  
          assert.equal(
            compBalance,
            originalBalance,
            'there is a mistmach between the balance withdrawed and the amount that has to be withdrawn',
          );
        });

        /// the following test are explained by it´s titles

        it("should allow student to recover remaining balance without any lesson given", async () => {
          
          await instance.papaCreate(papaDesc,papaPrice,papa2Lessons,papaLock,papaStudent, { from: alice });
          await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
          const preresult = await instance.fetchCourse.call(_papaCourse);
          const originalBalance =  parseInt(preresult[7].toString(10),10)
          await instance.papaAttendLesson(_papaCourse, { from: bob });
          await instance.papaRecover(_papaCourse, { from: bob });
          const result = await instance.fetchCourse.call(_papaCourse);
          const newBalance =  parseInt(result[7].toString(10),10)
          // defining the recover amount, in this case is the total balance, so we use papaPrice const
          let recoverValue =  papaPrice
          let compBalance = newBalance + recoverValue
          
  
          assert.equal(
            compBalance,
            originalBalance,
            'there is a mistmach between the balance recovered and the amount that has to be recovered',
          );
        });

        it("should allow student to recover remaining balance after lesson given", async () => {
          
          await instance.papaCreate(papaDesc,papaPrice,papa2Lessons,papaLock,papaStudent, { from: alice });
          await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
          const preresult = await instance.fetchCourse.call(_papaCourse);
          const originalBalance =  parseInt(preresult[7].toString(10),10)
          await instance.papaAttendLesson(_papaCourse, { from: bob });
          await instance.papaInitLesson(_papaCourse, { from: alice });
          await instance.papaRecover(_papaCourse, { from: bob });
          const result = await instance.fetchCourse.call(_papaCourse);
          const newBalance =  parseInt(result[7].toString(10),10)
          // defining the recover amount, wich is equivalent to balance minus lessons given
          let withdrawValue =  lessonAmount * 1
          let recoverValue = originalBalance - withdrawValue
          let compBalance = newBalance + recoverValue
          
  
          assert.equal(
            compBalance,
            originalBalance,
            'there is a mistmach between the balance withdrawed and the amount that has to be withdrawn',
          );
        });

        it("should allow tutor to withdraw his available amount after a student recovery of funds", async () => {
          
          await instance.papaCreate(papaDesc,papaPrice,papa2Lessons,papaLock,papaStudent, { from: alice });
          await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
          const preresult = await instance.fetchCourse.call(_papaCourse);
          const originalBalance =  parseInt(preresult[7].toString(10),10)
          await instance.papaAttendLesson(_papaCourse, { from: bob });
          await instance.papaInitLesson(_papaCourse, { from: alice });
          await instance.papaRecover(_papaCourse, { from: bob });
          await instance.papaWithdraw(_papaCourse, { from: alice });
          const result = await instance.fetchCourse.call(_papaCourse);
          const newBalance =  parseInt(result[7].toString(10),10)
          // defining the withdraw amount, wich is the total amount of lessons given, in this case one lesson
          let withdrawValue =  lessonAmount * 1
          let recoverValue = originalBalance - withdrawValue
          let compBalance = newBalance + withdrawValue + recoverValue
          
  
          assert.equal(
            compBalance,
            originalBalance,
            'there is a mistmach between the balance withdrawed and the amount that has to be withdrawn',
          );
        });

        it("should error if student tries to recover funds before termination of the timelock", async () => {
          // we define a timelock of 1 minute
          const newTimeLock = 1
          await instance.papaCreate(papaDesc,papaPrice,papa2Lessons,newTimeLock,papaStudent, { from: alice });
          await instance.papaApprove(_papaCourse, { from: bob, value:papaPrice });
          await instance.papaAttendLesson(_papaCourse, { from: bob });
          await instance.papaInitLesson(_papaCourse, { from: alice });
          await catchRevert(instance.papaRecover(_papaCourse, { from: bob }));
        });
      });
  });
});