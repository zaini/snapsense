import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/sections/Header";

import LandingPage from "./pages/LandingPage.js";
import DashboardPage from "./pages/DashboardPage.js";
import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import InvitePage from "./pages/InvitePage.js";
import CreateInvitePage from "./pages/CreateInvitePage.js";
import SubmissionPage from "./pages/SubmissionPage.js";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/login" component={LoginPage} />

        <PrivateRoute exact path="/dashboard">
          <DashboardPage />
        </PrivateRoute>

        <Route exact path="/invite/:token_id" component={InvitePage} />
        <Route exact path="/invite" component={CreateInvitePage} />

        <Route exact path="/submission" component={SubmissionPage} />

        <Route exact path="/logout" component={LogoutPage} />
      </Switch>
    </Router>
  );
};

export default App;
