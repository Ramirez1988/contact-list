import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EditContact extends Component {
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

  componentDidMount = () => {
    axios
      .get(`/contacts/${this.props.id}`)
      .then(res =>
        this.setState({
          ...res.data
        })
      )
      .catch(err => console.log("error"));
  };

  onEditContact = () => {
    axios.put(`/edit-contact/${this.props.id}`, {
      name: this.state.name,
      telephone: this.state.telephone,
      mail: this.state.mail
    });
  };

  render() {
    return (
      <div>
        <h1 className="title-intro">Edit Contact List</h1>
        <form className="style-input">
          <label>Name: </label>
          <input
            type="text"
            name="name"           
            value={this.state.name}
            onChange={this.onChange}
          />
          <br />
          <br />
          <label>tel.: </label>

          <input
            type="text"            
            name="telephone"
            value={this.state.telephone}
            onChange={this.onChange}
          />
          <br />
          <br />
          <label>mail: </label>
          <input
            type="text"          
            name="mail"
            value={this.state.mail}
            onChange={this.onChange}
          />
          <br />
          <br />
          <Link to="/">
            <button onClick={this.onEditContact}>Confirm</button>
          </Link>
        </form>
      </div>
    );
  }
}
export default EditContact;
