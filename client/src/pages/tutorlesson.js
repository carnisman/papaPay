import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import Center from "../components/Center";
import BackButton from "../components/Back";
import { useWeb3React } from "@web3-react/core"
import Web3 from 'web3';

const tutorLesson = (props) => {

    function cleanString(input) {
      var output = "";
      for (var i=0; i<input.length; i++) {
          if (input.charCodeAt(i) <= 256 && input.charCodeAt(i) >= 32) {
              output += input.charAt(i);
          }
      }
      return output;
    }

    const web3 = new Web3(window.ethereum)
    const { account } = useWeb3React()
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
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.papas.map((papa, key) => (
                            account==papa.papaTutor
                            ?
                            <>
                              <TableRow key={key}>
                                <TableCell align="center" component="th" scope="row">
                                    {papa.papaCourse.toString()}
                                </TableCell>
                                <TableCell align="center">{cleanString(web3.utils.hexToAscii(papa.papaDesc))}</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaPrice.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{web3.utils.fromWei(papa.papaBalance.toString(), 'Ether')} ETH</TableCell>
                                <TableCell align="center">{papa.papaLessons} Lessons</TableCell>
                                <TableCell align="center">{papa.papaLock} Minute(s)</TableCell>
                                <TableCell align="center">{papa.papaStudent}</TableCell>
                                <TableCell align="center" ><Button disabled={papa.papaTutorSign == papa.papaLessons || papa.papaTutorSign == papa.papaStudentSign} onClick={() => {props.papaInitLesson(papa.papaCourse)}}>Give Lesson</Button></TableCell>
                                <TableCell align="center" ><Button disabled={papa.papaBalance==0} onClick={() => {props.papaWithdraw(papa.papaCourse)}}>Withdraw</Button></TableCell>
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
                  if (props.executed == 0) {
                    return (
                      <div>
                      Waiting for interaction
                      </div>
                      )
                  } else 
                  if (props.executed == 1){
                    return (
                      <div style={{
                        color: 'blue'
                      }}>
                      Transaction in progress...
                      </div>
                      )
                  } else
                  if (props.executed == 2) {
                    return (
                      <>
                      <div style={{
                        color: 'green'
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
                  if (props.executed == 3) {
                    return (
                      <>
                      <div style={{
                        color: 'red'
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
                        color: "green"
                        }}>
                        Your wallet is connected, everything looks good!
                      </div>
                    :<div style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        padding: "1rem 0",
                        color: "red"
                        }}>
                        Please connect your wallet to continue !!
                      </div>}
          <BackButton/>
        </Center>
    </> 
    )}

export default tutorLesson;