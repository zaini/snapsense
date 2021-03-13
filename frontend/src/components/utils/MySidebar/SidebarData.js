import {
  AccountBox,
  Contacts,
  ContactMail,
  Home,
  ContactPhone,
  ListAlt,
  AddToPhotos,
  Event,
} from "@material-ui/icons";

// TODO update icons

const AdminSideBarData = [
  {
    title: "Home",
    path: "/my",
    icon: <Home />,
  },
  {
    title: "Invite Doctors",
    path: "/my/invites/new",
    icon: <ContactMail />,
  },
  {
    title: "View Doctors",
    path: "/my/doctors",
    icon: <Contacts />,
  },
  {
    title: "My Profile",
    path: "/my/profile",
    icon: <AccountBox />,
  },
];

const DoctorSideBarData = [
  {
    title: "Home",
    path: "/my",
    icon: <Home />,
  },
  {
    title: "Invite Patients",
    path: "/my/invites/new",
    icon: <ContactMail />,
  },
  {
    title: "View Patients",
    path: "/my/patients",
    icon: <Contacts />,
  },
  {
    title: "Review Patients",
    path: "/my/submissions/review",
    icon: <ContactPhone />,
  },
  {
    title: "View All Submission",
    path: "/my/submissions/",
    icon: <ContactPhone />,
  },
  {
    title: "My Profile",
    path: "/my/profile",
    icon: <AccountBox />,
  },
];

const PatientSideBarData = [
  {
    title: "Home",
    path: "/my",
    icon: <Home />,
  },
  {
    title: "View My Submissions",
    path: "/my/submissions",
    icon: <ListAlt />,
  },
  {
    title: "Create New Submission",
    path: "/my/submissions/new",
    icon: <AddToPhotos />,
  },
  {
    title: "View My Requests",
    path: "/my/requests",
    icon: <Event />,
  },
  {
    title: "My Doctors",
    path: "/my/doctors",
    icon: <Contacts />,
  },
  {
    title: "My Profile",
    path: "/my/profile",
    icon: <AccountBox />,
  },
];

export const SidebarData = {
  ADMIN: AdminSideBarData,
  DOCTOR: DoctorSideBarData,
  PATIENT: PatientSideBarData,
};
