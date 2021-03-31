import { React } from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

import { Route, MemoryRouter } from "react-router";

jest.mock("../components/utils/Table", () => (params) => {
  return <div data-testid="renderedTable">{JSON.stringify(params)}</div>;
});

import AdminsPage from "../pages/My/AdminsPage";

afterEach(cleanup);

//TODO: add test for buttons and their links

const { GET_ADMINS } = require("../pages/My/AdminsPage");

const mocks = [
  {
    request: {
      query: GET_ADMINS,
      variables: {},
    },
    result: {
      data: {
        getAdmins: [
          {
            id: "1",
            fname: "Admin",
            lname: "One",
            email: "admin1@gmail.com",
            Hospital: {
              name: "Hospital One",
            },
          },
          {
            id: "3",
            fname: "Admin",
            lname: "Three",
            email: "admin3@gmail.com",
            Hospital: {
              name: "Hospital One",
            },
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
        <MemoryRouter initialEntries={["/my/admins"]}>
          <Route path="/my/admins">
            <AdminsPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("Admins table page", () => {
  it("doesn't crash", async () => {
    expect(setup).toBeTruthy();
  });

  it("shows loading spinner on page load", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("has correct title", async () => {
    setup();
    expect(screen.getByText(/Admins/i)).toBeInTheDocument();
  });

  it("renders table correctly", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });
  });
});

describe("Table component", () => {
  it("displays correct number of rows and columns", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.data.length).toEqual(2);
    expect(data.cols.length).toEqual(6);
  });

  it("displays correct column headers", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.cols[0].headerName).toEqual("ID");
    expect(data.cols[1].headerName).toEqual("First Name");
    expect(data.cols[2].headerName).toEqual("Last Name");
    expect(data.cols[3].headerName).toEqual("Email");
    expect(data.cols[4].headerName).toEqual("Hospital Name");
    expect(data.cols[5].headerName).toEqual("View Admin");
  });

  it("displays correct information rendered in row 1", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data[0].id).toEqual("1");
    expect(data.data[0].fname).toEqual("Admin");
    expect(data.data[0].lname).toEqual("One");
    expect(data.data[0].email).toEqual("admin1@gmail.com");
    expect(data.data[0].Hospital.name).toEqual("Hospital One");
  });
});
