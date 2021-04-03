//page doesnt crash
//elements render - heading for correct name/fname; ID hospital name email; create admin button,n delete button
//clicking buttons leadas to correct url / opens up correct modal
//elements display correct info
//invalid hospital gives error message

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
import HospitalPage from "../pages/My/HospitalPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

const { GET_HOSPITAL } = require("../pages/My/HospitalPage");

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
          id: "1",
          name: "Hospital One",
          contact_email: "hospital.one@hospitals.uk",
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
];

//Render component
const setup = () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/hospitals/show/1"]}>
            <Route path="//my/hospitals/show/:hospital_id">
              <NewHospitalPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  };

  describe("Specific hospital page", () => {
      it("renders without crashing", () => {

      });

      it("loads loading spinner when opening a new page", () => {

      })

      it("has text holders", () => {

      });

      it("has delete hospital button", () => {

      });

      it("has create admin for this hospital button", () => {

      });

      it("shows error message for invalid hospital", () => {

      });
  });

  describe("Text holders", () => {
      it("ID has correct info loaded into it", () => {

      });

      it("Name has correct info loaded into it", () => {

      });

      it("email has corect info loaded into it", () => {

      });
  });

  describe("Buttons", () => {
      it("create admin button leads to a correct url on click", () => {

      });

      it("delete hospital button opens a modal on click", () => {

      });
  });