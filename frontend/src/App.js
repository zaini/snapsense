import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import LoggedOutRoute from "./utils/LoggedOutRoute";
import MainNavbar from "./components/MainNavbar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import InvitePage from "./pages/Dashboard/InvitePage";
import CreateInvitePage from "./pages/Dashboard/CreateInvitePage";
import SubmissionPage from "./pages/Dashboard/SubmissionPage";
import FeedbackPage from "./pages/Dashboard/FeedbackPage";
import LogoutPage from "./pages/LogoutPage";

import "./App.css";

const App = () => {
  const [mainNavbarIsVisible, setMainNavbarIsVisible] = useState(true);
  return (
    <Router>
      {mainNavbarIsVisible ? <MainNavbar /> : null}

      <Switch>
        <Route exact path="/" component={LandingPage} />

        <LoggedOutRoute exact path="/login" component={LoginPage} />

        <PrivateRoute
          path="/dashboard"
          accountTypes={["ADMIN", "DOCTOR", "PATIENT"]}
        >
          <DashboardPage changeNavbar={setMainNavbarIsVisible} />
        </PrivateRoute>

        <Route exact path="/invite/:token_id" component={InvitePage} />
        <Route exact path="/invite" component={CreateInvitePage} />

        <Route exact path="/submission" component={SubmissionPage} />
        <Route exact path="/feedback" component={FeedbackPage} />

        <Route exact path="/logout" component={LogoutPage} />
      </Switch>
    </Router>
  );
};

export default App;
