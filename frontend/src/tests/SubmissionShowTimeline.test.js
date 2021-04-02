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

import { AuthContext } from "../context/auth";
import SubmissionsPage from "../pages/My/SubmissionsPage";
import { mocksWithData } from "./mocks/timelineMocks";

afterEach(cleanup);

const patient = {
  id: 1,
  fname: "Patient",
  lname: "One",
  email: "patient1@gmail.com",
  accountType: "DOCTOR",
};

const setup = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: patient }}>
        <MockedProvider mocks={mocksWithData}>
          <MemoryRouter initialEntries={["/my/submissions"]}>
            <Route path="/my/submissions">
              <SubmissionsPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

describe("show submission component setup", () => {
  test("if page renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });
  test("if correct heading is displayed before page is loaded", async () => {
    setup();
    expect(screen.getByText(/Submissions/i)).toBeInTheDocument();
  });
  test("if spinner shows up when page is loading data", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe("timeline view on submissions page", () => {
  test("if toggle button correctly loads timeline view", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("timelineToggle")).toBeInTheDocument();
    });
    const toggle = screen.getByTestId("timelineToggle");
    act(() => {
      fireEvent.click(toggle);
    });
    expect(screen.getByTestId("timelineContainer")).toBeInTheDocument();
  });

  test("if correct number of cards are displayed in the right order", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("timelineToggle")).toBeInTheDocument();
    });
    const toggle = screen.getByTestId("timelineToggle");
    act(() => {
      fireEvent.click(toggle);
    });
    for (let i = 0; i < 10; i++) {
      expect(screen.getByTestId(`tCard${i}`)).toBeInTheDocument();
    }
  });

  test("if correct date is dispayed on the timeline for all cards", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("timelineToggle")).toBeInTheDocument();
    });
    const toggle = screen.getByTestId("timelineToggle");
    act(() => {
      fireEvent.click(toggle);
    });
    for (let i = 0; i < 10; i++) {
      expect(screen.getByTestId(`tCard${i}`)).toBeInTheDocument();
      const container = screen.getByTestId(`tCard${i}`);
      within(container).getByTestId(`tTypo${i}`);
    }
  });
});

// Individual cards have already been tested in ReviewSubmissionPage.test.js and SubmissionShow.test.js
