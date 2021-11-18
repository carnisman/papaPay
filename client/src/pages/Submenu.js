import React, { useContext } from "react";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/Connector"
import { ThemeContext } from "../providers/ThemeProvider";
import { Button } from "@material-ui/core";
//import { config } from "../utils/config";

const Submenu = (props) => {
  const { theme } = useContext(ThemeContext);
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
      props.isConnected(true)
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
        background: theme.content_background,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: `1px solid ${theme.borders}`,
        padding: "1rem 0"
      }}
    >
    <h1 
      style={{
        alignSelf:"center", 
        marginLeft: "150px"
        }}>
          Welcome to PapaPay
    </h1>
    {active 
    ? 
      <>
        <span
          style={{
            marginLeft: "auto",
            padding: "15px"
          }}>
          Connected with <b>{account}</b>
        </span><Button
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
