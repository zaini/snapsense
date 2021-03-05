import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import MainNavbar from "./components/MainNavbar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import InvitePage from "./pages/Dashboard/InvitePage";
import CreateInvitePage from "./pages/Dashboard/CreateInvitePage";
import SubmissionPage from "./pages/Dashboard/SubmissionPage";
import LogoutPage from "./pages/LogoutPage";

import "./App.css";

const App = () => {
  return (
    <Router>
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/login" component={LoginPage} />

        <PrivateRoute path="/dashboard">
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
