import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Routes from "./Routes";
import { Web3ReactProvider } from '@web3-react/core';
import CheckMetamask from "./components/CheckMetamask";
import Web3 from 'web3';
import "./index.css";

function getLibrary(provider) {
  return new Web3(provider)
}

function App() {
  const initApp = async () => {
    //  const env = await environmentCall();
    //  env === "production"
    //    ? console.log = () => { }
    //    : console.log(`Running app in ${env} enviroment`);
  };

  useEffect(initApp, []);

  return (
    <ThemeProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
          <Routes />
      </Web3ReactProvider>
    </ThemeProvider>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));