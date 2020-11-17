import * as React from "react";
import * as ReactDOM from "react-dom";
import { Login } from "./components/Login";
import Calender from "./components/Calender";
import { Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function Index() {
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

ReactDOM.render(<Index />, document.getElementById("app"));
