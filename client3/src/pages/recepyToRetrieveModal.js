import React, { useContext, useDebugValue, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  TextField,
} from "@material-ui/core";
import firebase from "firebase/compat/app";

// import firebase from "firebase/app";
import "firebase/firestore"


export const ShowSedeRecepyModal = ({ onClose, openRecepySede, onCloseRecepySede, recepy, onSedeRecepy }) => {

  const AcceptPrescription = () => {
    onSedeRecepy();
    onCloseRecepySede();
  };

  return (

    <Dialog centered fullWidth maxWidth="xs" open={openRecepySede} onClose={onCloseRecepySede} style={{ top: "0%", left: "0%" }}>
      <DialogTitle>Esta es una receta para retirar por sede. Si ya imprimio la receta en el paso anterior, presione Aceptar. En caso contrario presione Cancelar</DialogTitle>
      <DialogContent style={{}}></DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCloseRecepySede}>
          Cancelar{" "}
        </Button>
        <Button variant="contained" color="primary" onClick={AcceptPrescription}>
          Aceptar 
        </Button>
      </DialogActions>
    </Dialog>
  );
};
