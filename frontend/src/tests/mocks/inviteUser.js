import { INVITE_USER } from "../../components/InviteForm/CreateInviteForm";

export const mocksWithData = [
  {
    request: {
      query: INVITE_USER,
      variables: { email: "inviteuser@gmail.com" },
    },
    result: {
      data: {
        inviteUser:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGVyRW1haWwiOiJkb2N0b3IxQG5ocy5uZXQiLCJuZXdBY2NvdW50RW1haWwiOiJpbnZpdGV1c2VyQGdtYWlsLmNvbSIsImFjY291bnRUeXBlIjoiUEFUSUVOVCIsImFjY291bnRFeGlzdHMiOmZhbHNlLCJpYXQiOjE2MTcxNDA2MDYsImV4cCI6MTYxNzc0NTQwNn0.CZRt9b3CObenP0vEDssYJox1aGQkaemEeu7IHL-jK-M",
      },
    },
  },
  {
    request: {
      query: INVITE_USER,
      variables: { email: "doctor@gmail.com" },
    },
    error: {
      message: "Only NHS Emails Allowed",
    },
  },
];
