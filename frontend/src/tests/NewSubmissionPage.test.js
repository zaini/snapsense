import { MockedProvider } from "@apollo/client/testing";
import NewSubmissionPage, {
  UPLOAD_SUBMISSION,
} from "../pages/My/NewSubmissionPage";
import { GET_SUBMISSIONS } from "../components/SubmissionsView/SubmissionsComponent.js";
import { Route, MemoryRouter } from "react-router";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

/* Essential */
afterEach(cleanup);

//Creating mock data
const mockSuccess = [
  {
    request: {
      query: UPLOAD_SUBMISSION,
      variables: {
        images: [new Blob(["abc"], { type: "text/plain" })],
        answers: JSON.stringify([
          {
            id: "56",
            Question: {
              id: "8",
              text: "Please add any other notes for your clinician (optional):",
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
        ]),
      },
    },
    result: { data: { createSubmission: true } },
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: {
      data: {
        getSubmissions: {
          images: [new Blob(["abc"], { type: "text/plain" })],
          answers: JSON.stringify([
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
          ]),
        },
      },
    },
  },
];

// Render
const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mockSuccess}>
        <MemoryRouter initialEntries={["/my/submissions/new"]}>
          <Route path="/my/submissions/new">
            <NewSubmissionPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

/*------ Tests  -----*/

// New Submission page general tests
describe("New submission page", () => {
  it("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("has a imageUpload", async () => {
    setup();
    expect(screen.getByTestId("imageUpload")).toBeInTheDocument();
  });

  it("has questions to be answered", async () => {
    setup();
    await waitFor(() => {
      for (let i = 1; i < 9; i++) {
        expect(screen.getByTestId(`Questionnaire${i}`)).toBeInTheDocument();
      }
    });
  });

  it("has a submit button", async () => {
    setup();
    expect(screen.getByTestId("submitButton")).toBeInTheDocument();
  });

  it("has a back button", async () => {
    setup();
    expect(screen.getByTestId("backButton")).toBeInTheDocument();
  });

  it("has a next button", async () => {
    setup();
    expect(screen.getByTestId("nextButton")).toBeInTheDocument();
  });
});

//Image upload is an external component
describe("Image upload", () => {
  it("uploads an image", async () => {
    setup();

    const imageInput = screen.getByTestId("imageUpload");
    act(() => {
      fireEvent.change(imageInput, {
        target: { files: "chucknorris.png", length: 1 },
      });
    });
    expect(imageInput.files).toBe("chucknorris.png");
  });

  it("User can upload multiple images", async () => {
    setup();

    const imageInput = screen.getByTestId("imageUpload");

    act(() => {
      fireEvent.change(imageInput, {
        target: { files: ["chucknorris.png", "mazzkcby.jpg"] },
      });
    });
    expect(imageInput.files).toStrictEqual(["chucknorris.png", "mazzkcby.jpg"]);
  });
});

//Questionnaire Page
describe("Questionnaire Form", () => {
  const actions = () => {
    setup();
    expect(screen.getByTestId("tabQuestion")).toBeInTheDocument();
    const tab = screen.getByTestId("tabQuestion");
    act(() => {
      fireEvent.click(tab);
    });
    const tabPanel = screen.getByTestId("tabPanel");
    expect(tabPanel).toBeInTheDocument();
    // screen.debug(tabPanel, 10000);
    return tabPanel;
  };

  it("has a correct heading", async () => {
    const tabPanel = actions();
    expect(within(tabPanel).getByTestId("questionHeading")).toBeInTheDocument();
  });

  it("has stepper component with correct data", async () => {
    const tabPanel = actions();
    const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Review"];

    expect(within(tabPanel).getByTestId("stepperHolder")).toBeInTheDocument();
    steps.map((label) => {
      expect(
        within(tabPanel).getByTestId(`stepperInnerHolder${label}`)
      ).toBeInTheDocument();

      expect(
        within(tabPanel).getByTestId(`stepperLabel${label}`)
      ).toBeInTheDocument();

      expect(
        within(screen.getByTestId(`stepperLabel${label}`)).getByText(label)
      ).toBeInTheDocument();
    });
  });

  
});
