import { GET_ADMINS } from "../../pages/My/AdminsPage";

const mocks = [
  {
    request: {
      query: GET_ADMINS,
      variables: {},
    },
    result: {
      data: {
        getAdmins: [
          {
            id: "1",
            fname: "Admin",
            lname: "One",
            email: "admin1@gmail.com",
            Hospital: {
              name: "Hospital One",
            },
          },
          {
            id: "3",
            fname: "Admin",
            lname: "Three",
            email: "admin3@gmail.com",
            Hospital: {
              name: "Hospital One",
            },
          },
        ],
      },
    },
  },
];

export default mocks;
