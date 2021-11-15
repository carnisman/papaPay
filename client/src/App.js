import React, { Component } from "react";
import PapaPay from "./contracts/PapaPay.json";
import logo from './logo.svg';
import getWeb3 from "./getWeb3";
import Navbar from './Navbar';
import Main from './Main'
import * as Utils from 'web3-utils';

import "./App.css";

class App extends Component {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      const web3_utils = require('web3-utils');
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] })
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId)
      const deployedNetwork = PapaPay.networks[networkId];
      console.log(deployedNetwork)
      if(deployedNetwork) {
        const papapay = new web3.eth.Contract(PapaPay.abi, deployedNetwork && deployedNetwork.address)
        this.setState({ papapay })
        const papaCount = await papapay.methods.papaCount().call()
        console.log(papaCount);
        console.log(papapay);
        console.log(web3.eth);
        this.setState({ loading: false})
      } else {
        window.alert('PapaPay contract not deployed to detected network.')
      }
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      papaCount: 0,
      papas: [],
      loading: true
    }
    this.papaCreate = this.papaCreate.bind(this)
  }

  papaCreate(_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent) {
    this.setState({ loading: true })
    this.state.papapay.methods.papaCreate(_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent).send({ from: this.state.account })
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
                : <Main createProduct={this.createProduct} />
              }
          </main>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
