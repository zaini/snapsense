import InvitePatientExists from "./InviteExistingUser";
import InviteDoctorExists from "./InviteDoctorExists";
import InvitePatientNew from "./InviteNewUser";

const InviteForm = ({ invitation }) => {
  if (invitation.accountExists) {
    if (invitation.accountType === "PATIENT") {
      return <InvitePatientExists invitation={invitation} />;
    } else if (invitation.accountType === "DOCTOR") {
      return <InviteDoctorExists invitation={invitation} />;
    }
  }

  // InviteUser
  return <InvitePatientNew invitation={invitation} />;
};

export default InviteForm;
