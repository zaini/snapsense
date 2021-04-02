import { MockedProvider } from "@apollo/client/testing";
import NewSubmissionPage, {
  UPLOAD_SUBMISSION,
  steps
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

  // describe("When query is loading", () => {
  //   it("displays a loader", async () => {
  //     const { findByTestId } = await setup(mockSuccess);
  //     fireEvent.click(await findByTestId("submitButton"));
  //     const loader = await findByTestId("formSubmitInnerLoader");
  //     expect(loader).toBeTruthy();
  //   });
  // });
  // describe("When query is errored", () => {
  //   it("displays an error message", async () => {
  //     const { findByTestId } = await setup(mockError);
  //     fireEvent.click(await findByTestId("submitButton"));
  //     // wait till the next render
  //     const errorBody = await findByTestId("formSubmitInnerError");
  //     expect(errorBody).toBeTruthy();
  //   });
  // });
  // describe("When query has data", () => {
  //   it("displays a success message", async () => {
  //     const { findByTestId } = await setup(mockSuccess);
  //     fireEvent.click(await findByTestId("submitButton"));
  //     // wait till the next render
  //     const successBody = await findByTestId("formSubmitInnerSuccess");
  //     expect(successBody).toBeTruthy();
  //   });
  // });
  describe("Before the uploading happens", () => {
    describe("Rendering", () => {
      it("has an image upload and questionnaire tab", async () => {
        const { findByTestId } = await setup(mockSuccess);
        expect(await findByTestId("imageTab")).toBeTruthy();
        expect(await findByTestId("questionnaireTab")).toBeTruthy();
      });
      // it("renders the submit button in disabled state", async () => {
      //   const { findByTestId } = await setup(mockSuccess);
      //   expect(await findByTestId("submitButton")).toHaveAttribute("disabled");
      // });
    });
    describe("Image upload", () => {
      it("uploads an image", async () => {
        const { container, findByTestId } = await setup(mockSuccess);
        fireEvent.click(await findByTestId("imageTab"));
        const imageInput = container.querySelector("input[type='file']");
        const file = new File(["(⌐□_□)"], "chucknorris.png", {
          type: "image/png"
        });
        await waitFor(() =>
          fireEvent.change(imageInput, { target: { files: [file] } })
        );
        const submitButton = await findByTestId("submitButton");
        //   expect(await findByTestId("submitButton")).not.toHaveAttribute("disabled");
        fireEvent.click(submitButton);
        // After we click the button, we are able to submit the form
        // TODO: Some issue with mock success response and hence we are not able to test the success state
        expect(await findByTestId("formSubmitInnerLoader")).toBeTruthy();
      });
    });
    describe("Questionnaire Upload", () => {
      it("displays the right steps", async () => {
        const { container, findByTestId } = await setup(mockSuccess);
        fireEvent.click(await findByTestId("questionnaireTab"));
        const stepsCounter = container.querySelectorAll(".QuestionnaireSteps")
          .length;
        expect(stepsCounter).toEqual(steps.length);
      });
      it("displays the question form when activeSteps is less than 8", async () => {
        const { findByTestId } = await setup(mockSuccess);
        fireEvent.click(await findByTestId("questionnaireTab"));
        expect(await findByTestId("Questionnaire")).toBeTruthy();
      });
      fit("displays the review page when all questions are answered", async () => {
        const { container, findByTestId, debug } = await setup(mockSuccess);
        fireEvent.click(await findByTestId("questionnaireTab"));
        for (let i = 0; i < steps.length - 1; i += 1) {
          fireEvent.click(await findByTestId("nextButton"));
        }
        expect(await findByTestId("ReviewPane")).toBeTruthy();
        const submitButton = await findByTestId("submitButton");
        //   expect(await findByTestId("submitButton")).not.toHaveAttribute("disabled");
        fireEvent.click(submitButton);
        expect(await findByTestId("formSubmitInnerLoader")).toBeTruthy();
        // Test if the success for the useMutation works
      });
    });
  });
});
