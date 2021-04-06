import { CHECK_INVITATION } from "../../pages/Home/ShowInvitePage";
import { REGISTER_USER } from "../../components/InviteForm/InviteNewUser";
import { ADD_PATIENT_TO_DOCTOR } from "../../components/InviteForm/InviteExistingUser";

export const tokenNew =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGVyRW1haWwiOiJkb2N0b3IxQG5ocy5uZXQiLCJuZXdBY2NvdW50RW1haWwiOiJhYmNAZ21haWwuY29tIiwiYWNjb3VudFR5cGUiOiJQQVRJRU5UIiwiYWNjb3VudEV4aXN0cyI6ZmFsc2UsImlhdCI6MTYxNzQ4MjM2NywiZXhwIjoxNjE4MDg3MTY3fQ.OTvFcx03q5fL6XNGt9MfjU26WKrYJ1s_ApAIEdW3NDg";

export const tokenExists =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGVyRW1haWwiOiJkb2N0b3IxQG5ocy5uZXQiLCJuZXdBY2NvdW50RW1haWwiOiJheWFuYWhtYWQuYWhheUBnbWFpbC5jb20iLCJhY2NvdW50VHlwZSI6IlBBVElFTlQiLCJhY2NvdW50RXhpc3RzIjp0cnVlLCJpYXQiOjE2MTc0ODI2NjUsImV4cCI6MTYxODA4NzQ2NX0.syQmSJA-wRJtX6Ib6NG7fFqG4ftIIRDVTLVO6VtVwkA";

export const mocksWithData = [
  {
    request: {
      query: CHECK_INVITATION,
      variables: {
        invitationToken: tokenNew,
      },
    },
    result: {
      data: {
        checkInvitation: tokenNew,
      },
    },
  },
  {
    request: {
      query: CHECK_INVITATION,
      variables: {
        invitationToken: tokenExists,
      },
    },
    result: {
      data: {
        checkInvitation: tokenExists,
      },
    },
  },
  {
    request: {
      query: REGISTER_USER,
      variables: {
        fname: "Fname",
        lname: "Lname",
        password: "AbCdEf123",
        passwordConfirmation: "AbCdEf123",
        invitationToken: tokenNew,
      },
    },
    result: {
      data: {
        register: true,
      },
    },
  },
  {
    request: {
      query: ADD_PATIENT_TO_DOCTOR,
      variables: {
        patient_email: "ayanahmad.ahay@gmail.com",
        doctor_email: "doctor1@nhs.net",
      },
    },
    result: {
      data: {
        addPatientToDoctor: true,
      },
    },
  },
];
