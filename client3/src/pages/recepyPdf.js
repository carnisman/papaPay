
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { Container, Divider } from "@material-ui/core";
import { Logo } from "./logo";
import React from "react";



const dateFormatter = () => {
  const today = new Date();
  const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  console.log("formattedDate:", formattedDate);
  return formattedDate.toString();
};


Font.register({
  family: "Open Sans",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf" },
    { src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf", fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Open Sans",
    flexDirection: "column",
    padding: 20,
    fontSize: 10,
  },
  logo: {
    marginTop: -80,
    marginBottom: 20,
  },
  membrete: {
    position: "absolute",
    width: "100%",
    bottom: 10,
    left: 80,
  },
  view_block: {
    paddingVertical: 3,
  },
  report_text: {
    display: "block",
    paddingVertical: 1,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  paragraph: {
    display: "block",
    paddingVertical: 7,
    textAlign: "justify",
  },
});

const PdfDocument = ({ recepy, observations, hash, diagnostico, sendDuplicate, signatures}) => {

  const signatureRandomizer = () => {
    if (signatures === null) {
      return <></>
    } else {
      const randomItemInArray = signatures.signatures[Math.random() * signatures.signatures.length | 0];
      return <Image src={`data:image/png;base64, ${randomItemInArray.buffer.toString("base64")}`}/>
    }
  };


  return (
    <Document title={`receta de ${recepy.patient}`}>
      <Page size="A6" style={styles.page}>

        <Text style={{ fontSize: "8px", textAlign: "center" }}>EMERGENCIA COVID-19</Text>

        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Container style={{ width: "60%" }}>
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>INECO</Text>
            <View style={styles.view_block}>
              <Text style={{ fontSize: "7px" }}>MARCELO T DE ALVEAR 1632, Recoleta, Capital Federal</Text>
            </View>
            <View style={styles.view_block}>
              <Text style={{ fontSize: "7px" }}>Tel: 0810-266-4203</Text>
            </View>
            <View style={styles.view_block}>
              <Text style={{ fontSize: "7px" }}>info@ineco.org.ar</Text>
            </View>
          </Container>
          <Container style={{ width: "50px", justifyContent: "center", alignItems: "center" }}>
            <Logo />
          </Container>
        </View>

        <View style={{ paddingVertical: "10" }}>
          <Divider style={{ width: "100%", height: "1px", backgroundColor: "black" }} />
        </View>

        <Text style={{ fontSize: "9px" }}>APELLIDO Y NOMBRE: {recepy.patient}</Text>
        <Text style={{ fontSize: "9px" }}>COBERTURA: {recepy.OS}</Text>
        <Text style={{ fontSize: "9px" }}>Nº AFILIADO: {recepy.OSNumber}</Text>
        <Text style={{ fontSize: "9px", paddingVertical: "5" }}>Rp/</Text>
        {recepy.meds.map((el) => (
          <Text key={"med1"}style={{ fontSize: "9px", textAlign: "center" }}>
            {el.med.toUpperCase()} ({el.quantity}){" "}
          </Text>
        ))}
        {observations !== "" ? (
          <>
            <Text style={{ fontSize: "9px", paddingVertical: "10" }}>Obs/</Text>
            <Text style={{ fontSize: "9px", paddingVertical: "5", paddingHorizontal: "25" }}>{observations}</Text>
          </>
        ) : (
          <div></div>
        )}
        {diagnostico !== "" ? (
          <>
            <Text style={{ fontSize: "9px", paddingVertical: "10" }}>Diagnóstico/</Text>
            <Text style={{ fontSize: "9px", paddingVertical: "5", paddingHorizontal: "25" }}>{diagnostico}</Text>
          </>
        ) : (
          <div></div>
        )}
        <Container style={{ width: "40%", height: "20%", position: "absolute", bottom: "20", right: "10" }}>
          {signatureRandomizer()}
          <Text style={{ position: "absolute", bottom: "10", fontSize: "8px" }}>Firma y sello del profesional</Text>
          <Text style={{ position: "absolute", bottom: "0", fontSize: "8px", textAlign: "center" }}>{dateFormatter()}</Text>
          <Divider style={{ position: "absolute", width: "100%", height: "1px", backgroundColor: "black", bottom: "20" }} />
        </Container>
        <Text style={{ position: "absolute", bottom: "5", left: "10", fontSize: "9px", paddingVertical: "5" }}>Firma electrónica: {hash}</Text>
      </Page>


      {sendDuplicate ? (
        <Page size="A6" style={styles.page}>
          <Text style={{ fontSize: "8px", textAlign: "center" }}>EMERGENCIA COVID-19</Text>

          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Container style={{ width: "60%" }}>
              <Text style={{ fontSize: "10px", fontWeight: "bold" }}>INECO</Text>
              <View style={styles.view_block}>
                <Text style={{ fontSize: "7px" }}>MARCELO T DE ALVEAR 1632, Recoleta, Capital Federal</Text>
              </View>
              <View style={styles.view_block}>
                <Text style={{ fontSize: "7px" }}>Tel: 0810-266-4203</Text>
              </View>
              <View style={styles.view_block}>
                <Text style={{ fontSize: "7px" }}>info@ineco.org.ar</Text>
              </View>
            </Container>
            <Container style={{ width: "50px", justifyContent: "center", alignItems: "center" }}>
              <Logo />
            </Container>
          </View>

          <View style={{ paddingVertical: "10" }}>
            <Divider style={{ width: "100%", height: "1px", backgroundColor: "black" }} />
          </View>

          <Text style={{ fontSize: "9px" }}>APELLIDO Y NOMBRE: {recepy.patient}</Text>
          <Text style={{ fontSize: "9px" }}>COBERTURA: {recepy.OS}</Text>
          <Text style={{ fontSize: "9px" }}>Nº AFILIADO: {recepy.OSNumber}</Text>
          <Text style={{ fontSize: "10px", textAlign: "center", paddingVertical: "3", textDecorationLine: "underline" }}>DUPLICADO</Text>
          <Text style={{ fontSize: "9px", textAlign: "center", paddingVertical: "5" }}></Text>
          <Text style={{ fontSize: "9px", paddingVertical: "10" }}>Rp/</Text>
          {recepy.meds.map((el) => (
            <Text key={"med2"} style={{ fontSize: "9px", textAlign: "center" }}>
              {el.med.toUpperCase()} ({el.quantity}){" "}
            </Text>
          ))}
          {observations !== "" ? (
            <>
              <Text style={{ fontSize: "9px", paddingVertical: "10" }}>Obs/</Text>
              <Text style={{ fontSize: "9px", paddingVertical: "5", paddingHorizontal: "25" }}>{observations}</Text>
            </>
          ) : (
            <div></div>
          )}
          {diagnostico !== "" ? (
            <>
              <Text style={{ fontSize: "9px", paddingVertical: "10" }}>Diagnóstico/</Text>
              <Text style={{ fontSize: "9px", paddingVertical: "5", paddingHorizontal: "25" }}>{diagnostico}</Text>
            </>
          ) : (
            <div></div>
          )}

          <Container style={{ width: "40%", height: "20%", position: "absolute", bottom: "20", right: "10" }}>
          {signatureRandomizer()}
            <Text style={{ position: "absolute", bottom: "10", fontSize: "8px" }}>Firma y sello del profesional</Text>
            <Text style={{ position: "absolute", bottom: "0", fontSize: "8px", textAlign: "center" }}>{dateFormatter()}</Text>
            <Divider style={{ position: "absolute", width: "100%", height: "1px", backgroundColor: "black", bottom: "20" }} />
          </Container>
          <Text style={{ position: "absolute", bottom: "5", left: "10", fontSize: "9px", paddingVertical: "5" }}>Firma electrónica: {hash}</Text>
        </Page>
      ) : (
        <div></div>
      )}
    </Document>
  );
};

export default PdfDocument;
