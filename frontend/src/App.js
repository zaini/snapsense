import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//delete react react and footer to put into diff page
import React from 'react';
import Footer from './components/Footer.js';
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";
import Navbar from "./components/navBar/Navbar.js";
import InvitePage from "./pages/InvitePage.js";
import PatientsPersonalLogPage from "./pages/PatientsPersonalLogPage.js";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div>
        <hr />

        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/invite/:token_id" component={InvitePage} />
          <Route exact path="/logs" component={PatientsPersonalLogPage}/>
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
