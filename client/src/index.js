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
      //account: '',
      papaCount: 0,
      papas: [],
      loading: true,
      connected: false,
      papapay: null,
      papaAddress: 'Loading...',
      receiptTx: [],
      errorMsg: null,
      // executed codes --> 0: no execution / 1: waiting execution / 2: successfull execution / 3: error
      crExe: 0,
      tuExe: 0,
      stExe: 0,
      ethAccAddr: '',
      walDisabler: false
    }
    this.ethAccount = this.ethAccount.bind(this)
    this.isConnected = this.isConnected.bind(this)
    this.cleanExe = this.cleanExe.bind(this)
    this.cleanBlockchainData = this.cleanBlockchainData.bind(this)
    this.walEnabler = this.walEnabler.bind(this)
    this.papaCreate = this.papaCreate.bind(this)
    this.papaApprove = this.papaApprove.bind(this)
    this.papaInitLesson = this.papaInitLesson.bind(this)
    this.papaAttendLesson = this.papaAttendLesson.bind(this)
    this.papaWithdraw = this.papaWithdraw.bind(this)
    this.papaRecover = this.papaRecover.bind(this)
  }

  isConnected = (x) => {
    this.setState({connected:x})
    if(x) {
      this.blockchainData();

    } else { 
      this.setState({ papapay:null })
      this.setState({ papas:[] })
      this.setState({ papaAddress:'' })
      this.setState({ ethAccAddr: '' })
    }
  }

  walEnabler = () => {
    this.setState({ walDisabler: true })
  }

  ethAccount = (y) => {
    this.setState({ ethAccAddr: y })
  }

  cleanExe = () => {
    this.setState({ crExe: 0 })
    this.setState({ tuExe: 0 })
    this.setState({ stExe: 0 })
  }

  cleanBlockchainData = () => {
    this.setState({ papapay:null })
    this.setState({ papas:[] })
  }

  blockchainData = async () => {
    const web3 = new Web3(window.ethereum)
    const networkId = await web3.eth.net.getId()
    const networkData = PapaPay.networks[networkId]
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
    } else {
        window.alert('PapaPay contract not deployed to detected network.')
        this.isConnected(false)
        this.setState({walDisabler: false})
    }
  }

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
        this.setState({ papapay:null })
        this.setState({ papas:[] })
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
        this.setState({ papapay:null })
        this.setState({ papas:[] })
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
        this.setState({ papapay:null })
        this.setState({ papas:[] })
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
        this.setState({ papapay:null })
        this.setState({ papas:[] })
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
        this.setState({ papapay:null })
        this.setState({ papas:[] })
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
        this.setState({ papapay:null })
        this.setState({ papas:[] })
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
            walEnabler={this.walEnabler}
            papas={this.state.papas}
            papapay={this.state.papapay}
            papaAddress={this.state.papaAddress}
            crExe={this.state.crExe}
            tuExe={this.state.tuExe}
            stExe={this.state.stExe}
            errorMsg={this.state.errorMsg}
            receiptTx={this.state.receiptTx}
            walDisabler={this.state.walDisabler}
          />
      </Web3ReactProvider>
    </ThemeProvider>
  );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));