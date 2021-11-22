import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Center from "../components/Center";
import BackButton from "../components/Back";

const papaCreate = (props) => {

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
                  Here you can create a course. Have in mind some rules:
                  <div style={{
                    padding: "1rem 0",
                    textAlign: "justify"
                  }}>
                  <li>You cannot enroll yourself as a student</li>
                  <li> The price and lessons quantity cannot be 0</li>
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
                    label="Insert timelock in hours" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={props._papaStudent}
                    onChange={event => setStudent(event.target.value)}
                    label="Insert student address" 
                    variant="outlined" />
            </div>

            <div
              style={{
              padding: "0.5rem 0"
              }}>
                  <Button
                    disabled={!props.papapay}
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
    )
}

export default papaCreate;