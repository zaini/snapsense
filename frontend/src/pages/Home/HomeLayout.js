import React from "react";
import { Switch, Route } from "react-router-dom";

import LoggedOutRoute from "../../utils/LoggedOutRoute";

import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import NewFeedbackPage from "./NewFeedbackPage";
import ShowInvitePage from "./ShowInvitePage";
import ErrorPage from "./ErrorPage";
import MainNavbar from "../../components/utils/MainNavbar";

const HomeLayout = () => {
  return (
    <>
      <MainNavbar />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <LoggedOutRoute exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route
          exact
          path="/invites/show/:token_id"
          component={ShowInvitePage}
        />
        <Route exact path="/feedback" component={NewFeedbackPage} />

        <Route path="/error" component={ErrorPage} />
      </Switch>
    </>
  );
};

export default HomeLayout;
