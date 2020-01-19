import React from "react";
import { Route, Switch } from "react-router-dom";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ContactList} />
        <Route exact path="/add-contact" component={AddContact} />
        <Route exact path="/edit/:id" render={ props => <EditContact id={props.match.params.id} />} />
      </Switch>
    </div>
  );
}

export default App;
