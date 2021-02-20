import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";
import Navbar from "./components/navbar/Navbar.js";

function App() {
  return (
    <Router>
      <div><Navbar/></div>
      <div>
        <hr />

        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
