import {
  CalendarIcon,
  CloseIcon,
  DownloadIcon,
  StarIcon,
} from "@chakra-ui/icons";

// TODO add nicer icons

const AdminSideBarData = [
  {
    title: "Home",
    path: "/my",
    icon: <StarIcon />,
  },
  {
    title: "View Doctors",
    path: "/my/doctors",
    icon: <CloseIcon />,
  },
];

const DoctorSideBarData = [
  {
    title: "Home",
    path: "/my",
    icon: <StarIcon />,
  },
  {
    title: "View Submissions",
    path: "/my/submissions",
    icon: <DownloadIcon />,
  },
  {
    title: "View Patients",
    path: "/my/patients",
    icon: <CloseIcon />,
  },
  {
    title: "Request Patient Submission",
    path: "/my/request",
    icon: <CalendarIcon />,
  },
];

const PatientSideBarData = [
  {
    title: "Home",
    path: "/my",
    icon: <StarIcon />,
  },
  {
    title: "View Requests",
    path: "/my/requests",
    icon: <CalendarIcon />,
  },
  {
    title: "Submissions",
    path: "/my/submissions",
    icon: <CloseIcon />,
  },
  {
    title: "Submit",
    path: "/my/submissions/new",
    icon: <DownloadIcon />,
  },
  {
    title: "Profile",
    path: "/my/profile",
    icon: <CloseIcon />,
  },
];

export const SidebarData = {
  ADMIN: AdminSideBarData,
  DOCTOR: DoctorSideBarData,
  PATIENT: PatientSideBarData,
};
