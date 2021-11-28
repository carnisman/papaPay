import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Center from "../components/Center";
import BackButton from "../components/Back";
import { useWeb3React } from "@web3-react/core"
import Web3 from 'web3';

const papaCreate = (props) => {

  useEffect(() => props.cleanExe, []);

  const web3 = new Web3(window.ethereum)
  const { account } = useWeb3React()

  const [_papaDesc,setDesc] = useState('')
  const [_papaPrice,setPrice] = useState('')
  const [_papaLessons,setLessons] = useState('')
  const [_papaLock,setLock] = useState('')
  const [_papaStudent,setStudent] = useState('')

  return (
    <>
        <Center>
        <h1
              style={{
                padding: "0.5rem 0"
                }}>
                  Create a course
        </h1>
        <h3
              style={{
                padding: "1rem 0",
                textAlign: "center"
                }}>
                  Here you can create a course. Have in mind this checklist:
                  <div style={{
                    padding: "1rem 0",
                    textAlign: "justify"
                  }}>
                  <li>All fields must be filled</li>
                  <li>Put a good description :)</li>
                  <li>The price and lessons quantity cannot be 0</li>
                  <li>The timelock can be 0 if you want not to have one. If you set a timelock, the student can recover it´s balance after that period</li>
                  <li>You cannot enroll yourself as a student</li>
                  <li>You must enter a valid ethereum address</li>
                  <li>If the <i>Create Course</i> button is disabled, please review this checklist</li>
                  </div>
        </h3>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={_papaDesc}
                    onChange={event => setDesc(event.target.value)}
                    label="Insert course description" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={_papaPrice}
                    onChange={event => setPrice(event.target.value)}
                    label="Insert course price" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={_papaLessons}
                    onChange={event => setLessons(event.target.value)}
                    label="Insert number of lessons" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={_papaLock}
                    onChange={event => setLock(event.target.value)}
                    label="Insert timelock in minutes" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={_papaStudent}
                    onChange={event => setStudent(event.target.value)}
                    label="Insert student address" 
                    variant="outlined" />
            </div>

            <div
              style={{
              padding: "0.5rem 0"
              }}>
                  <Button
                    disabled={!props.papapay ||
                              _papaDesc.length == 0 ||
                              _papaPrice.length == 0 ||
                              _papaPrice == 0 ||
                              _papaLessons.length == 0 ||
                              _papaLessons == 0 ||
                              _papaLock.length == 0 ||
                              _papaStudent.length == 0 ||
                              _papaStudent == account  ||
                              _papaStudent == props.papaAddress||
                              !web3.utils.isAddress(_papaStudent) }
                    onClick={ ()=> {
                      props.papaCreate(_papaDesc,_papaPrice,_papaLessons,_papaLock,_papaStudent)
                      }}
                    variant="contained"
                    color="primary"
                    style={{
                      textAlign: "center",
                      width:"200px"}}>
                    Create Course
                  </Button>
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
                  if (props.crExe == 0) {
                    return (
                      <div>
                      Waiting for interaction
                      </div>
                      )
                  } else 
                  if (props.crExe == 1){
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
                  if (props.crExe == 2) {
                    () => setDesc('');
                    () => setPrice('');
                    () => setLessons('');
                    () => setLock('');
                    () => setStudent('');
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
                  if (props.crExe == 3) {
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
    )
}

export default papaCreate;