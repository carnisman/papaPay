//import React, { useContext, useEffect, useState } from "react";
import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Center from "../components/Center";
//import { Card, Container, List, ListItem, Typography, CardHeader, CardContent } from "@material-ui/core";
//import { ThemeContext } from "../providers/ThemeProvider";
//import ErrorIcon from "@material-ui/icons/Error";
import Submenu from "./Submenu";

//import { config } from "../utils/config";

const PapaWeb = (props) => {
  return (
    <>
    <Submenu/>
        <Center>
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
            <Link to="/student">
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
