import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from 'react';
import Footer from './components/Footer.js';
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import Navbar from "./components/navBar/Navbar.js";
import InvitePage from "./pages/InvitePage.js";
import AllDoctorsPage from "./pages/AllDoctorsPage.js";
import AllPatientsPage from "./pages/AllPatientsPage.js";
import PatientsPersonalLogPage from "./pages/PatientsPersonalLogPage.js";
import PatientsLogPage from "./pages/PatientsLogPage.js";
import CreateInvitePage from "./pages/CreateInvitePage.js";
import SubmissionPage from "./pages/SubmissionPage.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/invite/:token_id" component={InvitePage} />
        <Route exact path="/invite" component={CreateInvitePage} />
        <Route exact path="/doctors" component={AllDoctorsPage} />
        <Route exact path="/all_patients" component={AllPatientsPage} />
        <Route exact path="/logs" component={PatientsPersonalLogPage}/>
        <Route exact path="/patients" component={PatientsLogPage}/>
        <Route exact path="/submission" component={SubmissionPage}/>
        {/* We shouldn't have a logout page, ideally the logout function is just called whenever you want to logout I think */}
        <Route exact path="/logout" component={LogoutPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
