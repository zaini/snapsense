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
  GET_DOCTORS_AS_ADMIN,
} = require("../pages/My/DoctorsPage");

const mocks = [
  [
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
  ],
  [
    {
      request: {
        query: GET_DOCTORS_AS_ADMIN,
        variables: {},
      },
      result: {
        data: {
          getDoctorsAsAdmin: [
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
  ],
];

//Render component
const setup = (userType, mockNum) => {
  act(() => {
    render(
      <AuthContext.Provider
        value={{
          user: { accountType: userType },
        }}
      >
        <MockedProvider mocks={mocks[mockNum]} addTypename={false}>
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

describe("The doctors page for patient", () => {
  test("that the page renders", async () => {
    expect(setup).toBeTruthy();
  });

  test("if the loading spinner shows on page load", async () => {
    setup("PATIENT", 0);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if the page has the correct title", async () => {
    setup("PATIENT", 0);
    expect(screen.getByText(/My Doctors/i)).toBeInTheDocument();
  });

  test("if the table renders correctly", async () => {
    setup("PATIENT", 0);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });
  });
});

describe("The doctors page for Admin", () => {
  test("that the page renders", async () => {
    expect(setup).toBeTruthy();
  });

  test("if the loading spinner shows on page load", async () => {
    setup("ADMIN", 1);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if the page has the correct title", async () => {
    setup("ADMIN", 1);
    expect(screen.getByText(/My Doctors/i)).toBeInTheDocument();
  });

  test("if the table renders correctly", async () => {
    setup("ADMIN", 1);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });
  });
});

describe("The table component in the page for patient", () => {
  test("if it displays correct number of rows and columns", async () => {
    setup("PATIENT", 0);
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
    setup("PATIENT", 0);
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
    setup("PATIENT", 0);
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

describe("The table component in the page for Admin", () => {
  test("if it displays correct number of rows and columns", async () => {
    setup("ADMIN", 1);
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
    setup("ADMIN", 1);
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
    setup("ADMIN", 1);
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
