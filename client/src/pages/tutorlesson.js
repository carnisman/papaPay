import React, {useEffect, Fragment} from "react";
import { v4 as uuidv4 } from 'uuid';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import Center from "../components/Center";
import BackButton from "../components/Back";
import { useWeb3React } from "@web3-react/core"
import Web3 from 'web3';

const tutorLesson = (props) => {
  
  useEffect(() => props.cleanExe, []);

  const web3 = new Web3(window.ethereum)
  const { account } = useWeb3React()

  function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 256 && input.charCodeAt(i) >= 32) {
            output += input.charAt(i);
        }
    }
    return output;
  }

  return(
    <>
        <Center>
        <h1
              style={{
                padding: "1rem 0"
                }}>
                  Tutor dashboard
        </h1>
        <h3
              style={{
                padding: "1rem 0"
                }}>
                  Here you can give your lessons and withdraw any balance available to you
                  <br></br>
                  Have in mind this checklist:
                  <div style={{
                    padding: "1rem 0",
                    textAlign: "justify"
                  }}>
                  <li>You can give the lesson after the student attends it. To attend the lesson the student must clic the <i>Take lesson</i> button</li>
                  <li>You can withdraw your available balance after giving a lesson. To give a lesson you must clic the <i>Give Lesson</i> button</li>
                  <li>You can withdraw per every lesson given or, if you want, withdraw multiple lessons given at once</li>
                  <li>If any button is disabled, please review this checklist</li>
                  </div>
        </h3>
        <BackButton/>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Course Number</TableCell>
                            <TableCell align="center">Course Name</TableCell>
                            <TableCell align="center">Course Price</TableCell>
                            <TableCell align="center">Course Balance</TableCell>
                            <TableCell align="center">Lessons Qty.</TableCell>
                            <TableCell align="center">Timelock</TableCell>
                            <TableCell align="center">Student Address</TableCell>
                            <TableCell align="center">Lessons given by teacher</TableCell>
                            <TableCell align="center">Lessons attended by student</TableCell>
                            <TableCell align="center">Withdrawals</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.papas.map((papa) => (
                            account==papa.papaTutor
                            ?
                            (papa.papaBalance == 0 && papa.papaTutorSign > 0)
                            ?
                            <>
                              <TableRow key={uuidv4()}>
                                <TableCell align="center" component="th" scope="row">{papa.papaCourse.toString()}</TableCell>
                                <TableCell align="center">{cleanString(web3.utils.hexToAscii(papa.papaDesc))}</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaPrice.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaBalance.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{papa.papaLessons} Lessons</TableCell>
                                <TableCell align="center">{papa.papaLock} Minute(s)</TableCell>
                                <TableCell align="center">{papa.papaStudent}</TableCell>
                                <TableCell align="center">{papa.papaTutorSign}</TableCell>
                                <TableCell align="center">{papa.papaStudentSign}</TableCell>
                                <TableCell align="center">{papa.papaWithdrew}</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center" style={{color:"#E73C7E"}}>COURSE FINISHED</TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                            </>
                            :
                            <>
                              <TableRow key={uuidv4()}>
                                <TableCell align="center" component="th" scope="row">{papa.papaCourse.toString()}</TableCell>
                                <TableCell align="center">{cleanString(web3.utils.hexToAscii(papa.papaDesc))}</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaPrice.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaBalance.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{papa.papaLessons} Lessons</TableCell>
                                <TableCell align="center">{papa.papaLock} Minute(s)</TableCell>
                                <TableCell align="center">{papa.papaStudent}</TableCell>
                                <TableCell align="center">{papa.papaTutorSign}</TableCell>
                                <TableCell align="center">{papa.papaStudentSign}</TableCell>
                                <TableCell align="center">{papa.papaWithdrew}</TableCell>
                                <TableCell align="center" ><Button disabled={papa.papaTutorSign == papa.papaLessons || papa.papaTutorSign == papa.papaStudentSign} onClick={() => {props.papaInitLesson(papa.papaCourse)}}>Give Lesson</Button></TableCell>
                                <TableCell align="center" ><Button disabled={papa.papaBalance==0 || (papa.papaTutorSign==papa.papaWithdrew )} onClick={() => {props.papaWithdraw(papa.papaCourse)}}>Withdraw</Button></TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                            </>
                            :
                            <>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div style={{
              textAlign: 'center'
            }}>
            <div style={{
              padding: "0.5rem 0"
              }}>
              <b>Transaction status:</b>
            </div>
            { (() => {
                  if (props.tuExe == 0) {
                    return (
                      <div>
                      Waiting for interaction
                      </div>
                      )
                  } else 
                  if (props.tuExe == 1){
                    return (
                      <div style={{
                        color: 'blue'
                      }}
                      className="gradLoad"
                      >
                      Transaction in progress...
                      </div>
                      )
                  } else
                  if (props.tuExe == 2) {
                    return (
                      <>
                      <div style={{
                        color: '#23D5AB'
                      }}>
                      <div>
                      Transaction successful
                      </div>
                      <div>
                      TX Hash: {props.receiptTx.transactionHash}<br></br>
                      </div>
                      <div>
                      TX Block: {props.receiptTx.blockNumber}<br></br>
                      </div>
                      <div>
                      Gas used: {props.receiptTx.gasUsed}<br></br>
                      </div>
                      </div>
                      </>
                    )
                  } else
                  if (props.tuExe == 3) {
                    return (
                      <>
                      <div style={{
                        color: '#E73C7E'
                      }}>
                      <div>
                      <b>Transaction error!</b>
                      </div>
                      <div>
                      {props.errorMsg}
                      </div>
                      </div>
                      </>
                      )
                  }
                })
              ()}
              </div>

            {props.papapay
                    ?<div style={{
                        textAlign: "center",
                        padding: "1rem 0",
                        color: "#23D5AB"
                        }}>
                        Your wallet is connected, everything looks good!
                      </div>
                    :<div style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        padding: "1rem 0",
                        color: "#E73C7E"
                        }}>
                        Please connect your wallet to continue !!
                      </div>}
          <BackButton/>
        </Center>
    </> 
  )}

export default tutorLesson;