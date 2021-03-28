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

const fulfilledRequestData = {
  data: {
    getRequestsForReview: [
      {
        id: "4",
        type: 1,
        deadline: "1617216160000",
        fulfilled: "1616528701000",
        Submission: {
          id: "12",
          Images: [
            {
              id: "6",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
              __typename: "Image",
            },
            {
              id: "7",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/3d3fe34d-83ba-4be8-aab2-e3c5201b34fc.jpg",
              __typename: "Image",
            },
            {
              id: "8",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/95e28fcf-9de3-4b3d-8aca-18b3aa3fcd11.jpg",
              __typename: "Image",
            },
          ],
          Answers: [],
          flag: null,
          createdAt: "1616528700000",
          __typename: "Submission",
        },
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Doctor: {
          id: "1",
          fname: "Doctor",
          lname: "One",
          email: "doctor1@nhs.net",
          __typename: "Doctor",
        },
        __typename: "Request",
      },
      {
        id: "5",
        type: 2,
        deadline: "1617216160000",
        fulfilled: "1616528701000",
        Submission: {
          id: "13",
          Images: [],
          Answers: [
            {
              id: "56",
              Question: {
                id: "8",
                text:
                  "Please add any other notes for your clinician (optional):",
                __typename: "Question",
              },
              value: true,
              extra: "fsdfsd",
              __typename: "Answer",
            },
            {
              id: "55",
              Question: {
                id: "7",
                text:
                  "In the past 7 days, have you noticed any unusual smells from the wound?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "54",
              Question: {
                id: "6",
                text:
                  "In the past 7 days, has one foot been hotter to touch than the other?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "53",
              Question: {
                id: "5",
                text:
                  "In the past 7 days, has your ulcer been hotter to touch than usual?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "52",
              Question: {
                id: "4",
                text:
                  "In the past 7 days, have you seen any puss around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: "fds",
              __typename: "Answer",
            },
            {
              id: "51",
              Question: {
                id: "3",
                text:
                  "In the past 7 days, have you seen redness around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "50",
              Question: {
                id: "2",
                text:
                  "In the past 7 days, have you had a fever (temperature higher than 36C)?",
                __typename: "Question",
              },
              value: false,
              extra: "dsfsdfds",
              __typename: "Answer",
            },
            {
              id: "49",
              Question: {
                id: "1",
                text: "In the past 7 days, have you felt unwell?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
          ],
          flag: null,
          createdAt: "1616528700000",
          __typename: "Submission",
        },
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Doctor: {
          id: "1",
          fname: "Doctor",
          lname: "One",
          email: "doctor1@nhs.net",
          __typename: "Doctor",
        },
        __typename: "Request",
      },
      {
        id: "3",
        type: 3,
        deadline: "1617216160000",
        fulfilled: "1616528701000",
        Submission: {
          id: "11",
          Images: [
            {
              id: "6",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
              __typename: "Image",
            },
            {
              id: "7",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/3d3fe34d-83ba-4be8-aab2-e3c5201b34fc.jpg",
              __typename: "Image",
            },
            {
              id: "8",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/95e28fcf-9de3-4b3d-8aca-18b3aa3fcd11.jpg",
              __typename: "Image",
            },
          ],
          Answers: [
            {
              id: "56",
              Question: {
                id: "8",
                text:
                  "Please add any other notes for your clinician (optional):",
                __typename: "Question",
              },
              value: true,
              extra: "fsdfsd",
              __typename: "Answer",
            },
            {
              id: "55",
              Question: {
                id: "7",
                text:
                  "In the past 7 days, have you noticed any unusual smells from the wound?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "54",
              Question: {
                id: "6",
                text:
                  "In the past 7 days, has one foot been hotter to touch than the other?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "53",
              Question: {
                id: "5",
                text:
                  "In the past 7 days, has your ulcer been hotter to touch than usual?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "52",
              Question: {
                id: "4",
                text:
                  "In the past 7 days, have you seen any puss around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: "fds",
              __typename: "Answer",
            },
            {
              id: "51",
              Question: {
                id: "3",
                text:
                  "In the past 7 days, have you seen redness around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "50",
              Question: {
                id: "2",
                text:
                  "In the past 7 days, have you had a fever (temperature higher than 36C)?",
                __typename: "Question",
              },
              value: false,
              extra: "dsfsdfds",
              __typename: "Answer",
            },
            {
              id: "49",
              Question: {
                id: "1",
                text: "In the past 7 days, have you felt unwell?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
          ],
          flag: null,
          createdAt: "1616528700000",
          __typename: "Submission",
        },
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Doctor: {
          id: "1",
          fname: "Doctor",
          lname: "One",
          email: "doctor1@nhs.net",
          __typename: "Doctor",
        },
        __typename: "Request",
      },
    ],
  },
  loading: false,
  networkStatus: 7,
  stale: false,
};

const submissionData = {
  data: {},
};

const mocksWithData = [
  {
    request: {
      query: GET_REQUESTS,
      variables: {},
    },
    result: fulfilledRequestData,
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: submissionData,
  },
];

const mocksWithoutData = [
  {
    request: {
      query: GET_REQUESTS,
      variables: {},
    },
    result: {
      data: {
        getRequestsForReview: [],
      },
    },
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: fulfilledRequestData,
  },
];

const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocksWithData}>
        <MemoryRouter initialEntries={["/my/submissions/review"]}>
          <Route path="/my/submissions/review">
            <ReviewSubmissions />
          </Route>
        </MemoryRouter>
      </MockedProvider>
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
    const requestSubmissionBtn =within(requestCard).getByTestId("requestSubBtnForm");
    
    expect(submitBtn).toBeInTheDocument();
    expect(viewSubmissionBtn).toBeInTheDocument();
    expect(requestSubmissionBtn).toBeInTheDocument();

    expect(submitBtn.disabled).toBeTruthy();
    expect(!viewSubmissionBtn.disabled).toBeTruthy();
    expect(!requestSubmissionBtn.disabled).toBeTruthy();

  });

  test("submit button correctly submits form in card three", async () => {
    setup();
    // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  });

  // test("view submission redirect to correct page in card three", async () => {
  //   setup();
  //   // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  // });

  // test("make a new request redirects to correct page in card three ", async () => {
  //   setup();
  //   // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  // });
  // });

  // describe("fulfilled and unreviewed tab", () => {
  //   test("spinner shows up when tab is loaded", async () => {
  //     setup();
  //     // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  //   });

  //   test("number of cards displayed are correct", async () => {
  //     setup();
  //     // expect(screen.getByText(/aaaaaaaaaaaaaaaaa/i)).toBeInTheDocument();
  //   });
});
