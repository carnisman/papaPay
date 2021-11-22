import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Center from "../components/Center";
import BackButton from "../components/Back";

const Tutor = () => (
    <>

        <Center>
          <h1
              style={{
                padding: "1rem 0"
                }}>
                  Welcome Tutor! Please select one option</h1>
            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <Link to="/papaCreate">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={{
                      textAlign: "center", 
                      width:"200px"}}>
                    Create Course
                  </Button>
                </Link>
            </div>

            <div
              style={{
              padding: "0.5rem 0"
              }}>
                <Link to="/tutorlesson">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={{
                      textAlign: "center", 
                      width:"200px"}}>
                    Give a lesson
                  </Button>
                </Link>
            </div>
          <BackButton/>
        </Center>
    </>
  )

export default Tutor;