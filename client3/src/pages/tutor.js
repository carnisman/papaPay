import React from "react";
import { Button } from "@material-ui/core";
import { config } from "../utils/config";
import Center from "../components/Center";
import Submenu from "./Submenu";
import BackButton from "../components/Back";


const Tutor = () => (
    <>
      <Submenu />
        <Center>
          <h1>Componente tutor en {config.MICRONAME} TEST TEST</h1>
          
          <BackButton/>
        </Center>
    </>
  )

export default Tutor;