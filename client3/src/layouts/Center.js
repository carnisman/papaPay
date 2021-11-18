import React from "react";

const CenterDiv = (props) => (
  <div
    {...props}
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {props.children}
  </div>
);

export default CenterDiv;
