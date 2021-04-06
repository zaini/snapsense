import { LOGIN_USER } from "../../components/Login/LoginForm";

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: "patient@gmail.com",
        password: "ABCPassword123.",
        account_type: "PATIENT",
      },
    },
    error: {
      message: "Invalid Credentials",
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: "patient1@gmail.com",
        password: "ABCPassword123.",
        account_type: "PATIENT",
      },
    },
    response: {
      data: {
        login: {
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZm5hbWUiOiJQYXRpZW50IiwibG5hbWUiOiJPbmUiLCJlbWFpbCI6InBhdGllbnQxQGdtYWlsLmNvbSIsImZsYWciOjIsImNyZWF0ZWRBdCI6IjIwMjEtMDMtMjNUMTc6MzI6MzcuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDMtMjNUMTk6NDA6MDcuMDAwWiIsImFjY291bnRUeXBlIjoiUEFUSUVOVCIsImlhdCI6MTYxNjkyMTA5MywiZXhwIjoxNjE2OTI4MjkzfQ.LsXTQUJ7G80OtcyMRdt6F0dXIGq0H3lOvPf4oBzADdc",
        },
      },
    },
  },
];
export default mocks;
