import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
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
  TextField,
  List,
  ListItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/HighlightOff";

import { config } from "../utils/config";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/firestore";


export const SecretaryModal = ({ open, onClose, recepy }) => {
  const { theme } = useContext(ThemeContext);
  const [professionalsList, setProfessionalsList] = useState(null);
  const [input, setInput] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);


  useEffect(async () => {
    try {
      const { data: usersFromDb } = await axios.post(`${config.BASE_URL}/users/user/get/rol/profesional`);
      if (!usersFromDb) { console.log("error")} /*setInitialError("No se encontraron usuarios con ese rol.");*/
      else {
        setProfessionalsList(usersFromDb);
        console.log("usersFromdb:", usersFromDb);
      }
    } catch (err) {
      console.log("axios error!: ", err);
    }
  }, []);

  const medList = () => {
    let medString = "";
    recepy.meds.map((med) => {
      medString = medString + " " + med.med;
    });
    return medString;
  };


  // HACER ESTO PARA BUSCAR POR NOMBRE, LA BUSQUEDA POR MAIL ESTA COMO PLACEHOLDER PORQUE NO TENEMOS DATOS DE USUARIO1
  const filterProfessionals = () => {
    console.log("professionals to filter:", professionalsList);
    const filtered = professionalsList.filter((a) =>
      a.lastName.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredProfessionals(filtered);
  };

  const handleSetInputs = (value) => {
    setInput(value);
  };

  const changeToNewProfessional = async (prof) => {
    try {
      firebase
          .firestore()
          .collection("recetas")
          .doc(recepy.id)
          .update({
            professional: prof.email,
            professionalId: prof.sub,
          })
          .then(() => {
            console.log("Document successfully updated!");
          });
      onClose();
    } catch (err) {
      console.log("error:", err);
    }
  };

  const setProfessional = (prof) => {
    setSelectedProfessional(prof);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>

      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        disableTypography
      >
        <Container style={{ paddingBottom: 10 }}>
          <Typography variant="h6">Datos de solicitud de receta:</Typography>
        </Container>
        <IconButton color="secondary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent >
        <Container style={{ display: "flex" }}>

          <Container style={{ width: "90%", alignItems: "center", justifyContent: "center" }}>
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
          </Container>

          <Container>
            <Container style={{display: "flex", padding: 0, justifyContent: "space-between" }}>
              <TextField variant="outlined" value={input} label="Buscar profesional a asignar receta" fullWidth onChange={(e) => handleSetInputs(e.target.value)} />
              <Button variant = "contained" onClick={filterProfessionals}>Buscar</Button>
            </Container>
            <List style={{maxHeight: "100%", overflow: "auto"}} >
              {filteredProfessionals != null ? filteredProfessionals.map((prof, i) => {
                return <ListItem key={"key"}style={{ flexDirection: "row", width: "95%", padding: "1rem", backgroundColor: selectedProfessional == prof ? theme.menu_color_selected : theme.content_background }} onClick={() => setProfessional(prof)}>

                  <Typography variant="h6">{prof.prefijo} {prof.lastName}.</Typography>
                  <Typography variant="h6"> Especialidad: {prof.especialidad}</Typography>

                </ListItem>;
              }) : <div></div>}
            </List>
          </Container>

        </Container>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={() => changeToNewProfessional(selectedProfessional)}>
          Reasignar receta
        </Button>
      </DialogActions>
    </Dialog>
  );
};
