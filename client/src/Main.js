import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Create Course</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const _papaDesc = this.papaDesc.value
          const _papaPrice = window.web3.utils.toWei(this.papaPrice.value.toString(), 'Ether')
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
          { this.props.products.map((product, key) => {
            return(
                <tr key={key}>
                <th scope="row">{papa.papaCount.toString()}</th>
                <td>{papa.papaDesc}</td>
                <td>{window.web3.utils.fromWei(papa.papaPrice.toString(), 'Ether')} Eth</td>
                <td>{papa.papaLessons}</td>
                <td>{papa.papaLock}</td>
                <td>{papa.papaTutor}</td>
                <td>{papa.papaStudent}</td>
                <td>
                    { !product.purchased
                    ? <button
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                        }}
                        >
                        Buy
                        </button>
                    : null
                    }
                    </td>
                </tr>
            )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;