import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyHomePage from "./MyHomePage";
import SubmissionPage from "./SubmissionPage";
import PatientSubmissionsPage from "./PatientSubmissionsPage";
import MySidebar from "../../components/MySidebar/MySidebar";
import Profile from "../incomplete/Profile";
import PatientsPage from "../incomplete/PatientsPage";
import DoctorsPage from "../incomplete/DoctorsPage";
import InvitePage from "./pages/My/InvitePage";
import CreateInvitePage from "./pages/My/CreateInvitePage";

// Main my, where you can place your routers for each my page
const MyPage = ({ changeNavbar }) => {
  changeNavbar(false);
  return (
    <MySidebar>
      <Switch>
        <Route exact path="/my/" component={MyHomePage} />
        <Route exact path="/invite/:token_id" component={InvitePage} />
        <Route exact path="/invites/new" component={CreateInvitePage} />
        {/* This one is for doctors */}
        <Route
          exact
          path="/my/patients/:id/submissions"
          component={PatientSubmissionsPage}
        />
        {/* <Route
          exact
          path="/my/patients/:id/submissions/new"
          component={RequestSubmissionPage}
        /> */}
        {/* This one is for patients */}
        {/* <Route
          exact
          path="/my/submissions"
          component={PatientsPersonalLogPage}
        /> */}
        <Route
          exact
          path="/my/submissions/new"
          component={SubmissionPage}
        />
        <Route exact path="/my/profile" component={Profile} />
        <Route exact path="/my/patients" component={PatientsPage} />
        <Route exact path="/my/doctors" component={DoctorsPage} />
      </Switch>
    </MySidebar>
  );
};

export default MyPage;
