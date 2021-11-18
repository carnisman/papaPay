import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { environmentCall } from "./server";

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
  return firebase.initializeApp(firebaseConfig);
}

export const googleProvider = new firebase.auth.GoogleAuthProvider;


// Codigo ejemplo para manejar roles de usuario (en el server):

// const admin = require('firebase-admin');
// admin.initializeApp();

//   return admin.auth().getUserByEmail(data.email).then(user => {
//     return admin.auth().setCustomUserClaims(user.uid, {
//       admin: true
//     })
//   }).then(() => {
//     return {
//       message: `Success! ${data.email} has been made an admin.`
//     }
//   }).catch(err => {
//     return err;
//   });
