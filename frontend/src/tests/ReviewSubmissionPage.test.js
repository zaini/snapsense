import { React } from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

import NewRequestPage from "../pages/My/NewRequestPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

const { CREATE_REQUEST } = require("../components/Request/NewRequestForm");
const { GET_PATIENT_AS_DOCTOR } = require("../pages/My/NewRequestPage");

const initialDate = new Date();
const mocks = [
  {
    request: {
      query: GET_PATIENT_AS_DOCTOR,
      variables: {
        patient_id: "1",
      },
    },
    result: {
      data: {
        getPatientAsDoctor: {
          id: 1,
          fname: "Patient",
          lname: "One",
        },
      },
    },
  },
  {
    request: {
      query: GET_PATIENT_AS_DOCTOR,
      variables: {
        patient_id: "2",
      },
    },
    error: {
      graphQLErrors: [
        {
          message: "This is an invalid patient",
        },
      ],
    },
  },
  {
    request: {
      query: CREATE_REQUEST,
      variables: {
        patient_id: 1,
        request_type: 3,
        interval: 0,
        frequency: 0,
        deadline: initialDate.getTime().toString(),
      },
    },
    result: { data: { createRequest: true } },
  },
];

const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/1/requests/new"]}>
          <Route path="/my/patients/:patient_id/requests/new">
            <NewRequestPage dateIn={initialDate} />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};
