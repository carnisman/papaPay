import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Container,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/HighlightOff";

import usePermisos from "../utils/usePermisos";

import { config } from "../utils/config";
import axios from "axios";


export const HistorialModal = ({ open, onClose, recepy }) => {
  const [error, setError] = useState(null);
  const user = localStorage.getItem("user");
  const [recepyFile, setRecepyFile] = useState(null);
  const { isAllowed } = usePermisos({ group: "recetas" });



  const getRecetaPdf = async () => {
    try {
        const response = await axios.post(config.BASE_URL + "/recetas/get/id/" +  recepy.fileId);
        console.log("entre en get receta");
        if (recepyFile === null) {

            // const b64toBlob = (base64, type = 'application/octet-stream') => 
            // fetch(`data:${type};base64,${base64}`).then(res => res.blob());
            // const decoded = await b64toBlob(response.data.file.buffer, "application/pdf")
            // const urlFile = URL.createObjectURL(decoded);
            if (recepyFile === null ) {
                setRecepyFile(response.data.file.buffer);
            }
        }
    } catch (err) {
        console.log("error:", err);
        setError("Hubo un error al buscar la receta, por favor intente nuevamente en unos momentos.");
      }
  }

  useEffect(() => {
    getRecetaPdf();
});



  const medList = () => {
    let medString = "";
    recepy.meds.map((med) => {
      medString = medString + " " + med.med;
    });
    return medString;
  };


  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        disableTypography
      >
        <IconButton color="secondary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ height: "650px" }}>
        <div style={{ display: "flex", marginRight: 20 }}>
          <Container style={{ height: "600px", width: "45%", alignItems: "center", justifyContent: "center" }}>
            <Container style={{ paddingBottom: 10 }}>
              <Typography variant="h6">Datos de solicitud de receta:</Typography>
            </Container>
            <Card variant="outlined" style={{ width: "100%", height: "80%", display: "flex"}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Paciente:</TableCell>
                    <TableCell>{recepy.patient}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Profesional:</TableCell>
                    <TableCell>{recepy.professional}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Os:</TableCell>
                    <TableCell>{recepy.OS}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell>Medicamentos:</TableCell>
                    <TableCell >{medList()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Modalidad:</TableCell>
                    <TableCell>{recepy.modality}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sede:</TableCell>
                    <TableCell>{recepy.sede}</TableCell>
                  </TableRow>
                  {recepy.patientObs != "" ?
                    <TableRow>
                      <TableCell>Observaciones de paciente:</TableCell>
                      <TableCell>
                        {recepy.patientObs}
                      </TableCell>
                    </TableRow> : <></>}
                </TableBody>
              </Table>
            </Card>
          </Container>

          <Container style={{ background: "grey", color: "black", width: "55%", padding: "1rem", borderLeft: "1px solid white", height: "600px", marginLeft: 10 }}>
           { recepyFile !== null ? <embed src={`data:application/pdf;base64,${recepyFile}`}  type="application/pdf" width="100%" height= "100%"></embed> /*(
            <PDFViewer height="100%" width="100%">
                    <PdfDocument file={{ url: recepyFile }}>
                    </PdfDocument>
            </PDFViewer>
            )*/ : <div></div>}
          {/* <Document file={{data: recepyFile}}></Document> */}
          </Container>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
      <Snackbar open={!!error} onClose={() => console.log("error") /*setReqError(null)*/}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Dialog>
  );
};
