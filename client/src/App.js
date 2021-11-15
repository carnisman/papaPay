import React, { Component } from "react";
import PapaPay from "./contracts/PapaPay.json";
import logo from './logo.svg';
import getWeb3 from "./getWeb3";
import Navbar from './Navbar';

import "./App.css";

class App extends Component {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

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
        console.log(papapay);
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
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
