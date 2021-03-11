import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import LoggedOutRoute from "./utils/LoggedOutRoute";
import MainNavbar from "./components/MainNavbar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/My/MyPage";
import SubmissionPage from "./pages/My/SubmissionPage";
import FeedbackPage from "./pages/My/FeedbackPage";
import LogoutPage from "./pages/LogoutPage";
import SubmissionRequestPage from "./pages/SubmissionRequestPage";

import "./App.css";

const App = () => {
  const [mainNavbarIsVisible, setMainNavbarIsVisible] = useState(true);
  return (
    <Router>
      {mainNavbarIsVisible ? <MainNavbar /> : null}

      <Switch>
        <Route exact path="/" component={LandingPage} />

        <LoggedOutRoute exact path="/login" component={LoginPage} />

        <PrivateRoute path="/my" accountTypes={["ADMIN", "DOCTOR", "PATIENT"]}>
          <MyPage changeNavbar={setMainNavbarIsVisible} />
        </PrivateRoute>

        <Route exact path="/submission" component={SubmissionPage} />
        <Route exact path="/feedback" component={FeedbackPage} />

        <PrivateRoute path="/submissions/new" accountTypes={["DOCTOR"]}>
          <SubmissionRequestPage />
        </PrivateRoute>

        <Route exact path="/logout" component={LogoutPage} />
      </Switch>
    </Router>
  );
};

export default App;
