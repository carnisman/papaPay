import React, { useEffect, useState } from "react";
import { environmentCall } from "../utils/server";
import CenterDiv from "../components/Center";
import { CircularProgress } from "@material-ui/core";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { config } from "../utils/config";

export const initFirebase = async () => {
  const env = await environmentCall();
  const firebaseConfig = env === "production" ? {
    // Firebase production project
    apiKey: "AIzaSyAnGWt62GxFQSPKQ1ZE3UzCv8F5hP0R-28",
    authDomain: "antares-ineco.firebaseapp.com",
    projectId: "antares-ineco",
    storageBucket: "antares-ineco.appspot.com",
    messagingSenderId: "779092776325",
    appId: "1:779092776325:web:dce812219f74208c8620ec",
    measurementId: "G-YJ3KR53CM6",
  } : {
    // Firebase development project
    apiKey: "AIzaSyBRJLXEJk7nzTZkqrXTD7n-IL5E6D-h9Qs",
    authDomain: "ineco-antares-dev.firebaseapp.com",
    projectId: "ineco-antares-dev",
    storageBucket: "ineco-antares-dev.appspot.com",
    messagingSenderId: "493658108651",
    appId: "1:493658108651:web:f3804b71d6c33a931844ae",
    measurementId: "G-DFTLY7RMSL"
  };
  return firebase.apps.length 
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig)
}

export const FirebaseContext = React.createContext();

export const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const mountProvider = async () => {
    console.log("Mounting firebase provider");
    if (config.OFFLINE === "true") return setLoading(false)

    const app = await initFirebase();
    setFirebaseApp(app);
    setLoading(false);
  }

  useEffect(mountProvider, []);

  if (loading) return <CenterDiv><CircularProgress color="primary" /></CenterDiv>

  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        googleProvider: new firebase.auth.GoogleAuthProvider
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

