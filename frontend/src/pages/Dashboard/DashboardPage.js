import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import SubmissionPage from "./SubmissionPage";
import DashboardNavbar from "../../components/DashboardNavbar";

const DashboardPage = () => {
  return (
    <>
      <DashboardNavbar />
      <Router>
        <Switch>
          <Route exact path="/dashboard/" component={DashboardHomePage} />
          <Route exact path="/dashboard/submit" component={SubmissionPage} />
        </Switch>
      </Router>
    </>
  );
};

export default DashboardPage;
