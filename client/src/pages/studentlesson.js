import React, {useEffect} from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import Center from "../components/Center";
import BackButton from "../components/Back";
import { useWeb3React } from "@web3-react/core"
import Web3 from 'web3';

const studentLesson = (props) => {

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
                  Student dashboard
        </h1>
        <h3
              style={{
                padding: "1rem 0"
                }}>
                  Here you can take your lessons and recover any balance left in your unfinished course after the timelock period
                  <br></br>
                  Have in mind this checklist:
                  <div style={{
                    padding: "1rem 0",
                    textAlign: "justify"
                  }}>
                  <li>The <i>Approve Lesson</i> button will withdraw from your wallet the value in Course Price. You cannot approve a course with balance, or a finished one</li>
                  <li>To take a lesson you must first clic on the <i>Take Lesson</i> button</li>
                  <li>After you clic the <i>Take Lesson</i> button, teacher will be allowed to start the lesson and after that, withdraw the proportional amount for that lesson</li>
                  <li>You can recover the total balance after the timelock period with the <i>Recover Balance</i> button</li>
                  <li>CAUTION: If you try to recover before the timelock, a exception will be generated!</li>
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
                            <TableCell align="center">Tutor Address</TableCell>
                            <TableCell align="center">Lessons given by teacher</TableCell>
                            <TableCell align="center">Lessons attended by student</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.papas.map((papa, key) => (
                            account==papa.papaStudent
                            ?
                            (papa.papaBalance == 0 && papa.papaTutorSign > 0)
                            ?
                            <>
                              <TableRow key={key}>
                                <TableCell align="center" component="th" scope="row">{papa.papaCourse.toString()}</TableCell>
                                <TableCell align="center">{cleanString(web3.utils.hexToAscii(papa.papaDesc))}</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaPrice.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaBalance.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{papa.papaLessons} Lessons</TableCell>
                                <TableCell align="center">{papa.papaLock} Minute(s)</TableCell>
                                <TableCell align="center">{papa.papaTutor}</TableCell>
                                <TableCell align="center">{papa.papaTutorSign}</TableCell>
                                <TableCell align="center">{papa.papaStudentSign}</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center" style={{color:"#E73C7E"}}>COURSE FINISHED</TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                            </>
                            :
                            <>
                              <TableRow key={key}>
                                <TableCell align="center" component="th" scope="row">{papa.papaCourse.toString()}</TableCell>
                                <TableCell align="center">{cleanString(web3.utils.hexToAscii(papa.papaDesc))}</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaPrice.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaBalance.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{papa.papaLessons} Lessons</TableCell>
                                <TableCell align="center">{papa.papaLock} Minute(s)</TableCell>
                                <TableCell align="center">{papa.papaTutor}</TableCell>
                                <TableCell align="center">{papa.papaTutorSign}</TableCell>
                                <TableCell align="center">{papa.papaStudentSign}</TableCell>
                                <TableCell align="center" ><Button disabled={papa.papaBalance>0 || papa.papaTutorSign>0} onClick={() => {props.papaApprove(papa.papaCourse, papa.papaPrice)}}>Approve Course</Button></TableCell>
                                <TableCell align="center" ><Button disabled={papa.papaTutorSign == papa.papaLessons || papa.papaStudentSign > papa.papaTutorSign || papa.papaBalance==0} onClick={() => {props.papaAttendLesson(papa.papaCourse)}}>Take Lesson</Button></TableCell>
                                <TableCell align="center" ><Button disabled={papa.papaBalance==0} onClick={() => {props.papaRecover(papa.papaCourse)}}>Recover balance</Button></TableCell>
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
                  if (props.stExe == 0) {
                    return (
                      <div>
                      Waiting for interaction
                      </div>
                      )
                  } else 
                  if (props.stExe == 1){
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
                  if (props.stExe == 2) {
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
                  if (props.stExe == 3) {
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

export default studentLesson;