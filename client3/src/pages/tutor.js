import React from "react";
import { Button } from "@material-ui/core";
import { config } from "../utils/config";
import { useHistory } from "react-router-dom";
import Center from "../components/Center";
import Submenu from "./Submenu";


const Tutor = () =>  {
    let history = useHistory();
    return(
    <>
      <Submenu />
        <Center>
          <h1>Componente tutor en {config.MICRONAME} TEST TEST</h1>
          <div
            style={{
            alignItems: "center",
            padding: "1rem 0",
            }}>
            <Button
              onClick={() => history.goBack()}
              variant="contained"
              color="primary"
            >
              Back
            </Button>
          </div>
        </Center>
    </>
  )}

export default Tutor;