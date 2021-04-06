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
import ShowSubmissionPage from "../pages/My/ShowSubmissionPage";
import { mocksWithData } from "./mocks/submissionShow";

afterEach(cleanup);

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

const setup = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: doctor }}>
        <MockedProvider mocks={mocksWithData}>
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

describe("show submission component setup", () => {
  test("if page renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });

  test("if correct heading is displayed when page is loaded", async () => {
    setup();
    expect(screen.getByText(/View Submission/i)).toBeInTheDocument();
  });
});

describe("view submission content", () => {
  test("if spinner shows up when tab is loaded", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if both images and answers are displayed on the screen", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("submissionCardContainer")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("submissionCardContainer");
    within(requestCard).getByTestId("QuestionAnswer");
    within(requestCard).getByTestId("ImageSlideshow");
  });

  test("if correct images are displayed by clicking respective buttons", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("submissionCardContainer")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("submissionCardContainer");
    const prevBtn = within(requestCard).getByTestId("imagePrevBtn");
    const nextBtn = within(requestCard).getByTestId("imageNextBtn");
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    expect(prevBtn.disabled).toBeTruthy();
    expect(!nextBtn.disabled).toBeTruthy();

    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(!prevBtn.disabled).toBeTruthy();
    expect(!nextBtn.disabled).toBeTruthy();

    act(() => {
      fireEvent.click(nextBtn);
    });

    expect(!prevBtn.disabled).toBeTruthy();
    expect(nextBtn.disabled).toBeTruthy();
  });

  test("if correct responses are displayed by clicking respective buttons", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("submissionCardContainer")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("submissionCardContainer");
    const prevBtn = within(requestCard).getByTestId("answerPrevBtn");
    const nextBtn = within(requestCard).getByTestId("answerNextBtn");
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    expect(prevBtn.disabled).toBeTruthy();
    expect(!nextBtn.disabled).toBeTruthy();

    for (let i = 1; i < 7; i++) {
      act(() => {
        fireEvent.click(nextBtn);
      });
    }

    expect(!prevBtn.disabled).toBeTruthy();
    expect(!nextBtn.disabled).toBeTruthy();

    act(() => {
      fireEvent.click(nextBtn);
    });

    expect(!prevBtn.disabled).toBeTruthy();
    expect(nextBtn.disabled).toBeTruthy();
  });

  test("if correct information is rendered in the details section", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("submissionCardContainer")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("submissionCardContainer");
    within(requestCard).getByDisplayValue(/Patient One/i);
    within(requestCard).getByDisplayValue(/High Risk/i);
    within(requestCard).getByText(/SnapSense AI Rating/i);

    const submitBtn = within(requestCard).getByTestId("submitBtnForm");
    const viewSubmissionBtn = within(requestCard).getByTestId("viewSubBtnForm");
    const requestSubmissionBtn = within(requestCard).getByTestId(
      "requestSubBtnForm"
    );

    expect(submitBtn).toBeInTheDocument();
    expect(viewSubmissionBtn).toBeInTheDocument();
    expect(requestSubmissionBtn).toBeInTheDocument();

    expect(!submitBtn.disabled).toBeTruthy();
    expect(!viewSubmissionBtn.disabled).toBeTruthy();
    expect(!requestSubmissionBtn.disabled).toBeTruthy();
  });

  test("if make a new request button redirects properly", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("submissionCardContainer")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("submissionCardContainer");

    const requestBtn = within(requestCard).getByTestId("requestSubBtnForm");
    expect(!requestBtn.disabled).toBeTruthy();

    const newRequestLink = within(requestCard).getByTestId("newRequestLink");
    expect(newRequestLink).toBeInTheDocument();

    expect(newRequestLink).toHaveAttribute(
      "href",
      "/my/patients/1/requests/new"
    );
  });

  test("if submit button correctly submits form in card three", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("submissionCardContainer")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("submissionCardContainer");
    const riskSelect = within(requestCard).getByTestId("requestRiskSelect");

    expect(riskSelect).toBeInTheDocument();

    act(() => {
      //The value should be the key of the option
      fireEvent.change(riskSelect, { target: { value: 3 } });
    });

    const options = within(riskSelect).getAllByTestId("selectOption");
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeTruthy();

    const submitBtn = within(requestCard).getByTestId("submitBtnForm");
    expect(!submitBtn.disabled).toBeTruthy();

    jest.spyOn(window, "alert").mockImplementation(() => {});
    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(window.alert).toBeCalledWith(
      "This submission has now been reviewed."
    );
  });
});
