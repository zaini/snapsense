import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage";
import SubmissionPage from "./SubmissionPage";
import PatientSubmissionsPage from "./PatientSubmissionsPage";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import Profile from "../incomplete/Profile";
import PatientsPage from "../incomplete/PatientsPage";
import AllDoctorsPage from "../incomplete/AllDoctorsPage";

// Main dashboard, where you can place your routers for each dashboard page
const DashboardPage = ({ changeNavbar }) => {
  changeNavbar(false);
  return (
    <DashboardSidebar>
      <Switch>
        <Route exact path="/dashboard/" component={DashboardHomePage} />
        <Route exact path="/dashboard/submit" component={SubmissionPage} />
        {/* This one is for doctors */}
        <Route
          exact
          path="/dashboard/patients/:id/submissions"
          component={PatientSubmissionsPage}
        />
        {/* This one is for patients */}
        <Route
          exact
          path="/dashboard/submissions"
          component={PatientSubmissionsPage}
        />
        <Route exact path="/dashboard/profile" component={Profile} />
        <Route exact path="/dashboard/patients" component={PatientsPage} />
        <Route exact path="/dashboard/doctors" component={AllDoctorsPage} />
      </Switch>
    </DashboardSidebar>
  );
};

export default DashboardPage;
