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

import WordInfo from "./pages/WordInfo";

import "./App.css";
import Welcome from "./pages/Welcome";
import ContactMe from "./pages/ContactMe";

function App() {
  const { token, login, logout, _id, name, lang } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/wordlist" exact>
          <WordList />
        </Route>
        <Route path="/learn/:Category" exact component={Learn}></Route>
        <Route path="/word/:WordNum" exact component={WordInfo}></Route>
        <Route path="/welcome" exact>
          <Welcome />
        </Route>
        <Route path="/contactme" exact>
          <ContactMe />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/dashboard" exact>
          <Login />
        </Route>
        <Route path="/welcome" exact>
          <Welcome />
        </Route>
        <Route path="/contactme" exact>
          <ContactMe />
        </Route>
        <Redirect to="/welcome" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, _id, login, logout, name, lang }}
    >
      <Router>
        <Header />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
