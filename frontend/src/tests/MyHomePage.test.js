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
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { Route, MemoryRouter } from "react-router";
import { Router } from "react-router-dom";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

//add testing for loading state and error states, fix auth for doctor vs patient

const GET_SUBMISSIONS = gql`
  query getSubmissions {
    getSubmissionsForReview {
      id
    }
  }
`;

const GET_REQUESTS = gql`
  query getRequests {
    getRequestsForReview {
      id
    }
    getRequestsAsPatient {
      id
      fulfilled
    }
  }
`;

const patient_mocks = [
  {
    request: {
      query: GET_REQUESTS,
    },
    results: {
      data: {
        getRequestsAsPatient: {
          id: 1,
          fulfilled: new Date(new Date().getFullYear(), 0, 8),
        },
      },
    },
  },
];

const doctor_mocks = [
  {
    request: {
      query: GET_REQUESTS,
    },
    results: {
      data: {
        getRequestsForReview: {
          id: 2,
        },
      },
    },
  },

  {
    request: {
      query: GET_SUBMISSIONS,
    },
    results: {
      data: {
        getSubmissionsForReview: {
          id: 1,
        },
      },
    },
  },
];

afterEach(cleanup);

const doctor_component = async () => {
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
    user: doc
  }
  act(() => {
    render(
      <AuthContext.Provider value={toRet}>
        <MockedProvider mocks={doctor_mocks} addTypename={false}>
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

const patient_component = async () => {
  const patient = {
    id: 2,
    fname: "Patient",
    lname: "One",
    email: "patient1@gmail.com",
    flag: 1,
    createdAt: "2021-03-25T17:42:58.000Z",
    updatedAt: "2021-03-25T17:42:58.000Z",
    accountType: "PATIENT",
  };
  act(() => {
    render(
      <AuthContext.Provider value={patient}>
        <MockedProvider mocks={patient_mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/"]}>
            <Route path="/my/">
              <MyHomePage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

it("should render without crashing for doctor", () => {
  doctor_component();
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  screen.debug();
});

describe("My Home Page", () => {
  // it("should render without crashing for patient", () => {
  //   expect(patient_component).toBeTruthy();
  // });
  // it("should render without crashing for doctor", async () => {
  //   expect(doctor_component).toBeTruthy;
  //   await waitFor(() => {
  //     expect(screen.getByText(/My Home/i));
  //   });
  // });
  //     it('should have header', () => {
  //         expect(screen.getByText("My Home")).toBeInTheDocument();
  //         screen.debug();
  //     })
});

// describe('Loading spinner', () => {
//  it("shows for doctor", async () => {
//     doctor_component();
//     expect(screen.getByText(/Loading/i)).toBeInTheDocument();
// });

// it("shows for patients", async () => {
//     patient_component();
//     expect(screen.getByText(/Loading/i)).toBeInTheDocument();
// });
//});

// describe('Doctor Panel', () => {
//     it('should have submission to review', () => {
//         //including gql
//     });

//     it('should have requests to review', () => {
//         //including gql
//     });

//     it('should have button to review patients', () => {
//         //fire event
//     });

// });

// describe('Patient Panel', () => {
//     it('should have requests to fulfill', () => {
//         //including gql
//     });

//     it('should have button to view requests', () => {
//         //fire event
//     });

//     it('should have button to create new submission', () => {
//         //fire event
//     });
// });
