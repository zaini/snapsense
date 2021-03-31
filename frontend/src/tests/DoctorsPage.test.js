import { React } from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { AuthContext } from "../context/auth";
import { act } from "react-dom/test-utils";

import { Route, MemoryRouter } from "react-router";

jest.mock("../components/utils/Table", () => (params) => {
  return <div data-testid="renderedTable">{JSON.stringify(params)}</div>;
});

import DoctorsPage from "../pages/My/DoctorsPage";

afterEach(cleanup);

//TODO test to check that buttons render in row, test that buttons lead to correct URL

const {
    GET_DOCTORS_AS_PATIENT,
  } = require("../pages/My/DoctorsPage");

  const mocks = [
    {
      request: {
        query: GET_DOCTORS_AS_PATIENT,
        variables: {},
      },
      result: {
        data: {
          getDoctorsAsPatient: [
            {
              id: "1",
              fname: "Doctor",
              lname: "One",
              email: "doctorOne@gmail.com"
            },
            {
              id: "2",
              fname: "Doctor",
              lname: "Two",
              email: "doctorTwo@gmail.com"
            },
          ],
        },
      },
    },
  ];

//Render component
const setup = () => {
    act(() => {
      render(
        <AuthContext.Provider
        value={{
          user: { accountType: "PATIENT" },
        }}
        >
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/doctors"]}>
            <Route path="/my/doctors">
              <DoctorsPage />
            </Route>
          </MemoryRouter>
          </MockedProvider>
          </AuthContext.Provider>
      );
    });
  };

  describe("The doctors page displaying renders correctly", () => {
    test("that the page renders", async () => {
      expect(setup).toBeTruthy();
    });
  
    test("if the loading spinner shows on page load", async () => {
      setup();
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  
    test("if the page has the correct title", async () => {
      setup();
      expect(screen.getByText(/My Doctors/i)).toBeInTheDocument();
    });
  
    test("if the table renders correctly", async () => {
      setup();
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
      });
    });
  });