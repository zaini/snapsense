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
    path: "/dashboard",
    icon: <StarIcon />,
  },
  {
    title: "View Doctors",
    path: "/dashboard/doctors",
    icon: <CloseIcon />,
  },
];

const DoctorSideBarData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <StarIcon />,
  },
  {
    title: "View Submissions",
    path: "/dashboard/submissions",
    icon: <DownloadIcon />,
  },
  {
    title: "View Patients",
    path: "/dashboard/patients",
    icon: <CloseIcon />,
  },
  {
    title: "Request Patient Submission",
    path: "/dashboard/request",
    icon: <CalendarIcon />,
  },
];

const PatientSideBarData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <StarIcon />,
  },
  {
    title: "View Requests",
    path: "/dashboard/submissions",
    icon: <CalendarIcon />,
  },
  {
    title: "Submissions",
    path: "/dashboard/submissions",
    icon: <CloseIcon />,
  },
  {
    title: "Submit",
    path: "/dashboard/submit",
    icon: <DownloadIcon />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <CloseIcon />,
  },
];

export const SidebarData = {
  ADMIN: AdminSideBarData,
  DOCTOR: DoctorSideBarData,
  PATIENT: PatientSideBarData,
};
