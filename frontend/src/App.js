import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage.js";
import DashboardPage from "./pages/DashboardPage.js";
import ProfilePage from "./pages/ProfilePage";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";

import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import InvitePage from "./pages/InvitePage.js";
import CreateInvitePage from "./pages/CreateInvitePage.js";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/doctors" component={DoctorsPage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/patients" component={PatientsPage} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/invite/:token_id" component={InvitePage} />
        <Route exact path="/invite" component={CreateInvitePage} />
        {/* We shouldn't have a logout page, ideally the logout function is just called whenever you want to logout I think */}
        <Route exact path="/logout" component={LogoutPage} />
      </Switch>
    </Router>
  );
};

export default App;
