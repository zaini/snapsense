import { React } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import gql from "graphql-tag";

import NewRequestPage from "../pages/My/NewRequestPage";
import { Route, MemoryRouter } from "react-router";


const GET_PATIENT_AS_DOCTOR = gql`
query getPatientAsDoctor($patient_id: ID!) {
  getPatientAsDoctor(patient_id: $patient_id) {
    id
    fname
    lname
  }
}
`;

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
        patient_id: 2,
      },
    },
    error: Error("This is an invalid patient"),
  },
];

test("new request page loads new request form on gql query success", async () => {
  act(() => {
    const { getByText, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/1/requests/new"]}>
          <Route path="/my/patients/:patient_id/requests/new">
            <NewRequestPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {expect(screen.getByText(/Submission Request for /i)).toBeInTheDocument()});
  
});

test("loading spinner shows when opening new requests page", async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/1/requests/new"]}>
          <NewRequestPage />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("new request page shows warning text if patient doesnt exist", async () => {
  const noPatientMocks = [
    {
      request: {
        query: GET_PATIENT_AS_DOCTOR,
        variables: {
          patient_id: 2,
        },
      },
      result: {
        data: {
          getPatientAsDoctor: { id: 2, fname: "Ayan", lname: "Ahmad" },
        },
      },
    },
  ];

  act(() => {
    render(
      <MockedProvider mocks={noPatientMocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/1/requests/new"]}>
          <NewRequestPage />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {expect(screen.getByText(/Invalid Patient!/i)).toBeInTheDocument()});
});
