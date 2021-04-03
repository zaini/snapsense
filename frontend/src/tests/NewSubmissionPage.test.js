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
      <MockedProvider mocks={mockSuccess} addTypename={false}>
        <MemoryRouter initialEntries={["/my/newsubmission"]}>
          <Route path="/my/newsubmission">
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
  test("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  test("has a imageUpload", async () => {
    setup();
    expect(screen.getByTestId("imageUpload")).toBeInTheDocument();
  });

  test("has questions to be answered", async () => {
    setup();
    await waitFor(() => {
      for (let i = 1; i < 9; i++) {
        expect(screen.getByTestId(`Questionnaire${i}`)).toBeInTheDocument();
      }
    });
  });

  test("has a submit button", async () => {
    setup();
    expect(screen.getByTestId("submitButton")).toBeInTheDocument();
  });

  test("has a back button", async () => {
    setup();
    expect(screen.getByTestId("backButton")).toBeInTheDocument();
  });

  test("has a next button", async () => {
    setup();
    expect(screen.getByTestId("nextButton")).toBeInTheDocument();
  });
});

describe("Image upload", () => {
  it("uploads an image", async () => {
    setup();

    const imageInput = screen.getByTestId("imageUpload");
    act(() => {
      fireEvent.click(imageInput);
    });

    act(() => {
      fireEvent.change(imageInput, { target: { files: "chucknorris.png" } });
    });
    expect(imageInput.files).toBe("chucknorris.png");
  });
});

describe("Multiple Image Upload", () => {
  it("User can upload multiple images", async () => {
    setup();

    const imageInput = screen.getByTestId("imageUpload");
    act(() => {
      fireEvent.click(imageInput);
    });

    act(() => {
      fireEvent.change(imageInput, {
        target: { files: ["chucknorris.png", "mazzkcby.jpg"] },
      });
    });
    expect(imageInput.files).toStrictEqual(["chucknorris.png", "mazzkcby.jpg"]);
  });
});
