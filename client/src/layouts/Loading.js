import React from "react";
import { useLocation } from "react-router";
import CenterDiv from "./Center";
import { CambiarTema } from "./cambiarTema";
import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  const location = useLocation();

  return (
    <>
      {console.log("Loading component mounted, path: ", location)}
      <CambiarTema />
      <CenterDiv>
        <CircularProgress color="primary" />
      </CenterDiv>
    </>
  )
}

export default Loading;