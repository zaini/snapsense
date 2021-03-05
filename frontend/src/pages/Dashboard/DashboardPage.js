import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import SubmissionPage from "./SubmissionPage";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";

// Main dashboard, where you can place your routers for each dashboard page
const DashboardPage = ({ changeNavbar }) => {
  changeNavbar(false);
  return (
    <>
      <DashboardSidebar />
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
