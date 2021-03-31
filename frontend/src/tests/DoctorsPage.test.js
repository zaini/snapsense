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

const { GET_DOCTORS_AS_PATIENT } = require("../pages/My/DoctorsPage");

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
            email: "doctorOne@gmail.com",
          },
          {
            id: "2",
            fname: "Doctor",
            lname: "Two",
            email: "doctorTwo@gmail.com",
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

describe("The table component renders correctly with data", () => {
  test("if it displays correct number of rows and columns", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.data.length).toEqual(2);
    expect(data.cols.length).toEqual(4);
  });

  test("if it displays correct column headers", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.cols.length).toEqual(4);

    expect(data.cols[1].headerName).toEqual("First Name");
    expect(data.cols[2].headerName).toEqual("Last Name");
    expect(data.cols[3].headerName).toEqual("Email");
  });

  test("if it displays correct information rendered in row 1", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data[0].fname).toEqual("Doctor");
    expect(data.data[0].lname).toEqual("One");
    expect(data.data[0].email).toEqual("doctorOne@gmail.com");
  });
});
