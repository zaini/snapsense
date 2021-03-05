import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import SubmissionPage from "./SubmissionPage";
import AllSubmissionsPage from "./AllSubmissionsPage";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import Profile from "../incomplete/Profile";

// Main dashboard, where you can place your routers for each dashboard page
const DashboardPage = ({ changeNavbar }) => {
  changeNavbar(false);
  return (
    <DashboardSidebar>
      <Switch>
        <Route exact path="/dashboard/" component={DashboardHomePage} />
        <Route exact path="/dashboard/submit" component={SubmissionPage} />
        <Route exact path="/dashboard/submissions" component={AllSubmissionsPage} />
        <Route exact path="/dashboard/profile" component={Profile} />
      </Switch>
    </DashboardSidebar>
  );
};

export default DashboardPage;
