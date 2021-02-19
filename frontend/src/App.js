import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import LoginPage from "./pages/LoginPage.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/*<Switch>
          <Route path='/' exact component={LoginPage} />
          <Route path='/services' component={SomePage} />
          <Route path='/products' component={SomePage} />
          <Route path='/login' component={SomePage} /> 
        </Switch>*/}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>

   
    </>
  );
}

export default App;
