import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage.js";
import DashboardPage from "./pages/DashboardPage.js";
import ProfilePage from "./pages/ProfilePage";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";

import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import InvitePage from "./pages/InvitePage.js";
import CreateInvitePage from "./pages/CreateInvitePage.js";

// Super Admins
import SA_AllAdmins from "./pages/SuperAdminPages/AllAdmins";
import SA_AllHospitals from "./pages/SuperAdminPages/AllHospitals";
import SA_SingleAdmin from "./pages/SuperAdminPages/SingleAdmin";
import SA_SingleHospital from "./pages/SuperAdminPages/SingleHospital";
import SA_SuperAdminHome from "./pages/SuperAdminPages/SuperAdminHome";

// Admins
import A_AdminHome from "./pages/AdminPages/AdminHome";
import A_AllDoctors from "./pages/AdminPages/AllDoctors";
import A_SingleDoctor from "./pages/AdminPages/SingleDoctor";

// Doctors
import D_AllPatients from "./pages/DoctorPages/AllPatients";
import D_DoctorHome from "./pages/DoctorPages/DoctorHome";
import D_RecentUploads from "./pages/DoctorPages/RecentUploads";
import D_SinglePatient from "./pages/DoctorPages/SinglePatient";


// Patients
import P_AllDoctors from "./pages/PatientPages/AllDoctors";
import P_ImageUpload from "./pages/PatientPages/ImageUpload";
import P_PatientHome from "./pages/PatientPages/PatientHome";
import P_SingleDoctor from "./pages/PatientPages/SingleDoctor";


const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        
        <Route exact path="/sadmin/home" component={SA_SuperAdminHome} />
        <Route exact path="/sadmin/hospitals" component={SA_AllHospitals} />
        <Route exact path="/sadmin/hospital/:hospital_id" component={SA_SingleHospital} />
        <Route exact path="/sadmin/admins" component={SA_AllAdmins} />
        <Route exact path="/sadmin/admin/:admin_id" component={SA_SingleAdmin} />
        <Route exact path="/admin/home" component={A_AdminHome} />
        <Route exact path="/admin/doctors" component={A_AllDoctors} />
        <Route exact path="/admin/doctor/:doctor_id" component={A_SingleDoctor} />

        <Route exact path="/doctor/home" component={D_DoctorHome} />
        <Route exact path="/doctor/patients" component={D_AllPatients} />
        <Route exact path="/doctor/patient/:patient_id" component={D_SinglePatient} />
        <Route exact path="/doctor/uploads" component={D_RecentUploads} />

        <Route exact path="/patient/home" component={P_PatientHome} />
        <Route exact path="/patient/doctors" component={P_AllDoctors} />
        <Route exact path="/patient/doctor/:doctor_id" component={P_SingleDoctor} />
        <Route exact path="/patient/uploads" component={P_ImageUpload} />
                
        <Route exact path="/doctors" component={DoctorsPage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/patients" component={PatientsPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/invite/:token_id" component={InvitePage} />
        <Route exact path="/invite" component={CreateInvitePage} />
        {/* We shouldn't have a logout page, ideally the logout function is just called whenever you want to logout I think */}
        <Route exact path="/logout" component={LogoutPage} />
      </Switch>
    </Router>
  );
};

export default App;
