import React from "react";
import CenterDiv from "./Center";
import { CircularProgress } from "@material-ui/core";

const Loading = () =>
    <CenterDiv>
      <CircularProgress color="primary" />
    </CenterDiv>

export default Loading;