import React from "react";
import { Button, TextField } from "@material-ui/core";
import { config } from "../utils/config";
import Center from "../components/Center";
import BackButton from "../components/Back";


const CreateCourse = () => (
    <>
        <Center>
        <h1
              style={{
                padding: "1rem 0"
                }}>
                  Create a course
        </h1>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    id="outlined-basic" 
                    label="Insert course description" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    id="outlined-basic" 
                    label="Insert course price" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    id="outlined-basic" 
                    label="Insert number of lessons" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    id="outlined-basic" 
                    label="Insert timelock in hours" 
                    variant="outlined" />
            </div>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    id="outlined-basic" 
                    label="Insert student address" 
                    variant="outlined" />
            </div>

            <div
              style={{
              padding: "0.5rem 0"
              }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={{
                      textAlign: "center", 
                      width:"200px"}}>
                    Create Course
                  </Button>
            </div>
          <BackButton/>
        </Center>
    </>
  )

export default CreateCourse;