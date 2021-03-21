import {
  AccountBox,
  AddToPhotos,
  Create,
  Contacts,
  ContactMail,
  Feedback,
  Gavel,
  Home,
  ContactPhone,
  ListAlt,
  LocalHospital,
  Event,
} from "@material-ui/icons";

// TODO update icons

const SuperAdminSideBarData = [
  {
    title: "Create Hospitals",
    path: "/my/hospitals/new",
    icon: <Create />,
  },
  {
    title: "View Hospitals",
    path: "/my/hospitals",
    icon: <LocalHospital />,
  },
  {
    title: "View Admins",
    path: "/my/admins",
    icon: <Gavel />,
  },
  {
    title: "View Feedback",
    path: "/my/feedback",
    icon: <Feedback />,
  },
  {
    title: "My Profile",
    path: "/my/profile",
    icon: <AccountBox />,
  },
];

const AdminSideBarData = [
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
    title: "Review Submissions",
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
  SUPERADMIN: SuperAdminSideBarData,
  ADMIN: AdminSideBarData,
  DOCTOR: DoctorSideBarData,
  PATIENT: PatientSideBarData,
};
