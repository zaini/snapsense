import { Link } from "react-router-dom";

export const navBarOptions = {
  admin: ["Account info", "Doctors", "Patients", "Invite patient", "Log out"],
  patient: ["Account info", "History", "Patient upload", "Log out"],
  doctor: ["Account info", "Patients", "Invite patient", "Latest Uploads", "Log out"],
};

//TODO: Change the links to the appropriate pages once created
export const navBarLinks = {
  "Account info": <Link to="/">Home</Link>,
  "Doctors": <Link to="/">Home</Link>,
  "Patients": <Link to="/">Home</Link>,
  "Invite patient": <Link to="/">Home</Link>,
  "History": <Link to="/">Home</Link>,
  "Latest uploads": <Link to="/">Home</Link>,
  "Log out": <Link to="/">Home</Link>,
};

