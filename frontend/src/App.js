import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";

import MyLayout from "./pages/My/MyLayout";
import HomeLayout from "./pages/Home/HomeLayout";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/my" accountTypes={["SUPERADMIN", "ADMIN", "DOCTOR", "PATIENT"]}>
          <MyLayout />
        </PrivateRoute>

        <Route path="/" component={HomeLayout} />
      </Switch>
    </Router>
  );
};

export default App;
