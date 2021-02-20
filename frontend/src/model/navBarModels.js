import { Link } from "react-router-dom";
import MailIcon from "@material-ui/icons/Mail";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import GroupIcon from '@material-ui/icons/Group';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

export const navbarOptions = {
  admin: ["Account info", "Doctors", "Patients", "Invite doctor", "Log out"],
  patient: ["Account info", "History", "Upload report", "Log out"],
  doctor: ["Account info", "Patients", "Invite patient", "Latest uploads", "Log out"],
};

//TODO: Change the links to the appropriate pages once created
export const navbarLinks = {
  "Account info": <Link to="/">Account info</Link>,
  "Doctors": <Link to="/">Doctors</Link>,
  "Patients": <Link to="/">Patients</Link>,
  "Invite patient": <Link to="/">Invite Patient</Link>,
  "Invite doctor": <Link to="/">Invite Doctor</Link>,
  "History": <Link to="/">History</Link>,
  "Upload report": <Link to="/">Upload report</Link>,
  "Latest uploads": <Link to="/">Latest uploads</Link>,
  "Log out": <Link to="/">Logout</Link>,
};

export const navbarIcons = {
  "Account info": <AccountBoxIcon />,
  "Doctors": <LocalHospitalIcon />,
  "Patients": <GroupIcon />,
  "Upload report": <NoteAddIcon />,
  "Invite patient": <ContactMailIcon />,
  "Invite doctor": <ContactMailIcon />,
  "History": <HistoryIcon />,
  "Latest uploads": <DynamicFeedIcon />,
  "Log out": <ExitToAppIcon />,
}

