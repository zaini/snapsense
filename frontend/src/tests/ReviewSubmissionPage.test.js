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
import ReviewSubmissions from "../pages/My/ReviewSubmissions";
import {
  fulfilledRequestData,
  mocksWithData,
  mocksWithoutData,
} from "./mocks/reviewSubmissionPage";

afterEach(cleanup);

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

const setup = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={toRet}>
        <MockedProvider mocks={mocksWithData}>
          <MemoryRouter initialEntries={["/my/submissions/review"]}>
            <Route path="/my/submissions/review">
              <ReviewSubmissions />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

const setupWithoutData = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocksWithoutData}>
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
    expect(screen.getByText(/Review Patient Submissions/i)).toBeInTheDocument();
  });

  test("correct tabs are displayed when page is loaded", async () => {
    setup();
    expect(screen.getByTestId("tabFulfillOne")).toBeInTheDocument();
    expect(screen.getByTestId("tabFulfillTwo")).toBeInTheDocument();
    expect(
      screen.getByText(/Fulfilled & Unreviewed Requests/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Unreviewed Submissions/i)).toBeInTheDocument();
  });
});

describe("fulfilled and unreviewed tab", () => {
  test("spinner shows up when tab is loaded", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("correct message is displayed for no data", async () => {
    setupWithoutData();
    await waitFor(() => {
      expect(
        screen.getByText(/No fulfilled and unreviewed requests/i)
      ).toBeInTheDocument();
    });
  });

  test("correct number of cards are displayed ", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard1")).toBeInTheDocument();
      expect(screen.getByTestId("requestCard2")).toBeInTheDocument();
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
  });

  test("first card only shows images", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard1")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard1");
    within(requestCard).getByTestId("ImageSlideshow");
    within(requestCard).getByText(/No questionnaire/i);
  });

  test("second card only shows answers", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard2")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard2");
    within(requestCard).getByTestId("QuestionAnswer");
    within(requestCard).getByText(/No Images/i);
  });

  test("third card shows both images and answers", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");
    within(requestCard).getByTestId("QuestionAnswer");
    within(requestCard).getByTestId("ImageSlideshow");
  });

  //TODO: Check Image URLS
  test("images in slideshow and buttons are in the correct state in card three", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");
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

  test("number of answers and button are in the correct state in card three", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");
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

  test("correct questions and respective answers and notes are displayed in card three", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");
    const nextBtn = within(requestCard).getByTestId("answerNextBtn");

    for (let i = 0; i <= 7; i++) {
      const actualQuestion =
        fulfilledRequestData.data.getRequestsForReview[2].Submission.Answers[i]
          .Question.text;
      const actualAnswer =
        fulfilledRequestData.data.getRequestsForReview[2].Submission.Answers[i]
          .value === true
          ? "Yes"
          : "No";

      const inputQuestion = within(requestCard).getByTestId(
        `inputQuestion${i}`
      );
      const inputAnswer = within(requestCard).getByTestId(`inputAnswer${i}`);

      expect(inputQuestion.value === actualQuestion).toBeTruthy();
      expect(inputAnswer.value === actualAnswer).toBeTruthy();
      act(() => {
        fireEvent.click(nextBtn);
      });
    }
  });

  test("accurate patient and submission information is loaded in card three", async () => {
    // check button is disabled
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");
    within(requestCard).getByDisplayValue(/Patient One/i);
    within(requestCard).getByDisplayValue(/Review Submission/i);
    within(requestCard).getByText(/SnapSense AI Rating/i);

    const submitBtn = within(requestCard).getByTestId("submitBtnForm");
    const viewSubmissionBtn = within(requestCard).getByTestId("viewSubBtnForm");
    const requestSubmissionBtn = within(requestCard).getByTestId(
      "requestSubBtnForm"
    );

    expect(submitBtn).toBeInTheDocument();
    expect(viewSubmissionBtn).toBeInTheDocument();
    expect(requestSubmissionBtn).toBeInTheDocument();

    expect(submitBtn.disabled).toBeTruthy();
    expect(!viewSubmissionBtn.disabled).toBeTruthy();
    expect(!requestSubmissionBtn.disabled).toBeTruthy();
  });

  test("view submission redirect to correct page in card three", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");

    const viewBtn = within(requestCard).getByTestId("viewSubBtnForm");
    expect(!viewBtn.disabled).toBeTruthy();

    const viewLink = within(requestCard).getByTestId("viewLink");
    expect(viewLink).toBeInTheDocument();
    expect(viewLink).toHaveAttribute("href", "/my/submissions/show/11");
  });

  test("make a new request redirects to correct page in card three ", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");

    const requestBtn = within(requestCard).getByTestId("requestSubBtnForm");
    expect(!requestBtn.disabled).toBeTruthy();

    const newRequestLink = within(requestCard).getByTestId("newRequestLink");
    expect(newRequestLink).toBeInTheDocument();

    expect(newRequestLink).toHaveAttribute(
      "href",
      "/my/patients/1/requests/new"
    );
  });

  // TODO: Check if cache has been edited properly
  // TODO: Getting null error for request card called query
  test("submit button correctly submits form in card three", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("requestCard3")).toBeInTheDocument();
    });
    const requestCard = screen.getByTestId("requestCard3");
    const riskSelect = within(requestCard).getByTestId("requestRiskSelect");

    expect(riskSelect).toBeInTheDocument();

    act(() => {
      //The value should be the key of the option
      fireEvent.change(riskSelect, { target: { value: 2 } });
    });

    const options = within(riskSelect).getAllByTestId("selectOption");
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();

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

describe("unreviewed submissions tab", () => {
  test("spinner shows up when tab is loaded", async () => {
    setup();
    const tab = screen.getByTestId("tabFulfillTwo");
    act(() => {
      fireEvent.click(tab);
    });
    expect(screen.getByText(/Loading./i)).toBeInTheDocument();
  });

  test("correct number of cards are displayed in second tab ", async () => {
    setup();
    const tab = screen.getByTestId("tabFulfillTwo");
    act(() => {
      fireEvent.click(tab);
    });
    expect(screen.getByText(/Loading./i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("submissionCard1")).toBeInTheDocument();
      expect(screen.getByTestId("submissionCard2")).toBeInTheDocument();
      expect(screen.getByTestId("submissionCard3")).toBeInTheDocument();
    });
  });
});
