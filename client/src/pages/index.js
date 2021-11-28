import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Center from "../components/Center";

const PapaWeb = () => {
  return (
    <>

        <Center>
        <h1
              style={{
                padding: "1rem 0"
                }}>
                  Welcome to PapaPay!
        </h1>
        <h3
              style={{
                padding: "1rem 0",
                textAlign: "center"
                }}>
                  PapaPay is a web3 payment system for tutors and students
                  <br></br>
                  <br></br>
                  Cool! But... how it works?
                  <br></br>
                  <br></br>
                  <div style={{
                    padding: "1rem 0",
                    textAlign: "justify"
                  }}>
                  <li>A tutor and a student can arrange on a course, composed of a series of lessons (This happens outside PapaPay)</li>
                  <li>Then, the tutor can <i>Create a course</i>, with all the details as price, lessons, timelock period for balance recovery, etc. Check the tutor´s create course page to see all the options</li>
                  <li>After that, the student can review those details, and approve that course. Then the total price of the course will be withdrawed of his wallet and stored on the course balance</li>
                  <li>To start a lesson, the student always need to attend the lesson first, clicking on the <i>Take lesson</i> button</li>
                  <li>Now, the tutor can give the lesson clicking on the <i>Give lesson</i> button</li>
                  <li>The tutor can start withdrawing balance from the course after it´s first lesson. The amount to be withdrawn is equivalent to the lessons given</li>
                  <li>The student can recover it´s remaining or total balance if the tutor doesn´t give a lesson after the timelock period</li>
                  </div>
        </h3>
        <div
            style={{
            padding: "0.5rem 0"
          }}>
          <Link to="/tutor">
            <Button 
              variant="contained" 
              color="primary" 
              style={{
                textAlign: "center", 
                width:"200px"}}>
              I´m a Tutor
            </Button>
          </Link>
        </div>
        <div
            style={{
            padding: "0.5rem 0"
          }}>
            <Link to="/studentLesson">
            <Button 
              variant="contained" 
              color="primary" 
              style={{
                textAlign: "center", 
                width:"200px"}}>
              I´m a Student
            </Button>
          </Link>     
        </div>
        </Center>
    </>
  );
};

export default PapaWeb;