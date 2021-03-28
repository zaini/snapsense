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
import ReviewSubmissions from "../pages/My/ReviewSubmissions";

afterEach(cleanup);

const {
  GET_REQUESTS,
} = require("../components/SubmissionsView/RequestCards/RequestCardsTable");
const {
  GET_SUBMISSIONS,
} = require("../components/SubmissionsView/SubmissionCards/SubmissionCardsTable");

const mocks = [
  {
    request: {
      query: GET_REQUESTS,
      variables: {},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: GET_REQUESTS,
      variables: {},
    },
    error: {
      graphQLErrors: [
        {
          message: "This is an invalid patient",
        },
      ],
    },
  },
];

const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/submissions/review"]}>
          <Route path="/my/submissions/review">
            <ReviewSubmissions />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("page loading", () => {
  test("page renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });

  test("correct heading is displayed when page is loaded", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("correct tabs are displayed when page is loaded", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });
});

describe("fulfilled and unreviewed tab", () => {
  test("spinner shows up when tab is loaded", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("number of cards displayed are correct", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("buttons are in the correct state", async () => {
    //disbled and enabled
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("correct number of images are displayed", async () => {
    // check button is disabled
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("correct number of answers and notes are displayed", async () => {
    // check button is disabled
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("accurate patient and submission information is loaded", async () => {
    // check button is disabled
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("submit button submits form", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("view submission redirect to correct page", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("make a new request redirects to correct page", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });
});

describe("fulfilled and unreviewed tab", () => {
  test("spinner shows up when tab is loaded", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  test("number of cards displayed are correct", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });
});
