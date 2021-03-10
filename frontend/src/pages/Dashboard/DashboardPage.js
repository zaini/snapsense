import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import SubmissionPage from "./SubmissionPage";
import PatientSubmissionsPage from "./PatientSubmissionsPage";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import Profile from "../incomplete/Profile";
import PatientsPage from "../incomplete/PatientsPage";

// Main dashboard, where you can place your routers for each dashboard page
const DashboardPage = ({ changeNavbar }) => {
  changeNavbar(false);
  return (
    <DashboardSidebar>
      <Switch>
        <Route exact path="/dashboard/" component={DashboardHomePage} />
        <Route exact path="/dashboard/submit" component={SubmissionPage} />
        <Route
          exact
          path="/dashboard/patients/:id/submissions"
          component={PatientSubmissionsPage}
        />
        <Route exact path="/dashboard/profile" component={Profile} />
        <Route exact path="/dashboard/patients" component={PatientsPage} />
      </Switch>
    </DashboardSidebar>
  );
};

export default DashboardPage;
