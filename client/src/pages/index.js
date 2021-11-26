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
                  Welcome to PapaPay! Please, select one option
        </h1>
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