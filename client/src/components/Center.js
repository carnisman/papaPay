import React from "react";

const CenterDiv = (props) => (
  <div
    {...props}
    style={{
      width: "100%",
      height: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexFlow: "column",
      padding: "1rem 0",
    }}
  >
    {props.children}
  </div>
);

export default CenterDiv;