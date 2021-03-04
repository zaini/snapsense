import { Link } from "react-router-dom";
import MailIcon from "@material-ui/icons/Mail";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import GroupIcon from "@material-ui/icons/Group";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import HistoryIcon from "@material-ui/icons/History";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

export const navbarOptions = {
  admin: ["Account info", "Doctors", "Patients", "Invite doctor", "Log out"],
  patient: ["Account info", "History", "Upload report", "Log out"],
  doctor: [
    "Account info",
    "Patients",
    "Invite patient",
    "Latest uploads",
    "Log out",
  ],
};

//TODO: Change the links to the appropriate pages once created
export const headerToRoute = {
  "Account info": "/account_info",
  Doctors: "/doctor_list",
  Patients: "/patient_list",
  "Invite patient": "/invite",
  "Invite doctor": "/invite",
  History: "/logs",
  "Upload report": "/upload",
  "Latest uploads": "/latest_list",
  "Log out": "/",
};

export const navbarIcons = {
  "Account info": <AccountBoxIcon />,
  Doctors: <LocalHospitalIcon />,
  Patients: <GroupIcon />,
  "Upload report": <NoteAddIcon />,
  "Invite patient": <ContactMailIcon />,
  "Invite doctor": <ContactMailIcon />,
  History: <HistoryIcon />,
  "Latest uploads": <DynamicFeedIcon />,
  "Log out": <ExitToAppIcon />,
};
