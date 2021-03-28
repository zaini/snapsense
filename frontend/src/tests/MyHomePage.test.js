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
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

const {
  GET_REQUESTS,
  GET_SUBMISSIONS,
} = require("../components/HomePage/DoctorHomePanel");
//add testing for loading state and error states, fix auth for doctor vs patient

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

it("should render without crashing for doctor", () => {
  doctorSetup();
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

it("should load doctor home page without crashing", async () => {
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
