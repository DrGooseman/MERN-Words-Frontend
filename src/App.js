import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./auth-context";
import { useAuth } from "./hooks/auth-hook";

import WordList from "./pages/WordList";
import Learn from "./pages/Learn";

import "./App.css";
import WordInfo from "./pages/WordInfo";

function App() {
  const { token, login, logout, _id, name } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/wordlist" exact>
          <WordList />
        </Route>
        <Route path="/learn/:Category" exact component={Learn}></Route>
        <Route path="/word/:WordNum" exact component={WordInfo}></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, _id, login, logout, name }}
    >
      <Router>
        <Header />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
