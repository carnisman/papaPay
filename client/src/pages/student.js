import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { config } from "../utils/config";
import Center from "../components/Center";
import BackButton from "../components/Back";


const Student = () => (
    <>

        <Center>
        <h1
              style={{
                padding: "1rem 0"
                }}>
                  Welcome Student! Please select one option
        </h1>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <Link to="/approvecourse">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={{
                      textAlign: "center", 
                      width:"200px"}}>
                    Approve Course
                  </Button>
                </Link>
            </div>

            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <Link to="/studentlesson">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={{
                      textAlign: "center", 
                      width:"200px"}}>
                    Take a lesson
                  </Button>
                </Link>
            </div>
          <BackButton/>
        </Center>
    </>
  )

export default Student;