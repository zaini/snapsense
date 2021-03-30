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

//TODO fix patient's render of elements, test button correct link for patient

afterEach(cleanup);

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
            id: "1",
          },
          {
            id: "2",
          },
        ],
      },
    },
  },
];

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

const doctorSetup = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: doctor }}>
        <MockedProvider mocks={doctorMock}>
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

const patient = {
  id: 1,
  fname: "Patient",
  lname: "One",
  email: "patient1@gmail.com",
  hospital_id: 1,
  createdAt: "2021-03-25T17:43:00.000Z",
  updatedAt: "2021-03-25T17:43:00.000Z",
  accountType: "PATIENT",
};

const patientSetup = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: patient }}>
        <MockedProvider mocks={patientMock}>
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
  it("should render without crashing for doctor", async () => {
    doctorSetup();
    expect(doctorSetup()).toBeTruthy();
  });

  it("spinner shows on page load", async () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should have correct heading", async () => {
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

  it("should have review patients button", async () => {
    doctorSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("reviewPatientsButton")).toBeInTheDocument();
    });
  });
});

test("clicking review patients button gives correct new page url", async () => {
  doctorSetup();
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    const reviewLink = screen.getByTestId("reviewPatientLink");
    expect(reviewLink).toBeInTheDocument();
    expect(reviewLink).toHaveAttribute("href", "/my/submissions/review");
  });
});

//patient panel tests
describe("Patient panel", () => {
  it("should render without crashing for doctor", async () => {
    patientSetup();
    expect(patientSetup()).toBeTruthy();
  });

  it("spinner shows on page load", async () => {
    patientSetup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should have correct heading", async () => {
    patientSetup();
    expect(screen.getByText(/My Home/i)).toBeInTheDocument();
  });

  // it("should have requests to fulfill number", async () => {
  //   patientSetup();
  //   expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  //   await waitFor(() => {
  //     const submissionReview = screen.getByTestId("patientHomeText");
  //     expect(screen.getByTestId("patientHomeContainer")).toBeInTheDocument();
  //     expect(submissionReview).toBeInTheDocument();
  //     within(submissionReview).getByText(/You have 2 requests to fulfil./i);
  //   });
  // });

  // it("should have review requests button", async () => {
  //   patientSetup();
  //   expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  //   await waitFor(() => {
  //     expect(screen.getByTestId("reviewRequestsButton")).toBeInTheDocument();
  //   });
  // });

  it("should have create new submission button", async () => {
    patientSetup();
    expect(screen.getByTestId("newSubmissionButton")).toBeInTheDocument();
  });
});

test("clicking create new submission button gives correct new page url", async () => {
  patientSetup();
  const newSubLink = screen.getByTestId("newSubmissionLink");
  expect(newSubLink).toBeInTheDocument();
  expect(newSubLink).toHaveAttribute("href", "/my/submissions/new");
});

// test("clicking review requests button leads to correct new page url", () => {
//   patientSetup();
//   expect(screen.getByText(/Loading/i)).toBeInTheDocument();
//   const reviewLink = screen.getByTestId("reviewLink");
//   expect(reviewLink).toBeInTheDocument();
//   expect(reviewLink).toHaveAttribute(
//     "href",
//     "/my/requests"
//   );
// });
