import { React } from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import AdminPage from "../pages/My/HospitalPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

const { GET_ADMIN } = require("../pages/My/AdminPage");

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
          getSpecificHospital: {
            id: "1",
            fname: "Admin",
            lname: "One",
            email: "admin.one@gmail.com",
            Hospital: {
                name: "Hospital"
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
  ];
  
  //Render component
  const setup = () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/admins/show/1"]}>
            <Route path="/my/admins/show/:admin_id">
              <AdminPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  };

