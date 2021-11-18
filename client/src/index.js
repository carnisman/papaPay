import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Routes from "./Routes";
import { Web3ReactProvider } from '@web3-react/core';
import CheckMetamask from "./components/CheckMetamask";
import Web3 from 'web3';
import "./index.css";
import PapaPay from "./contracts/PapaPay.json"

function getLibrary(provider) {
  return new Web3(provider)
}


class App extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      papaCount: 0,
      papas: [],
      loading: true,
      connected: false
    }
    this.isConnected = this.isConnected.bind(this)
  }

  isConnected = (x) => {
    this.setState({connected:x})
    console.log('Running is connected',x)
  }

  BlockchainData = async () => {
    const web3 = window.web3
    console.log('Montando APP',web3)
    // Load account
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = PapaPay.networks[networkId]
    if(networkData) {
      const papapay = new web3.eth.Contract(PapaPay.abi, networkData.address)
      this.setState({ papapay })
      console.log(papapay);
      const papaCount = await papapay.methods.papaCount().call()
      this.setState({ papaCount })
      // Load courses
      for (var i = 0; i <= papaCount; i++) {
       const papa = await papapay.methods.papas(i).call()
        this.setState({
          papas: [...this.state.papas, papa]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('PapaPay contract not deployed to detected network.')
    }
  }


  render () {
     return (
    <ThemeProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
          <Routes isConnected={this.isConnected}/>
      </Web3ReactProvider>
    </ThemeProvider>
  );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));