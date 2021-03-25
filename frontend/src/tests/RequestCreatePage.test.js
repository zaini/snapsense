import { React } from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import {
  GET_PATIENT_AS_DOCTOR,
  NewRequestPage,
} from "../pages/My/NewRequestPage";
import { MemoryRouter } from "react-router";

const mocks = [
  {
    request: {
      query: GET_PATIENT_AS_DOCTOR,
      variables: {
        patient_id: 1,
      },
    },
    result: {
      data: {
        getPatientAsDoctor: { id: 1, fname: "Ayan", lname: "Ahmad" },
      },
    },
  },
];

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
  const errorMocks = [
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
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/1/requests/new"]}>
          <NewRequestPage />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(screen.getByText(/Invalid Patient!/i)).toBeInTheDocument();
});

test("new request page loads new request form on gql query success", async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/1/requests/new"]}>
          <NewRequestPage />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  await new Promise((resolve) => setTimeout(resolve, 0));
  screen.debug();
  expect(screen.getByText(/Submission Request/i)).toBeInTheDocument();
});
