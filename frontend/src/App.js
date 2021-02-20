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
      {/* <div><Navbar/></div> */}
      <div>
        <hr />

        <Switch>
          <Route exact path="/">
            <LoginPage />
            <>
              <Footer />
            </>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
