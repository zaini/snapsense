import { React } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

import { Route, MemoryRouter } from "react-router";

jest.mock("../components/utils/Table", () => (params) => {
  return <div data-testid="renderedTable">{JSON.stringify(params)}</div>;
});

import FeedbackPage from "../pages/My/FeedbackPage";
import mocks from "./mocks/feedbackPageMocks";

afterEach(cleanup);

//Render component
const setup = () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/feedback"]}>
          <Route path="/my/feedback">
            <FeedbackPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("Feedback table page", () => {
  it("doesn't crash", async () => {
    expect(setup).toBeTruthy();
  });

  it("shows loading spinner on page load", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("has correct title", async () => {
    setup();
    expect(screen.getByText(/All Feedback/i)).toBeInTheDocument();
  });

  it("renders table correctly", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });
  });
});

describe("Table component", () => {
  it("displays correct number of rows and columns", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.data.length).toEqual(3);
    expect(data.cols.length).toEqual(4);
  });

  it("displays correct column headers", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);

    expect(data.cols[0].headerName).toEqual("ID");
    expect(data.cols[1].headerName).toEqual("Number of Stars");
    expect(data.cols[2].headerName).toEqual("Extra Information");
    expect(data.cols[3].headerName).toEqual("View");
  });

  it("displays correct information in row 1", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data[0].id).toEqual("1");
    expect(data.data[0].stars).toEqual(5);
    expect(data.data[0].extra).toEqual("Long live bluej blues");
  });

  it("displays correct information in row 3", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
    });

    const container = screen.getByTestId("renderedTable");
    const data = JSON.parse(container.innerHTML);
    expect(data.data[2].id).toEqual("3");
    expect(data.data[2].stars).toEqual(0);
    expect(data.data[2].extra).toEqual(null);
  });
});
