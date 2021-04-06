import { React } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import ViewFeedbackPage from "../pages/My/ViewFeedbackPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

import mocks from "./mocks/viewFeedbackPageMocks";

//Render component
const setup = () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/feedback/show/1"]}>
          <Route path="/my/feedback/show/:feedback_id">
            <ViewFeedbackPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("Specific feedback page", () => {
  it("renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });

  it("loads spinner when opening a new page", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  it("has correct header", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText(/View Feedback/i)).toBeInTheDocument();
    });
  });

  it("renders details component", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("feedbackDetailContainer")).toBeInTheDocument();
    });
  });

  it("has information holders for feedback's details", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("feedbackIdHolder")).toBeInTheDocument();
      expect(screen.getByTestId("feedbackStarsHolder")).toBeInTheDocument();
      expect(screen.getByTestId("feedbackExtraHolder")).toBeInTheDocument();
    });
  });

  it("shows error message for invalid feedback", () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/feedback/show/2"]}>
            <Route path="/my/feedback/show/:feedback_id">
              <ViewFeedbackPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  });

  it("has correct details displayed in information holders", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("feedbackIdHolder")).toBeInTheDocument();
      expect(screen.getByTestId("feedbackStarsHolder")).toBeInTheDocument();
      expect(screen.getByTestId("feedbackExtraHolder")).toBeInTheDocument();

      expect(screen.getByDisplayValue("1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("⭐⭐⭐⭐⭐")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Great website!")).toBeInTheDocument();
    });
  });
});