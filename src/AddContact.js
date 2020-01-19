import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AddContact extends Component {
  state = {
    name: "",
    telephone: "",
    mail: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onAddContact = () => {
    axios
      .post("/add-contact", {
        name: this.state.name,
        telephone: this.state.telephone,
        mail: this.state.mail
        
      })
      .then(res => res.data)
      .catch(err => console.log("error"));
  };
  render() {
    return (
      <div>
        <h1 className="title-intro">Add Contact List</h1>
        <form className="style-input">
          <label>name: </label>
          <input
            type="text"
            placeholder="Enter name here...."
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <br />
          <br />
          <label>tel.: </label>
          <input
            type="text"
            placeholder="Enter telephone number here...."
            name="telephone"
            value={this.state.telephone}
            onChange={this.onChange}
          />
          <br />
          <br />
          <label>mail: </label>
          <input
            type="text"
            placeholder="Enter e-mail here...."
            name="mail"
            value={this.state.mail}
            onChange={this.onChange}
          />
          <br />
          <br />
          <Link to="/">
            <button onClick={this.onAddContact}>Confirm</button>
          </Link>
        </form>
      </div>
    );
  }
}
export default AddContact;
