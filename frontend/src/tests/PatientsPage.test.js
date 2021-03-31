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

const { GET_PATIENTS_AS_DOCTOR } = require("../pages/My/PatientsPage");

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
            email: "PatientOne@email.com",
          },
          {
            id: "2",
            flag: "2",
            fname: "Patient",
            lname: "One",
            email: "PatientOne@email.com",
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
            <PatientsPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("The patients table page renders correctly", () => {
  test("that the page renders", async () => {
    expect(setup).toBeTruthy();
  });

  test("if the loading spinner shows on page load", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if the page has the correct title", async () => {
    setup();
    expect(screen.getByText(/My Patients/i)).toBeInTheDocument();
  });

  test("if the table renders correctly", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });
  });
});

describe("Table component", () => {
  test("if it displays correct number of rows and columns", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.data.length).toEqual(2);
    expect(data.cols.length).toEqual(5);
  });

  test("if it displays correct column headers", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.cols.length).toEqual(5);

    expect(data.cols[1].headerName).toEqual("Flag");
    expect(data.cols[2].headerName).toEqual("First Name");
    expect(data.cols[3].headerName).toEqual("Last Name");
    expect(data.cols[4].headerName).toEqual("Actions");
  });

  test("if it displays correct information rendered in row 1", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data[0].flag).toEqual("1");
    expect(data.data[0].fname).toEqual("Patient");
    expect(data.data[0].lname).toEqual("One");
  });
});
