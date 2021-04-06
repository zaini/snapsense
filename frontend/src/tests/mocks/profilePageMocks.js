import { GET_SUBMISSIONS } from "../../components/SubmissionsView/SubmissionsComponent";
import { CHANGE_PASSWORD } from "../../components/utils/ChangePasswordModal";
import { DELETE_ACCOUNT } from "../../components/utils/DeleteAccountModal";

const Mock = [
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {
        patient_id: "1",
      },
    },
    result: {
      data: {
        getSubmissions: [
          {
            id: "1",
            flag: "High Risk",
            createdAt: "1234567890",
            Patient: {
              id: "1",
              fname: "first",
              lname: "last",
              email: "patient1@gmail.com",
              password: "Password123",
              flag: "asdfghjk",
            },
            Images: {
              id: "1",
              url: "asdfghjk",
            },
            Answers: {
              id: "1",
              Question: {
                id: "1",
                text: "asdfghj",
              },
            },
            value: "1",
            extra: "sdfghj",
          },
        ],
      },
    },
  },
  {
    request: {
      query: CHANGE_PASSWORD,
      variables: {
        password: "asd",
        password_confirmation: "asd",
      },
    },
    error: { message: "Validation error: Invalid password" },
  },
  {
    request: {
      query: CHANGE_PASSWORD,
      variables: {
        password: "Password000",
        password_confirmation: "Password000",
      },
    },
    result: { data: { changePassword: true } },
  },
  {
    request: {
      query: DELETE_ACCOUNT,
      variables: {
        password: "WRONGPASSWORD",
        password_confirmation: "WRONGPASSWORD",
      },
    },
    error: { message: "Incorrect password!" },
  },
  {
    request: {
      query: DELETE_ACCOUNT,
      variables: {
        password: "Password123",
        password_confirmation: "Password123",
      },
    },
    response: { data: { deleteAccount: true } },
  },
];

export default Mock;
