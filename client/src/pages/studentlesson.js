import React from "react";
import { Button, TextField } from "@material-ui/core";
import { config } from "../utils/config";
import Center from "../components/Center";
import BackButton from "../components/Back";


const StudentLesson = () => (
    <>

        <Center>
        <h1
              style={{
                padding: "1rem 0"
                }}>
                  Take a lesson
        </h1>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <TextField 
                    id="outlined-basic" 
                    label="Insert course number" 
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
                    Take lesson
                  </Button>
            </div>
          <BackButton/>
        </Center>
    </>
  )

export default StudentLesson;