import MyHomePage from "../pages/My/MyHomePage";
import { MockedProvider } from "@apollo/client/testing";

import {
  fireEvent,
  waitFor,
  within,
  render,
  cleanup,
  screen,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Route, MemoryRouter } from "react-router";

import doctorMocks from "./mocks/homePageDoctorMocks";
import patientMocks from "./mocks/homePagePatientMocks";
import DoctorHomePanel from "../components/HomePage/DoctorHomePanel";
import PatientHomePanel from "../components/HomePage/PatientHomePanel";

afterEach(cleanup);

const doctorSetup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={doctorMocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my"]}>
          <Route path="/my">
            <DoctorHomePanel />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

const patientSetup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={patientMocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my"]}>
          <Route path="/my">
            <PatientHomePanel />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

// doctor panel tests
describe("Doctor panel", () => {
  it("should render without crashing for doctor", () => {
    expect(doctorSetup).toBeTruthy();
  });

  it("spinner shows on page load", () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should have requests to review number and submissions to review number", async () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const container = screen.getByTestId("doctorHomeContainer");
      const submissionReview = screen.getByTestId("doctorHomeTextOne");
      const requestReview = screen.getByTestId("doctorHomeTextTwo");
      expect(screen.getByTestId("doctorHomeContainer")).toBeInTheDocument();
      expect(submissionReview).toBeInTheDocument();
      expect(requestReview).toBeInTheDocument();
      within(submissionReview).getByText(/You have 7 submissions to review./i);
      within(requestReview).getByText(/You have 1 requests to review./i);
    });
  });

  it("should have review patients button", async () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("reviewPatientsButton")).toBeInTheDocument();
    });
  });

  it("gives correct page url on click", async () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const reviewLink = screen.getByTestId("reviewPatientLink");
      expect(reviewLink).toBeInTheDocument();
      expect(reviewLink).toHaveAttribute("href", "/my/submissions/review");
    });
  });
});

//patient panel tests
describe("Patient panel", () => {
  it("should render without crashing for patient", async () => {
    expect(patientSetup).toBeTruthy();
  });

  it("spinner shows on page load", async () => {
    patientSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should have requests to fulfill number", async () => {
    patientSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const submissionReview = screen.getByTestId("patientHomeText");
      expect(screen.getByTestId("patientHomeContainer")).toBeInTheDocument();
      expect(submissionReview).toBeInTheDocument();
      within(submissionReview).getByText(/You have 2 request/i);
    });
  });

  it("should have review requests button", async () => {
    patientSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("reviewRequestsButton")).toBeInTheDocument();
    });
  });

  it("should have create new submission button", async () => {
    patientSetup();
    await waitFor(() => {
      expect(screen.getByTestId("newSubmissionButton")).toBeInTheDocument();
    });
  });

  it("gives correct new page url on clicking submissions button", async () => {
    patientSetup();
    await waitFor(() => {
      const newSubLink = screen.getByTestId("newSubmissionLink");
      expect(newSubLink).toBeInTheDocument();
      expect(newSubLink).toHaveAttribute("href", "/my/submissions/new");
    });
  });

  it("leads to correct new page url on clicking review requests button", async () => {
    patientSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const reviewLink = screen.getByTestId("reviewLink");
      expect(reviewLink).toBeInTheDocument();
      expect(reviewLink).toHaveAttribute("href", "/my/requests");
    });
  });
});
