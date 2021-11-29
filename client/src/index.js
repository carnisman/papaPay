import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Routes from "./Routes";
import { Web3ReactProvider } from '@web3-react/core';
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
      // Change the value of myNetwork to your preferred network // 0x3 is for Ropsten // 0x539 if for Ganache -- rememember to set Network Id in Ganache to 1337 too
      myChain: "0x3",
      papaCount: 0,
      papas: [],
      ethAccAddr: '',
      papaAddress: 'Loading...',
      loading: true,
      connected: false,
      papapay: null,
      receiptTx: [],
      errorMsg: null,
      // executed codes --> 0: no execution / 1: waiting execution / 2: successfull execution / 3: error
      crExe: 0,
      tuExe: 0,
      stExe: 0,
    }
    this.ethAccount = this.ethAccount.bind(this)
    this.isConnected = this.isConnected.bind(this)
    this.cleanExe = this.cleanExe.bind(this)
    this.cleanBlockchainData = this.cleanBlockchainData.bind(this)
    this.papaCreate = this.papaCreate.bind(this)
    this.papaApprove = this.papaApprove.bind(this)
    this.papaInitLesson = this.papaInitLesson.bind(this)
    this.papaAttendLesson = this.papaAttendLesson.bind(this)
    this.papaWithdraw = this.papaWithdraw.bind(this)
    this.papaRecover = this.papaRecover.bind(this)
  }

  // this detects the web3-react "active" state, if true stars loading contract, if not, clean all states
  isConnected = (x) => {
    this.setState({connected:x})
    if(x) {
      this.blockchainData();

    } else { 
      this.cleanBlockchainData()
      this.setState({ papaAddress:'' })
      this.setState({ ethAccAddr: '' })
    }
  };

  ethAccount = (y) => {
    this.setState({ ethAccAddr: y })
  };

  cleanExe = () => {
    this.setState({ crExe: 0 })
    this.setState({ tuExe: 0 })
    this.setState({ stExe: 0 })
  };

  cleanBlockchainData = () => {
    this.setState({ papapay:null })
    this.setState({ papas:[] })
  };

  blockchainData = async () => {
    const web3 = new Web3(window.ethereum)
    if (window.ethereum) {
      this.cleanBlockchainData()
      try {
          await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: this.state.myChain }], });
        
          const chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }),16)
          const networkData = PapaPay.networks[chainId]

          if(networkData) {
            const papapay = new web3.eth.Contract(PapaPay.abi, networkData.address)
            this.setState({ papapay })
            const papaCount = await papapay.methods
              .papaCount()
              .call()
            const papaAddress = await papapay._address
            this.setState({ papaAddress })
            this.setState({ papaCount })
            // Load courses
            for (var i = 0; i < papaCount; i++) {
              const papa = await papapay.methods
                .papas(i)
                .call()
              this.setState({ papas: [...this.state.papas, papa] })
            }
            this.setState({ loading: false})
          } 
          else {
              this.cleanBlockchainData()
              this.setState({ errorMsg: "PapaPay isn´t deployed on this network, please, check MetaMask, use Ropsten or a local network configured for network id 1337 accordingly" })
              this.setState({ crExe: 3 })
              this.setState({ tuExe: 3 })
              this.setState({ stExe: 3 })
            }
      } catch (error) {
              this.cleanBlockchainData()
              this.setState({ errorMsg: error.message })
              this.setState({ crExe: 3 })
              this.setState({ tuExe: 3 })
              this.setState({ stExe: 3 })
      }
    } else {
      
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    } 
  };

  async papaCreate(_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent) {
    this.setState({ crExe: 1 })
    const web3 = new Web3(window.ethereum)
    const _papaPriceConv = web3.utils.toWei(_papaPrice.toString(), 'ether')
    const _papaDescConv = web3.utils.asciiToHex(_papaDesc)
    await this.setState({ loading: true })
    await this.state.papapay.methods
      .papaCreate(_papaDescConv, _papaPriceConv, _papaLessons, _papaLock, _papaStudent)
      .send({ from: this.state.ethAccAddr })
      .once('receipt', (receipt) => {
        this.setState({ receiptTx: receipt })
        this.setState({ errorMsg: null })
        this.setState({ loading: false })
        this.setState({ crExe: 2 })
        this.cleanBlockchainData()
      })
      .on('error', (error) => {
        this.setState({ errorMsg: error.message })
        this.setState({ crExe: 3 })
       })
    this.blockchainData()
  }
  
  async papaApprove(_papaCourse, _price) {
    this.setState({ stExe: 1 })
    await this.setState({ loading: true })
    await this.state.papapay.methods
      .papaApprove(_papaCourse)
      .send({ from: this.state.ethAccAddr, value: _price })
      .once('receipt', (receipt) => {
        this.setState({ receiptTx: receipt })
        this.setState({ errorMsg: null })
        this.setState({ loading: false })
        this.setState({ stExe: 2 })
        this.cleanBlockchainData()
      })
      .on('error', (error) => {
        this.setState({ errorMsg: error.message })
        this.setState({ stExe: 3 })
       })
    this.blockchainData()
  }

  async papaInitLesson(_papaCourse) {
    this.setState({ tuExe: 1 })
    await this.setState({ loading: true })
    await this.state.papapay.methods
      .papaInitLesson(_papaCourse)
      .send({ from: this.state.ethAccAddr })
      .once('receipt', (receipt) => {
        this.setState({ receiptTx: receipt })
        this.setState({ errorMsg: null })
        this.setState({ loading: false })
        this.setState({ tuExe: 2 })
        this.cleanBlockchainData()
      })
      .on('error', (error) => {
        this.setState({ errorMsg: error.message })
        this.setState({ tuExe: 3 })
       })
    this.blockchainData()
  }

  async papaAttendLesson(_papaCourse) {
    this.setState({ stExe: 1 })
    await this.setState({ loading: true })
    await this.state.papapay.methods
      .papaAttendLesson(_papaCourse)
      .send({ from: this.state.ethAccAddr })
      .once('receipt', (receipt) => {
        this.setState({ receiptTx: receipt })
        this.setState({ errorMsg: null })
        this.setState({ loading: false })
        this.setState({ stExe: 2 })
        this.cleanBlockchainData()
      })
      .on('error', (error) => {
        this.setState({ errorMsg: error.message })
        this.setState({ stExe: 3 })
       })
    this.blockchainData()
  }

  async papaWithdraw(_papaCourse) {
    this.setState({ tuExe: 1 })
    await this.setState({ loading: true })
    await this.state.papapay.methods
      .papaWithdraw(_papaCourse)
      .send({ from: this.state.ethAccAddr })
      .once('receipt', (receipt) => {
        this.setState({ receiptTx: receipt })
        this.setState({ errorMsg: null })
        this.setState({ loading: false })
        this.setState({ tuExe: 2 })
        this.cleanBlockchainData()
      })
      .on('error', (error) => {
        this.setState({ errorMsg: error.message })
        this.setState({ tuExe: 3 })
       })
    this.blockchainData()
  }

  async papaRecover(_papaCourse) {
    this.setState({ stExe: 1 })
    await this.setState({ loading: true })
    await this.state.papapay.methods
      .papaRecover(_papaCourse)
      .send({ from: this.state.ethAccAddr })
      .once('receipt', (receipt) => {
        this.setState({ receiptTx: receipt })
        this.setState({ errorMsg: null })
        this.setState({ loading: false })
        this.setState({ stExe: 2 })
        this.cleanBlockchainData()
      })
      .on('error', (error) => {
        this.setState({ errorMsg: error.message })
        this.setState({ stExe: 3 })
       })
    this.blockchainData()
  }


  render () {
     return (
    <ThemeProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Routes 
              ethAccount={this.ethAccount}
              isConnected={this.isConnected}
              cleanExe={this.cleanExe}
              cleanBlockchainData={this.cleanBlockchainData}
              papaCreate={this.papaCreate}
              papaApprove={this.papaApprove}
              papaInitLesson={this.papaInitLesson}
              papaAttendLesson={this.papaAttendLesson}
              papaWithdraw={this.papaWithdraw}
              papaRecover={this.papaRecover}
              myChain={this.state.myChain}
              papas={this.state.papas}
              papapay={this.state.papapay}
              papaAddress={this.state.papaAddress}
              crExe={this.state.crExe}
              tuExe={this.state.tuExe}
              stExe={this.state.stExe}
              errorMsg={this.state.errorMsg}
              receiptTx={this.state.receiptTx}
            />
        </Web3ReactProvider>
    </ThemeProvider>
  );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));