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


export const RejectModal = ({ onClose, openReject, onCloseReject, recepy }) => {
  const [rejectionObservations, setRejectionObservations] = useState("");

  const rejectPrescription = () => {
    try {
      firebase
          .firestore()
          .collection("recetas")
          .doc(recepy.id)
          .update({
            status: "rejected",
            rejectionObservations: rejectionObservations,
            professionalCheck_ts: new Date(),
          })
          .then(() => {
            console.log("Document successfully updated!");
          });
    } catch (err) {
      console.log("error:", err);
    }
    onCloseReject();
    onClose();
  };

  return (
    <Dialog centered fullWidth maxWidth="xs" open={openReject} onClose={onCloseReject} style={{ top: "0%", left: "0%" }}>
      <DialogTitle>Por favor indique la razon del rechazo de la receta.</DialogTitle>
      <DialogContent style={{}}></DialogContent>
      <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
        <TextField variant="outlined" value={rejectionObservations} label="Observaciones" multiline rows="4" fullWidth onChange={(e) => setRejectionObservations(e.target.value)} />
      </Container>
      <DialogActions>
        <Button variant="contained" onClick={onCloseReject}>
          Cancelar{" "}
        </Button>
        <Button variant="contained" color="primary" onClick={rejectPrescription}>
          Rechazar receta
        </Button>
      </DialogActions>
    </Dialog>
  );
};
