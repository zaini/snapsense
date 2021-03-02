import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import LandingPage from "./pages/LandingPage.js";
import DashboardPage from "./pages/DashboardPage.js";

import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import InvitePage from "./pages/InvitePage.js";
import CreateInvitePage from "./pages/CreateInvitePage.js";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "./utils/theme";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/invite/:token_id" component={InvitePage} />
        <Route exact path="/invite" component={CreateInvitePage} />
        {/* We shouldn't have a logout page, ideally the logout function is just called whenever you want to logout I think */}
        <Route exact path="/logout" component={LogoutPage} />
      </Switch>
    </Router>
    </ChakraProvider>
  );
}

export default App;
