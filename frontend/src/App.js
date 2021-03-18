import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import LoggedOutRoute from "./utils/LoggedOutRoute";
import MainNavbar from "./components/utils/MainNavbar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/My/MyPage";
import LogoutPage from "./pages/LogoutPage";
import FeedbackPage from "./pages/FeedbackPage";
import ShowInvitePage from "./pages/ShowInvitePage";
import AboutUsPage from "./pages/AboutUsPage"
import "./App.css";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const [mainNavbarIsVisible, setMainNavbarIsVisible] = useState(true);
  return (
    <Router>
      {mainNavbarIsVisible ? <MainNavbar /> : null}

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <LoggedOutRoute exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/invites/show/:token_id" component={ShowInvitePage} />
        <PrivateRoute path="/my" accountTypes={["ADMIN", "DOCTOR", "PATIENT"]}>
          <MyPage changeNavbar={setMainNavbarIsVisible} />
        </PrivateRoute>
        <Route exact path="/feedback" component={FeedbackPage} />
        <Route exact path="/about" component={AboutUsPage} />
      </Switch>
    </Router>
  );
};

export default App;
