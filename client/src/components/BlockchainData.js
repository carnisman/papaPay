import PapaPay from "../contracts/PapaPay.json";

const BlockchainData = async () => {
    const web3 = window.web3
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

export default BlockchainData;