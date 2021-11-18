import React from "react";
import { useLocation } from "react-router";

const GetPath = () => {
  const location = useLocation();

  return (
    <>
      {console.log("path: ", location.pathname)}
    </>
  )
}

export default GetPath;