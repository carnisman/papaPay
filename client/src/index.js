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
      connected: false,
      papapay: null
    }
    this.isConnected = this.isConnected.bind(this)
    this.papaApprove = this.papaApprove.bind(this)
    this.papaCreate = this.papaCreate.bind(this)
  }

  isConnected = (x) => {
    this.setState({connected:x})
    if(x) {
      this.blockchainData();
    } else { 
      this.setState({papapay:null})
    }
  }

  blockchainData = async () => {
    const web3 = new Web3(window.ethereum)
    //console.log('Montando APP',web3)
    // Load account
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.setState({ account: accounts[0] })
    //console.log(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = PapaPay.networks[networkId]
    if(networkData) {
      const papapay = new web3.eth.Contract(PapaPay.abi, networkData.address)
      this.setState({ papapay })
      //console.log('PAPAPAY',papapay);
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

  async papaCreate(_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent) {
    const web3 = new Web3(window.ethereum)
    const _papaPriceConv = web3.utils.toWei(_papaPrice.toString(), 'ether')
    const _papaDescConv = web3.utils.asciiToHex(_papaDesc)
    //console.log('Cosas',_papaDescConv, _papaPriceConv, _papaLessons, _papaLock, _papaStudent)
    await this.setState({ loading: true })
    await this.state.papapay.methods.papaCreate(_papaDescConv, _papaPriceConv, _papaLessons, _papaLock, _papaStudent).send({ from: this.state.account })
    .once('receipt', (receipt) => {
     this.setState({ loading: false })
    })
  }
  
  async papaApprove(_papaCourse, _price) {
    await this.setState({ loading: true })
    await this.state.papapay.methods.papaApprove(_papaCourse).send({ from: this.state.account, value: _price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render () {
     return (
    <ThemeProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
          <Routes isConnected={this.isConnected} papapay={this.state.papapay} papaCreate={this.papaCreate} papaApprove={this.papaApprove} />
      </Web3ReactProvider>
    </ThemeProvider>
  );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));