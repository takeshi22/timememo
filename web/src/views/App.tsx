import React from 'react';
import { Login } from "./components/Login";
import Calender from "./components/Calender";
import { Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <ul>
        <Link to="/calender">calender</Link>
        <Link to="/login">login</Link>
      </ul>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/calender">
          <Calender />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
