import { React } from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
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
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/hospitals"]}>
            <Route path="/my/hospitals">
              <HospitalsPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  };
