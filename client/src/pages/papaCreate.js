import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import Center from "../components/Center";
import BackButton from "../components/Back";

class papaCreate extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      _papaDesc:'',
      _papaPrice: '',
      _papaLessons: '', 
      _papaLock: '',
      _papaStudent: ''
    }
  }
  
  render () {
  return (
    <>
        <Center>
        <h1
              style={{
                padding: "0.5rem 0"
                }}>
                  Create a course
        </h1>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={this.state._papaDesc}
                    onChange={(event) => { this.setState({ _papaDesc: event.target.value });}}
                    label="Insert course description" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={this.state._papaPrice}
                    onChange={(event) => {this.setState({ _papaPrice: event.target.value });}}
                    label="Insert course price" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={this.state._papaLessons}
                    onChange={(event) => {this.setState({ _papaLessons: event.target.value });}}
                    label="Insert number of lessons" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={this.state._papaLock}
                    onChange={(event) => {this.setState({ _papaLock: event.target.value });}}
                    label="Insert timelock in hours" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    value={this.state._papaStudent}
                    onChange={(event) => {this.setState({ _papaStudent: event.target.value });}}
                    label="Insert student address" 
                    variant="outlined" />
            </div>

            <div
              style={{
              padding: "0.5rem 0"
              }}>
                  <Button
                    disabled={!this.props.papapay}
                    onClick={()=>{this.props.papaCreate(this.state._papaDesc,this.state._papaPrice,this.state._papaLessons,this.state._papaLock,this.state._papaStudent)}}
                    variant="contained" 
                    color="primary" 
                    style={{
                      textAlign: "center", 
                      width:"200px"}}>
                    Create Course
                  </Button>
            </div>
            {this.props.papapay
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
}

export default papaCreate;