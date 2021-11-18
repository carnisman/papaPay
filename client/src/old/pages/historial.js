import React, {  useEffect, useState } from "react";
import { Card, Container, List, ListItem, Typography, CardHeader, CardContent } from "@material-ui/core";
import Submenu from "../../pages/Submenu";

import jwt from "jsonwebtoken";
import { config } from "../../utils/config";
import usePermisos from "../utils/usePermisos";
import firebase from "firebase/compat/app";
import "firebase/firestore";

import { HistorialModal } from "./historialModal";

const Historial = () => {
  const [recetas, setRecetas] = useState([]);
  const [ /*reqError,*/ setReqError] = useState(null);
  const [/*loading,*/ setLoading] = useState(true);
  const [showHistorialModal, setShowHistorialModal] = useState(null);
  const [permisos, setPermisos] = useState({});
  const [recepy, setRecepy] = useState(null);
  const { isAllowed } = usePermisos({ group: "recetas" });

  const getPrescriptions = async () => {
    const permisos = jwt.decode(localStorage.getItem("permisos"))?.permisos;
    setPermisos(permisos);
    if (!permisos || !permisos.includes("pacientes-editar")) {
      window.top.location = config.BASE_URL + "/404";
    }

    if (permisos.includes("recetas-secretaria")) {
      try {
        const db = firebase.firestore();
        db.collection("recetas")
          .where("status", "==", "ready")
          .onSnapshot((querySnapshot) => {
            const recetasTemp = [];
            let recetaTemp;
            querySnapshot.forEach((doc) => {
              recetaTemp = doc.data();
              recetaTemp.id = doc.id;
              recetasTemp.push(recetaTemp);
            });
            dataSorter(recetasTemp);
          });
      } catch (err) {
        console.log("error firebase: ", err);
        setReqError("Error al conectar con el servidor, intente nuevamente en unos instantes");
        setLoading(false);
      }
    }

    if (permisos.includes("recetas-profesional")) {
      try {
        const db = firebase.firestore();
        db.collection("recetas")
          .where("status", "==", "ready")
          .where("professionalId", "==", jwt.decode(localStorage.getItem("user")).sub)
          .onSnapshot((querySnapshot) => {
            const recetasTemp = [];
            let recetaTemp;
            querySnapshot.forEach((doc) => {
              recetaTemp = doc.data();
              recetaTemp.id = doc.id;
              recetasTemp.push(recetaTemp);
            });
            dataSorter(recetasTemp);
          });
      } catch (err) {
        console.log("error firebase: ", err);
        setReqError("Error al conectar con el servidor, intente nuevamente en unos instantes");
        setLoading(false);
      }
    }
  };

  useEffect(isAllowed ? getPrescriptions : () => {}, [isAllowed]);

  const dataSorter = (recetasTemp) => {
    const recetasSorted = recetasTemp.sort((d1, d2) => {
      const differenceInTime = new Date(d2.generated_ts).getTime() - new Date(d1.generated_ts).getTime();
      return differenceInTime;
    });
    setRecetas(recetasSorted);
  };

  const dataToModal = (el, index) => {
    setRecepy(el);
    setShowHistorialModal(true);
  };

  function formatDate(date) {
    var d = new Date( date.seconds * 1000 + date.nanoseconds / 1000 );
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 

  const medList = (prescription) => {
    let medString = "";
    prescription.meds.map((med) => {
      medString = medString + " " + med.med;
    });
    return medString;
  };

  return (
    <>
    <Submenu/>
    <Container style={{ marginTop: "3rem" }} maxWidth="sm">
      {showHistorialModal && <HistorialModal open={showHistorialModal} onClose={() => setShowHistorialModal(null)} recepy={recepy}/>}
      {recetas.length === 0 ? (
        <Typography variant="h6">Todavia no tiene ninguna receta en el historial.</Typography>
      ) : (
        <>
          <Typography variant="h6">Historial de recetas:</Typography>
          <List>
            {recetas.map((el, i) => (
              <ListItem key={i}>
                <Card style={{ width: "95%", padding: "1rem", cursor: "pointer" }} onClick={() => dataToModal(el, i)}>
                  <CardHeader style={{ padding: "0" }} disableTypography title={<Typography variant="h6">{el.patient}</Typography>} />
                  <CardContent style={{ padding: "0.5rem" }}>
                    <Typography variant="body1">Profesional a cargo: {el.professional}</Typography>
                    <Typography variant="body1">Medicamentos: {medList(el)}</Typography>
                    <Typography variant="body1">Fecha de envio: {formatDate(el.professionalCheck_ts)}</Typography>

                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
    </>
  );
};

export default Historial;
