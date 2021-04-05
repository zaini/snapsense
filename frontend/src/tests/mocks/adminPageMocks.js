const { GET_ADMIN } = require("../../pages/My/AdminPage");
const { DELETE_ADMIN } = require("../../components/Admin/DeleteAdminModal");

const mocks = [
    {
      request: {
        query: GET_ADMIN,
        variables: {
          admin_id: "1",
        },
      },
      result: {
        data: {
          getAdminById: {
            id: "1",
            fname: "Admin",
            lname: "One",
            email: "admin1@gmail.com",
            Hospital: {
              name: "Hospital",
            },
          },
        },
      },
    },
    {
      request: {
        query: GET_ADMIN,
        variables: {
          admin_id: "2",
        },
      },
      error: {
        graphQLErrors: [
          {
            message: "Admin does not exist",
          },
        ],
      },
    },
    {
      request: {
        query: DELETE_ADMIN,
        variables: { admin_id: "1" },
      },
      result: { data: { deleteAdmin: true } },
    },
  ];

  export default mocks;