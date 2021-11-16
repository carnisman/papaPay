import React, { Component } from "react";
import PapaPay from "./contracts/PapaPay.json";
import Web3 from 'web3'
import Navbar from './Navbar';
import Main from './Main'

import "./App.css";

class App extends Component {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
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

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      papaCount: 0,
      papas: [],
      loading: true
    }
    this.papaCreate = this.papaCreate.bind(this)
    this.papaApprove = this.papaApprove.bind(this)
  }

  papaCreate(_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent) {
    this.setState({ loading: true })
    this.state.papapay.methods.papaCreate(_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  papaApprove(_papaCount, price) {
    this.setState({ loading: true })
    this.state.papapay.methods.papaApprove(_papaCount).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }


  render() {
   // if (!this.state.web3) {
   //   return <div>Loading Web3, accounts, and contract...</div>;
   // }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  papas={this.state.papas}
                  papaCreate={this.papaCreate}
                  papaApprove={this.papaApprove} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
