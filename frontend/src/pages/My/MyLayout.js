import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../../utils/PrivateRoute";

import MySidebar from "../../components/utils/MySidebar/MySidebar";
import PatientsPage from "./PatientsPage";
import DoctorsPage from "./DoctorsPage";
import MyHomePage from "./MyHomePage";
import NewSubmissionPage from "./NewSubmissionPage";
import NewRequestPage from "./NewRequestPage";
import PatientProfilePage from "./PatientProfilePage";
import ProfilePage from "./ProfilePage";
import RequestsPage from "./RequestsPage";
import NewInvitePage from "./NewInvitePage";
import ShowSubmissionPage from "./ShowSubmissionPage";
import SubmissionsPage from "./SubmissionsPage";
import ReviewSubmissions from "./ReviewSubmissions";

// Main my, where you can place your routers for each my page
const MyLayout = () => {
  return (
    <MySidebar>
      <Switch>
        <Route exact path="/my/" component={MyHomePage} />
        <Route exact path="/my/profile" component={ProfilePage} />

        <PrivateRoute
          exact
          path="/my/invites/new"
          accountTypes={["ADMIN", "DOCTOR"]}
        >
          <NewInvitePage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/doctors"
          accountTypes={["ADMIN", "PATIENT"]}
        >
          <DoctorsPage />
        </PrivateRoute>

        <PrivateRoute exact path="/my/patients" accountTypes={["DOCTOR"]}>
          <PatientsPage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/patients/show/:patient_id"
          accountTypes={["DOCTOR"]}
        >
          <PatientProfilePage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/patients/:patient_id/requests"
          accountTypes={["DOCTOR"]}
        >
          <RequestsPage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/patients/:patient_id/requests/new"
          accountTypes={["DOCTOR"]}
        >
          <NewRequestPage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/patients/:patient_id/submissions/show/:submission_id"
          accountTypes={["DOCTOR"]}
        >
          <ShowSubmissionPage />
        </PrivateRoute>

        <PrivateRoute exact path="/my/requests" accountTypes={["PATIENT"]}>
          <RequestsPage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/submissions"
          accountTypes={["PATIENT", "DOCTOR"]}
        >
          <SubmissionsPage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/submissions/review"
          accountTypes={["DOCTOR"]}
        >
          <ReviewSubmissions />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/submissions/new"
          accountTypes={["PATIENT"]}
        >
          <NewSubmissionPage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/my/submissions/show/:submission_id"
          accountTypes={["PATIENT"]}
        >
          <ShowSubmissionPage />
        </PrivateRoute>
      </Switch>
    </MySidebar>
  );
};

export default MyLayout;
