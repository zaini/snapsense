import { CREATE_ADMIN, GET_ADMINS } from "../../components/Admin/NewAdminForm";
import { GET_HOSPITAL } from "../../pages/My/NewAdminPage";

const mocks = [
  {
    request: {
      query: GET_HOSPITAL,
      variables: {
        hospital_id: "1",
      },
    },
    result: {
      data: {
        getSpecificHospital: {
          id: 1,
          name: "Hospital",
          contact_email: "hospital@gmail.com",
        },
      },
    },
  },
  {
    request: {
      query: GET_HOSPITAL,
      variables: {
        hospital_id: "2",
      },
    },
    error: {
      graphQLErrors: [
        {
          message: "Hospital does not exist",
        },
      ],
    },
  },
  {
    request: {
      query: CREATE_ADMIN,
      variables: {
        fname: "Admin",
        lname: "One",
        email: "admin1@gmail.com",
        password: "Password123",
        hospital_id: 1,
      },
    },
    result: { data: { createAdmin: true } },
  },
  {
    request: {
      query: GET_ADMINS,
      variables: { id: "2" },
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
            id: "2",
            fname: "Admin",
            lname: "Two",
            email: "admin2@gmail.com",
            Hospital: {
              name: "Hospital Two",
            },
          },
          {
            id: "3",
            fname: "Admin ",
            lname: "Three",
            email: "admin.three@gmail.com",
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
