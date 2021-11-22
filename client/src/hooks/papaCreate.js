import React, { useState } from "react";
import Web3 from 'web3';

const papaCreate = async (_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent) => {
    const executed = useState(0)
    this.setState ({executed: 1})
    const web3 = new Web3(window.ethereum)
    const _papaPriceConv = web3.utils.toWei(_papaPrice.toString(), 'ether')
    const _papaDescConv = web3.utils.asciiToHex(_papaDesc)
    await this.setState({ loading: true })
    await this.state.papapay.methods
      .papaCreate(_papaDescConv, _papaPriceConv, _papaLessons, _papaLock, _papaStudent)
      .send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ receiptTx: receipt })
        this.setState({ errorMsg: null })
        this.setState({ loading: false })
        this.setState ({executed: 2})
      })
      .on('error', (error) => {
        this.setState({ errorMsg: error.message })
        this.setState ({executed: 3})
       })
  }

export default papaCreate;