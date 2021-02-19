import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//delete react react and footer to put into diff page
import React from 'react';
import Footer from './components/Footer.js';
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>

      <>
        <Footer />
      </>

    </Router>
  );
}

export default App;
