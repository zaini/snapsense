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
import PatientProfilePage from "../pages/My/PatientProfilePage";
import { mocksWithData } from "./mocks/doctorPatientsProfile";

afterEach(cleanup);

const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocksWithData}>
        <MemoryRouter initialEntries={["/my/patients/show/1"]}>
          <Route path="/my/patients/show/:patient_id">
            <PatientProfilePage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("patient profile", () => {
  test("if page renders without crashing", () => {
    expect(setup).toBeTruthy();
  });

  test("if profile container exists", async () => {
    setup();
    expect(screen.getByTestId("patientProfileContainer")).toBeInTheDocument();
  });

  test("if spinner is displayed on the screen", () => {
    setup();
    const container = screen.getByTestId("patientProfileContainer");
    within(container).getByText(/Loading./i);
  });

  test("if header displays correct name", async () => {
    setup();
    const container = screen.getByTestId("patientProfileContainer");
    within(container).getByText(/Loading./i);
    await waitFor(() => {
      expect(screen.getByText(/Patient's Profile/)).toBeInTheDocument();
    });
  });

  test("if correct patient details are displayed in the input boxes", async () => {
    setup();
    const container = screen.getByTestId("patientProfileContainer");
    within(container).getByText(/Loading./i);
    await waitFor(() => {
      expect(screen.getByText(/Patient's Profile/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/First name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();

    expect(screen.getByDisplayValue("Patient")).toBeInTheDocument();
    expect(screen.getByDisplayValue("One")).toBeInTheDocument();
    expect(screen.getByDisplayValue("patient1@gmail.com")).toBeInTheDocument();
  });
});

describe("patient submission", () => {
  test("if submission container exists", () => {
    setup();
    expect(
      screen.getByTestId("patientSubmissionContainer")
    ).toBeInTheDocument();
  });

  test("if spinner is displayed on the screen", () => {
    setup();
    const container = screen.getByTestId("patientSubmissionContainer");
    within(container).getByText(/Loading./i);
  });

  test("if correct submission details are displayed in the table", async () => {
    setup();
    const container = screen.getByTestId("patientSubmissionContainer");
    within(container).getByText(/Loading./i);
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const table = screen.getByTestId("renderedTable");
    const data = JSON.parse(table.innerHTML);

    expect(data.cols.length).toEqual(5);

    expect(data.cols[1].headerName).toEqual("Flag");
    expect(data.cols[2].headerName).toEqual("Date submitted");
    expect(data.cols[3].headerName).toEqual("Type");
    expect(data.cols[4].headerName).toEqual("Actions");
  });

  test("if correct number of rows exist in the table", async () => {
    setup();
    const container = screen.getByTestId("patientSubmissionContainer");
    within(container).getByText(/Loading./i);
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const table = screen.getByTestId("renderedTable");
    const data = JSON.parse(table.innerHTML);
    expect(data.data.length).toEqual(10);
  });

  test("if correct data is rendered in row 1 of the table", async () => {
    setup();
    const container = screen.getByTestId("patientSubmissionContainer");
    within(container).getByText(/Loading./i);
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const table = screen.getByTestId("renderedTable");
    const data = JSON.parse(table.innerHTML);
    expect(data.data[0].id).toEqual("11");
    expect(data.data[0].flag).toEqual(2);
    expect(data.data[0].createdAt).toEqual("1616528700000");
  });
});
