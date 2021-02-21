import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";
import Navbar from "./components/navBar/Navbar.js";
import InvitePage from "./pages/InvitePage.js";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/invite/:token_id" component={InvitePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
