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

import PatientsPage from "../pages/My/PatientsPage";

afterEach(cleanup);

//TODO test to check that buttons render in row, test that buttons lead to correct URL

const {
  GET_PATIENTS_AS_DOCTOR,
  } = require("../pages/My/PatientsPage");

  const mocks = [
    {
      request: {
        query: GET_PATIENTS_AS_DOCTOR,
        variables: {},
      },
      result: {
        data: {
          getPatientsAsDoctor: [
            {
              id: "1",
              flag: "1",
              fname: "Patient",
              lname: "One",
              email: "PatientOne@email.com"
            },
            {
              id: "2",
              flag: "2",
              fname: "Patient",
              lname: "One",
              email: "PatientOne@email.com"
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
          <MemoryRouter initialEntries={["/my/patients"]}>
            <Route path="/my/patients">
              <HospitalsPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  };
