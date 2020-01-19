import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ContactList extends Component {
  state = {
    List: []
  };

   componentDidMount = () => {
    axios
      .get("/contacts")
      .then(res =>
        this.setState({
          List: res.data
        })
      )
      .catch(err => console.log("error"));
  };
  onDeleteContact = (id) => {
    axios
      .delete(`/delete-contact/${id}`)
      .then(axios.get("/contacts").then(this.componentDidMount))      
      .catch(err => console.log(err))      
    }      
    
  render() {    
    return (
      <div>
        <h1 className='title-intro'>Contact List</h1>
        <Link to="/add-contact">
          <button className="btn-intro">Add</button>
        </Link>
        <hr />
        <div className="contact-list">
          {this.state.List.map(el => (
            <div className="contact">
              <h1>
                <em>Name : </em> {el.name}
              </h1>
              <h1>
                <em>Tel : </em> {el.telephone}
              </h1>
              <h2>
                <em>E-mail : </em> {el.mail}
              </h2>
              <div style={{ display: "flex", justifyContent: "space-around" }}>                  
                
              <button onClick={()=>this.onDeleteContact(el._id)}>Delete</button>
                              
              <Link to={`/edit/${el._id}`}>
                <button>Edit</button>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default ContactList;
