import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Create Course</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const _papaDesc = this.papaDesc.value
          const _papaPrice = window.web3_utils.toWei(this.papaPrice.value.toString(), 'Ether')
          const _papaLessons = this.papaLessons.value
          const _papaLock = this.papaLock.value
          const _papaStudent = this.papaStudent.value
          this.props.papaCreate(_papaDesc, _papaPrice, _papaLessons, _papaLock, _papaStudent)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="papaDesc"
              type="text"
              ref={(input) => { this.papaDesc = input }}
              className="form-control"
              placeholder="Course description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="papaPrice"
              type="text"
              ref={(input) => { this.papaPrice = input }}
              className="form-control"
              placeholder="Course Price"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="papaLessons"
              type="text"
              ref={(input) => { this.papaLessons = input }}
              className="form-control"
              placeholder="Number of lessons"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="papaLock"
              type="text"
              ref={(input) => { this.papaLock = input }}
              className="form-control"
              placeholder="Timelock period"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="papaStudent"
              type="text"
              ref={(input) => { this.papaStudent = input }}
              className="form-control"
              placeholder="Student address"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p> </p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            <tr>
              <th scope="row">1</th>
              <td>iPhone x</td>
              <td>1 Eth</td>
              <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
              <td><button className="buyButton">Buy</button></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Macbook Pro</td>
              <td>3 eth</td>
              <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
              <td><button className="buyButton">Buy</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Airpods</td>
              <td>0.5 eth</td>
              <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
              <td><button className="buyButton">Buy</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;