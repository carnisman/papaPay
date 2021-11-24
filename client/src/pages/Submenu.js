import React, { useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/Connector"
import { ThemeContext } from "../providers/ThemeProvider";
import { Button } from "@material-ui/core";
import "./submenu.css"

const Submenu = (props) => {
  const { theme } = useContext(ThemeContext);
  const { active, account, activate, deactivate } = useWeb3React()

  useEffect(() => {
    props.isConnected(active)
  },[active]);

  useEffect(() => {
    props.ethAccount(account)
  },[account]);

  async function connect() {
    try {
      //const response=await activate(injected)
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }
 
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: `1px solid ${theme.borders}`,
        padding: "1rem 0"
      }}
      className="backpapa"
    >
    <div>
          <h1 className="gradpapa"><a href="/">Welcome to PapaPay</a></h1>
    </div>
    {active 
    ? 
      <>
        <span
          style={{
            marginLeft: "auto",
            padding: "2px",
            marginRight: "40px"
          }}>
          <div
          style={{
            padding: "2px"
          }}>
          Connected with wallet: <b>{account}</b>
          </div>
          <div
          style={{
            padding: "2px"
          }}>
          PapaPay contract address: <b>{props.papaAddress}</b>
          </div>
        </span>
        <Button
          onClick={disconnect}
          variant="contained"
          color="primary"
          style={{
            marginRight: "150px",
            width: "250px"
          }}
        >
            Disconnect
          </Button>
      </>
    : 
      <>
        <span
          style={{
            marginLeft: "auto",
            padding: "15px"
          }}>
          Not connected
        </span><Button
          onClick={connect}
          variant="contained"
          color="primary"
          style={{
            marginRight: "150px",
            width: "250px"
          }}
        >
            Connect to Metamask
          </Button>
      </>
    }
    </div>
  );
};

export default Submenu;
