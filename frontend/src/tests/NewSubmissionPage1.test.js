import { MockedProvider } from "@apollo/client/testing";
import NewSubmissionPage, {
  UPLOAD_SUBMISSION
} from "../pages/My/NewSubmissionPage";
import { GET_SUBMISSIONS } from "../components/SubmissionsView/SubmissionsComponent.js";
import { Route, MemoryRouter } from "react-router";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor
} from "@testing-library/react";

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
              __typename: "Question"
            },
            value: true,
            extra: "fsdfsd",
            __typename: "Answer"
          },
          {
            id: "55",
            Question: {
              id: "7",
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
              __typename: "Question"
            },
            value: false,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "54",
            Question: {
              id: "6",
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
              __typename: "Question"
            },
            value: true,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "53",
            Question: {
              id: "5",
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
              __typename: "Question"
            },
            value: false,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "52",
            Question: {
              id: "4",
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
              __typename: "Question"
            },
            value: true,
            extra: "fds",
            __typename: "Answer"
          },
          {
            id: "51",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question"
            },
            value: true,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "50",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question"
            },
            value: false,
            extra: "dsfsdfds",
            __typename: "Answer"
          },
          {
            id: "49",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question"
            },
            value: true,
            extra: null,
            __typename: "Answer"
          }
        ])
      }
    },
    result: {
      data: {
        createSubmission: true
      }
    }
  }
];

const mockError = [
  {
    request: {
      query: UPLOAD_SUBMISSION,
      variables: {
        images: [
          {
            id: "6",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
            __typename: "Image"
          }
        ],
        answers: JSON.stringify([
          {
            id: "56",
            Question: {
              id: "8",
              text: "Please add any other notes for your clinician (optional):",
              __typename: "Question"
            },
            value: true,
            extra: "fsdfsd",
            __typename: "Answer"
          },
          {
            id: "55",
            Question: {
              id: "7",
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
              __typename: "Question"
            },
            value: false,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "54",
            Question: {
              id: "6",
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
              __typename: "Question"
            },
            value: true,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "53",
            Question: {
              id: "5",
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
              __typename: "Question"
            },
            value: false,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "52",
            Question: {
              id: "4",
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
              __typename: "Question"
            },
            value: true,
            extra: "fds",
            __typename: "Answer"
          },
          {
            id: "51",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question"
            },
            value: true,
            extra: null,
            __typename: "Answer"
          },
          {
            id: "50",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question"
            },
            value: false,
            extra: "dsfsdfds",
            __typename: "Answer"
          },
          {
            id: "49",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question"
            },
            value: true,
            extra: null,
            __typename: "Answer"
          }
        ])
      }
    },
    error: new Error("An error occurred")
  }
];

//Render setup
const setup = async mockData => {
  const wrapper = render(
    <MockedProvider mocks={mockData} addTypename={false}>
      <NewSubmissionPage />
    </MockedProvider>
  );
  await waitFor(() => new Promise(res => setTimeout(res, 0)));
  return wrapper;
};

describe("New submission page", () => {
  afterEach(cleanup);

  describe("When query is loading", () => {
    fit("displays a loader", async () => {
      const { findByTestId } = await setup(mockSuccess);
      fireEvent.click(await findByTestId("submitButton"));
      const loader = await findByTestId("formSubmitInnerLoader");
      expect(loader).toBeTruthy();
    });
  });
  describe("When query is errored", () => {
    it("displays an error message", async () => {
      const { findByTestId } = await setup(mockError);
      fireEvent.click(await findByTestId("submitButton"));
      // wait till the next render
      const errorBody = await findByTestId("formSubmitInnerError");
      expect(errorBody).toBeTruthy();
    });
  });
  describe("When query has data", () => {
    it("displays a success message", async () => {
      const { findByTestId } = await setup(mockSuccess);
      fireEvent.click(await findByTestId("submitButton"));
      // wait till the next render
      const successBody = await findByTestId("formSubmitInnerSuccess");
      expect(successBody).toBeTruthy();
    });
  });
});
