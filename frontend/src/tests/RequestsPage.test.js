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

import { Route, MemoryRouter } from "react-router";

jest.mock("../components/utils/Table", () => (params) => {
  return <div data-testid="renderedTable">{JSON.stringify(params)}</div>;
});

import { AuthContext } from "../context/auth";
import RequestsPage from "../pages/My/RequestsPage";
import { mocksWithData } from "./mocks/requestsPage";

afterEach(cleanup);

const doctor = {
  id: 1,
  fname: "Doctor",
  lname: "One",
  email: "doctor1@nhs.net",
  hospital_id: 1,
  createdAt: "2021-03-25T17:42:58.000Z",
  updatedAt: "2021-03-25T17:42:58.000Z",
  accountType: "DOCTOR",
};

const patient = {
  id: 1,
  fname: "Patient",
  lname: "One",
  email: "patient1@gmail.com",
  flag: 2,
  createdAt: "2021-03-23T17:32:37.000Z",
  updatedAt: "2021-03-29T10:51:36.000Z",
  accountType: "PATIENT",
};

const setupDoctor = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: doctor }}>
        <MockedProvider mocks={mocksWithData}>
          <MemoryRouter initialEntries={["/my/requests"]}>
            <Route path="/my/requests">
              <RequestsPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

const setupPatient = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: patient }}>
        <MockedProvider mocks={mocksWithData}>
          <MemoryRouter initialEntries={["/my/requests"]}>
            <Route path="/my/requests">
              <RequestsPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

describe("viewing requests page as a patient", () => {
  test("if page renders without crashing", async () => {
    expect(setupPatient).toBeTruthy();
  });

  test("if spinner shows on page load", async () => {
    setupPatient();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if correct title is displayed", async () => {
    setupPatient();
    expect(screen.getByText(/My Requests/i)).toBeInTheDocument();
  });

  test("if table is rendered correctly", async () => {
    setupPatient();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });
  });

  test("if correct columns are displayed in the table", async () => {
    setupPatient();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.cols.length).toEqual(6);

    expect(data.cols[1].headerName).toEqual("Doctor");
    expect(data.cols[2].headerName).toEqual("Patient");
    expect(data.cols[3].headerName).toEqual("Deadline");
    expect(data.cols[4].headerName).toEqual("Requested Submission Type");
    expect(data.cols[5].headerName).toEqual("Submission");
  });

  test("if correct number of rows exist in the table", async () => {
    setupPatient();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data.length).toEqual(3);
  });

  test("if correct information is rendered in row 1", async () => {
    setupPatient();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data[0].id).toEqual("1");
    expect(data.data[0].type).toEqual(3);
    expect(data.data[0].deadline).toEqual("1609804800000");
    expect(data.data[0].Submission.id).toEqual("1");
    expect(data.data[0].Patient.email).toEqual("patient1@gmail.com");
    expect(data.data[0].Doctor.email).toEqual("doctor1@nhs.net");
  });

  test("if correct information is rendered in row 3", async () => {
    setupPatient();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data[2].id).toEqual("17");
    expect(data.data[2].type).toEqual(3);
    expect(data.data[2].deadline).toEqual("1616999214000");
    expect(data.data[2].Submission).toEqual(null);
    expect(data.data[2].Patient.email).toEqual("patient1@gmail.com");
    expect(data.data[2].Doctor.email).toEqual("doctor1@nhs.net");
  });
});

describe("viewing requests page as a doctor", () => {
  test("if page renders without crashing", async () => {
    expect(setupDoctor).toBeTruthy();
  });

  test("if spinner shows on page load", async () => {
    setupDoctor();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if correct title is displayed", async () => {
    setupDoctor();
    expect(screen.getByText(/My Requests/i)).toBeInTheDocument();
  });

  test("if correct number of rows and cols are loaded", async () => {
    setupDoctor();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.cols.length).toEqual(6);
    expect(data.data.length).toEqual(3);
  });
});
