import { React } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import { Route, MemoryRouter } from "react-router";

import { AuthContext } from "../context/auth";
import ShowSubmissionPage from "../pages/My/ShowSubmissionPage";

afterEach(cleanup);

import mockData from "./mocks/showSubmissionPageMocks";

const patient = {
  id: 1,
  fname: "first",
  lname: "last",
  email: "patient1@gmail.com",
  flag: 1,
  createdAt: "2021-03-22T17:55:55.000Z",
  updatedAt: "2021-03-22T17:55:55.000Z",
  accountType: "PATIENT",
};

const setup = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: patient }}>
        <MockedProvider mocks={mockData}>
          <MemoryRouter initialEntries={["/my/submissions/show/11"]}>
            <Route path="/my/submissions/show/:submission_id">
              <ShowSubmissionPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

describe("page loading", () => {
  it("page renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });

  test("correct heading should be displayed when page is loaded", async () => {
    setup();
    expect(screen.getByText(/View Submission/i)).toBeInTheDocument();
  });
});

// Cards have been tested in ReviewSubmissionPage test
