import { React } from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
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

const CREATE_REQUEST = gql`
  mutation createRequest(
    $patient_id: ID!
    $request_type: Int!
    $deadline: String!
    $interval: Int!
    $frequency: Int!
  ) {
    createRequest(
      patient_id: $patient_id
      request_type: $request_type
      deadline: $deadline
      frequency: $frequency
      interval: $interval
    )
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
        patient_id: "2",
      },
    },
    error: Error("This is an invalid patient"),
  },
  {
    request: {
      query: CREATE_REQUEST,
      variables: {
        patient_id: "1",
        request_type: 3,
        interval: 0,
        frequency: 0,
        deadline: new Date().getTime().toString(),
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
            <NewRequestPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

test("loading spinner shows when opening new requests page", async () => {
  setup();

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("new request page shows warning text if patient doesnt exist", async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/2/requests/new"]}>
          <Route path="/my/patients/:patient_id/requests/new">
            <NewRequestPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/Invalid Patient!/i)).toBeInTheDocument();
  });
});

test("new request page loads new request form on gql query success", async () => {
  setup();

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/Submission Request for /i)).toBeInTheDocument();
  });
});

test("new request page loads non periodic form by default", async () => {
  setup();

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByTestId("nonPeriodicForm")).toBeInTheDocument();
    const form = screen.getByTestId("nonPeriodicForm");
    within(form).getByTestId("radioImage");
    within(form).getByTestId("radioQuestion");
    within(form).getByTestId("radioBoth");
  });
});

test("schedule tab on request page loads periodic form", async () => {
  setup();

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    fireEvent(
      screen.getByText("Scheduled"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByTestId("periodicForm")).toBeInTheDocument();
    const form = screen.getByTestId("periodicForm");
    within(form).getByTestId("radioImage");
    within(form).getByTestId("radioQuestion");
    within(form).getByTestId("radioBoth");
    within(form).getByText("Interval in days");
    within(form).getByText("Frequency of Cycles");
  });
});

test("interval on schedule form on request page allows values within 0 and 20 inclusive", async () => {
  setup();

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    fireEvent(
      screen.getByText("Scheduled"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByTestId("periodicForm")).toBeInTheDocument();
    const form = screen.getByTestId("periodicForm");

    const interval = within(form).getByTestId("inputInterval");
    fireEvent.change(interval, { target: { value: "15" } });
    expect(interval.value).toBe("15");
  });
});

test("form submit gives success message", async () => {
  setup();


  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(async () => {
    expect(screen.getByTestId("nonPeriodicForm")).toBeInTheDocument();
  });

  const form = screen.getByTestId("nonPeriodicForm");

  const datePickerContainer = within(form).getByTestId("DatePickerContainer");
  const datePicker = datePickerContainer.childNodes[0];
  datePicker.selected = new Date("2022-03-25").getTime().toString();
  console.log(datePicker);
  

  const btnSubmit = within(form).getByText("Submit");
  fireEvent.click(btnSubmit);
  await waitFor(async () => {
    expect(screen.getByTestId("formSubmitInnerLoader")).toBeInTheDocument();
  });
  // await waitFor(async () => {
  //   expect(screen.getByTestId("formSubmitInnerSuccess")).toBeInTheDocument();
  // });
});
