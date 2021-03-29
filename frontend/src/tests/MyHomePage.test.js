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
import { AuthContext } from "../context/auth";

const {
  GET_REQUESTS,
  GET_SUBMISSIONS,
} = require("../components/HomePage/DoctorHomePanel");

//add testing for loading state and error states
//fix auth for doctor vs patient
//test correct route is used for buttons

const doctorMock = [
  {
    request: {
      query: GET_REQUESTS,
    },
    result: {
      data: {
        getRequestsForReview: [
          {
            id: "3",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_SUBMISSIONS,
    },
    result: {
      data: {
        getSubmissionsForReview: [
          {
            id: "5",
          },
          {
            id: "6",
          },
          {
            id: "7",
          },
          {
            id: "8",
          },
          {
            id: "9",
          },
          {
            id: "10",
          },
          {
            id: "11",
          },
        ],
      },
    },
  },
];

const patientMock = [
  {
    request: {
      query: GET_REQUESTS,
    },
    result: {
      data: {
        getRequestsAsPatient: [
          {
            id: "4",
          },
          {
            id: "5",
          },
        ],
      },
    },
  },
];

afterEach(cleanup);

const doctorSetup = async () => {
  const doc = {
    id: 1,
    fname: "Doctor",
    lname: "One",
    email: "doctor1@nhs.net",
    hospital_id: 1,
    createdAt: "2021-03-25T17:42:58.000Z",
    updatedAt: "2021-03-25T17:42:58.000Z",
    accountType: "DOCTOR",
  };

  const toRet = {
    user: doc,
  };

  act(() => {
    render(
      <AuthContext.Provider value={toRet}>
        <MockedProvider mocks={doctorMock} addTypename={false}>
          <MemoryRouter initialEntries={["/my"]}>
            <Route path="/my">
              <MyHomePage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

const patientSetup = async () => {
  const pat = {
    id: 1,
    fname: "Doctor",
    lname: "One",
    email: "patient1@nhs.net",
    hospital_id: 1,
    createdAt: "2021-03-25T17:42:58.000Z",
    updatedAt: "2021-03-25T17:42:58.000Z",
    accountType: "PATIENT",
  };

  const toRet = {
    user: pat,
  };

  act(() => {
    render(
      <AuthContext.Provider value={toRet}>
        <MockedProvider mocks={patientMock} addTypename={false}>
          <MemoryRouter initialEntries={["/my"]}>
            <Route path="/my">
              <MyHomePage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

//doctor panel tests
describe("Doctor panel", () => {
  it("should render without crashing for doctor", () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should have correct heading", () => {
    doctorSetup();
    expect(screen.getByText(/My Home/i)).toBeInTheDocument();
  });

  it("should have requests to review number and submissions to review number", async () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const submissionReview = screen.getByTestId("doctorHomeTextOne");
      const requestReview = screen.getByTestId("doctorHomeTextTwo");
      expect(screen.getByTestId("doctorHomeContainer")).toBeInTheDocument();
      expect(submissionReview).toBeInTheDocument();
      expect(requestReview).toBeInTheDocument();
      within(submissionReview).getByText(/You have 7 submissions to review./i);
      within(requestReview).getByText(/You have 1 requests to review./i);
    });
  });

  it("should have review patients button", () => {
    doctorSetup();
    expect(screen.getByTestId("reviewPatientsButton")).toBeInTheDocument();
    screen.debug();
  });
});

//patient panel tests
describe("Patient panel", () => {
  it("should render without crashing for patient", () => {
    patientSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should have correct heading", () => {
    patientSetup();
    expect(screen.getByText(/My Home/i)).toBeInTheDocument();
  });

  it("should have requests to fulfill number", async () => {
    patientSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const requestsToFulfill = screen.getByTestId("patientHomeText");
      expect(screen.getByTestId("patientHomeContainer")).toBeInTheDocument();
      expect(requestsToFulfill).toBeInTheDocument();
      within(requestsToFulfill).getByText(/You have 2 submissions to review./i);
    });
  });

  it("should have review requests button", () => {
    patientSetup();
    expect(screen.getByTestId("reviewRequestsButton")).toBeInTheDocument();
  });

  it("should have create new submission button", () => {
    patientSetup();
    expect(screen.getByTestId("newSubmissionButton")).toBeInTheDocument();
  });
});

// test("clicking review requests button leads to correct page", () => {

// });

// test("clicking new submission button leads to correct page", () => {

// });
