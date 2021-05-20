

import React from 'react';
// import routes from './components/Routes/Routes';
// import {Switch, Route, Link} from "react-router-dom";
import axios from 'axios';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      orders: [],
      categories: [],
    }
  }
  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
    // Call API
    axios.get(`https://60961d5e116f3f00174b2b20.mockapi.io/api/ym/ecommerce-project`)
      .then(res => {
          console.log(res.data[0].users);
        this.setState({
          users: res.data[0].users,
          orders: res.data[0].orders,
          categories: res.data[0].categories,
        });
      }).catch(error => console.log(error));
  }

  handlePost = () => {
    console.log("POST");
    const product = {
      // id: 8,
      // name: "iPhone",
      // quantity: 2522,
      // img: "kha",
      // price: 250000,
    };
    axios.post(`https://600a5081778d1a00177939c7.mockapi.io/api/v2/product`, product)
      .then(res => {
        console.log(res.data)
        axios.get(`https://600a5081778d1a00177939c7.mockapi.io/api/v2/product`)
          .then(res => {
            this.setState({
              products: res.data,
            });
          }).catch(error => console.log(error));
      })
  }

  handleDelete = () => {
    console.log("DELETE");
    console.log(this.state.products);

    axios.delete(`https://600a5081778d1a00177939c7.mockapi.io/api/v2/product/${this.state.products[0].id}`)
      .then(res => {
        console.log(res.data);
        axios.get(`https://600a5081778d1a00177939c7.mockapi.io/api/v2/product`)
          .then(res => {
            console.log(res.data)
            this.setState({
              products: res.data,
            });
          }).catch(error => console.log(error));
      })
  }

  handlePut = () => {
    console.log("PUT");
    let product = {
      id: 5,
      name: "Update",
      quantity: 2555,
      img: "abc.jpg",
      price: 251,
    }
    axios.put(`https://600a5081778d1a00177939c7.mockapi.io/api/v2/product/${this.state.products[0].id}`, product)
      .then(res => {
        console.log(res.data);
        axios.get(`https://600a5081778d1a00177939c7.mockapi.io/api/v2/product`)
          .then(res => {
            console.log(res.data)
            this.setState({
              products: res.data,
            });
          }).catch(error => console.log(error));
      })
  }
  
  render() {
    console.log("render");
    return (
      <>
        {this.state.users.map((user, index) => {
          return (
            <>
              <h1 key = {index}>{user.fullname}</h1>
              {/* <img src={product.img}></img> */}
            </>
          )
        })}

        {this.state.categories.map((user, index) => {
          return (
            <>
              <h1 key = {index}>{user.details[0].quantity}</h1>
              {/* <img src={product.img}></img> */}
            </>
          )
        })}
        {this.state.orders.map((user, index) => {
          return (
            <>
              <h1 key = {index}>{user.user_id}</h1>
              {/* <img src={product.img}></img> */}
            </>
          )
        })}
        {/* <input type="button" className="btn btn-success" onClick={this.handlePost} value="POST" />
        <input type="button" className="btn btn-warning" onClick={this.handleDelete} value="DELETE" />
        <input type="button" className="btn btn-put" onClick={this.handlePut} value="UPDATE" /> */}
      </>
    )
  }
}

export default Test;