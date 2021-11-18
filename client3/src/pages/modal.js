import React, { useContext, useEffect, useState } from "react";
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
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/HighlightOff";
import { PDFViewer, pdf } from "@react-pdf/renderer";

import { config } from "../utils/config";
import axios from "axios";
import PdfDocument from "./recepyPdf";
import { RejectModal } from "./rejectModal";
import { ShowSedeRecepyModal } from "./recepyToRetrieveModal";
import firebase from "firebase/compat/app";

// import firebase from "firebase/app";
import "firebase/firestore";

export const RecepyModal = ({ open, onClose, recepy, recepyId, setRecepy, signatures }) => {
  const [error, setError] = useState(null);
  const [selectedMed, setSelectedMed] = useState(recepy.meds[0]);
  const [observations, setObservations] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [showSedeRecepyModal, setShowSedeRecepyModal] = useState(null);
  const [hash, setHash] = useState(null);
  const [sendDuplicate, setSendDuplicate] = useState(true);
  const user = localStorage.getItem("user");

  const [sendSedeRecepy, setSendSedeRecepy] = useState(null);

  useEffect(() => {
    console.log("config.baseUrl en recepymodal:", config.BASE_URL);
    randomString();
  });

  const saveFile = async () => {
    const file = await pdf(<PdfDocument recepy={recepy} observations={observations} hash={hash} diagnostico={diagnostico} sendDuplicate={sendDuplicate} user={user} signatures={signatures}/>).toBlob();
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("hash", hash);
      formData.append("hash", hash.toString());
      const { data: fileId } = await axios.post(config.BASE_URL + "/recetas/create", formData);
      console.log("file was correctly sended", fileId);
      await sendRecepy(fileId);
    } catch (err) {
      console.log("error:", err.statusCode);
      setError("Hubo un error al guardar la receta, por favor intente nuevamente en unos momentos.");
    }
    onClose();
  };

  const sendRecepy = async (fileId) => {
    try {
      firebase
          .firestore()
          .collection("recetas")
          .doc(recepy.id)
          .update({
            fileId: fileId,
            status: "ready",
            professionalCheck_ts: new Date(),
          })
          .then(() => {
            console.log("Document successfully updated!");
          });
    } catch (err) {
      console.log("error:", err);
      setError("Hubo un error al enviar receta, por favor intente nuevamente en unos momentos.");
    }
  };


  const handleChange = (ev) => {
    console.log("ev:", ev);
    console.log("event:", ev.target.value);
    const editedMed = {
      ...selectedMed,
      quantity: ev.target.value,
    };
    console.log("editedMed:", editedMed);

    const editedRecepy = {
      ...recepy,
      meds: recepy.meds.map((e, j) => (e.med === editedMed.med ? editedMed : e)),
    };
    console.log("editedRecepy;", editedRecepy);
    setRecepy(editedRecepy);
    setSelectedMed(editedMed);
  };

  const handleMedChange = (ev) => {
    console.log("ev:", ev.target.value);
    setSelectedMed(ev.target.value);
  };

  const medList = () => {
    let medString = "";
    recepy.meds.map((med) => {
      medString = medString + " " + med.med;
    });
    console.log("medString:", medString);
    return medString;
  };

  const showRejectModalFunc = () => {
    setShowRejectModal(true);
  };
  
  const showSedeRecepyModalFunc = () => {
    setShowSedeRecepyModal(true);
  };

  const randomString = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 32; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    console.log("hash:", result);
    if (hash === null) {
      setHash(result);
    }
  };

  const onSedeRecepy = () =>  {
    console.log("entre en onSedeRecepy");
      saveFile();
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      {showRejectModal && <RejectModal onClose={onClose} openReject={showRejectModal} onCloseReject={() => setShowRejectModal(null)} recepy={recepy} />}
      {showSedeRecepyModal && <ShowSedeRecepyModal onClose={onClose} openRecepySede={showSedeRecepyModal} onCloseRecepySede={() => setShowSedeRecepyModal(null)} recepy={recepy} onSedeRecepy={onSedeRecepy} />}

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
            <Card variant="outlined" style={{ width: "100%" }}>
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

            <Typography style={{ paddingTop: 10 }} >Seleccione la cantidad de cada medicamento: </Typography>
            <Container style={{ paddingTop: 10 }}>
              <Select style={{ marginRight: 10 }} name="med" label="Tipo" variant="outlined" labelId="type_label" onChange={(ev) => handleMedChange(ev)} value={selectedMed}>
                {recepy.meds.map((el, i) => (
                  <MenuItem key={"key"} value={el}>{el.med}</MenuItem>
                ))}
              </Select>
              <Select name="type" label="Tipo" variant="outlined" labelId="type_label" onChange={(ev) => handleChange(ev)} value={selectedMed.quantity}>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </Select>
            </Container>
            <Container style={{ paddingTop: 10 }}>
              <Typography>Observaciones(opcional):</Typography>
            </Container>
            <Container style={{ paddingTop: 10 }}>
              <TextField variant="outlined" value={observations} label="Observaciones" multiline fullWidth onChange={(e) => setObservations(e.target.value)} />
            </Container>
            <Container style={{ paddingTop: 10 }}>
              <Typography>Diagnóstico(opcional):</Typography>
            </Container>
            <Container style={{ paddingTop: 10 }}>
              <TextField variant="outlined" value={diagnostico} label="Observaciones" multiline fullWidth onChange={(e) => setDiagnostico(e.target.value)} />
            </Container>
            <Container>
              <FormControlLabel
                control={

                  <Switch
                    checked={sendDuplicate}
                    onChange={() => setSendDuplicate(!sendDuplicate)}
                    name="duplicado"
                    color="primary"
                  />
                }
                label = "Mandar con duplicado"
              />

            </Container>
          </Container>

          <Container style={{ background: "grey", color: "black", width: "55%", padding: "1rem", borderLeft: "1px solid white", height: "600px", marginLeft: 10 }}>
            <PDFViewer height="100%" width="100%">
              <PdfDocument recepy={recepy} observations={observations} hash={hash} diagnostico={diagnostico} sendDuplicate={sendDuplicate} user={user} signatures={signatures}/>
            </PDFViewer>
          </Container>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cancelar
        </Button>
        { recepy.modality === "digital" ?
         <Button variant="contained" color="primary" onClick={saveFile}>
         Enviar receta
       </Button>
        :
        <Button variant="contained" color="primary" onClick={showSedeRecepyModalFunc}>
        Aceptar receta
      </Button> 
        }
        {/* <Button variant="contained" color="primary" onClick={saveFile}>
          Enviar receta
        </Button> */}
        <Button variant="contained" color="primary" onClick={showRejectModalFunc}>
          Rechazar receta
        </Button>
      </DialogActions>

      <Snackbar open={!!error} onClose={() => console.log("error") /*setReqError(null)*/}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Dialog>
  );
};
