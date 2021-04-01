import { MockedProvider } from "@apollo/client/testing";
import { gql, useMutation } from "@apollo/client";
import NewSubmissionPage, {
  UPLOAD_SUBMISSION,
} from "../pages/My/NewSubmissionPage";
import { GET_SUBMISSIONS } from "../components/SubmissionsView/SubmissionsComponent.js";
import { act } from "react-dom/test-utils";
import { Route, MemoryRouter } from "react-router";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";

afterEach(cleanup);

const mocksWithData = [
  {
    request: {
      query: UPLOAD_SUBMISSION,
      variables: {
        submission_id: "1",
        Images: [
          {
            id: "6",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
            __typename: "Image",
          },
        ],
        Answers: [
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
        ],
      },
    },
    result: {
      data: {
        createSubmission: true,
      },
    },
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: {
      data: {
        getSubmissions: {
          submission_id: "1",
          Images: [
            {
              id: "6",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
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
        },
      },
    },
  },
];

//Render setup
const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocksWithData} addTypename={false}>
        <MemoryRouter initialEntries={["/my/submissions/new"]}>
          <Route path="/my/submissions/new">
            <NewSubmissionPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

/*------ BenTests  -----*/
// describe("page loading", () => {
//   test("renders without crashing", async () => {
//     expect(setup).toBeTruthy();
//   });
//   test("has a submit button", async () => {
//     const button = screen.findAllByTestId("submitbutton");

//     expect(button).toBeTruthy();
//   });

//   test("contains alert text", async () => {
//     const alert = screen.findAllByTestId("alert");
//     expect(alert).toBeTruthy();
//   });

//   test("contains upload header", async () => {
//     const header = screen.findAllByTestId("uploadHeader");
//     expect(header).toBeTruthy();
//   });

//   test("contains upload header", async () => {
//     const header = screen.findAllByTestId("uploadHeader");
//     expect(header).toBeTruthy();
//   });
// });
/*------ BensTests  -----*/

/*------ Tests  -----*/
// Testing those id's : questionnaireForm, submitButton, imageUpload
// Feedback page general tests
describe("New feedback page", () => {
  test("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  test("has multiple questions", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("questionnaireForm1")).toBeInTheDocument();
      expect(screen.getByTestId("questionnaireForm2")).toBeInTheDocument();
      expect(screen.getByTestId("questionnaireForm3")).toBeInTheDocument();
      expect(screen.getByTestId("questionnaireForm4")).toBeInTheDocument();
      expect(screen.getByTestId("questionnaireForm5")).toBeInTheDocument();
      expect(screen.getByTestId("questionnaireForm6")).toBeInTheDocument();
      expect(screen.getByTestId("questionnaireForm7")).toBeInTheDocument();
      expect(screen.getByTestId("questionnaireForm8")).toBeInTheDocument();
    });
  });

  test("has image upload area", async () => {
    setup();
    expect(screen.getByTestId("imageUpload")).toBeInTheDocument();
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

/* TODO */
// describe("Placeholder for Enter Here", () => {
//   it("can have text written in it", () => {
//     setup();
//     const textInput = screen.getByTestId("textArea");

//     act(() => {
//       fireEvent.change(textInput, { target: { value: "This is a feedback" } });
//     });
//     expect(textInput.value).toBe("This is a feedback");
//   });
// });

describe("Placeholder for stars", () => {
  it("users can answer questions", async () => {
    setup();
    const questionInput = screen.getByTestId("questionnaireForm1");

    act(() => {
      fireEvent.click(questionInput, {
        target: { value: true },
      });
    });
    expect(questionInput.value).toBe("true");
  });
});

//gql testing
// describe("Submitting form with valid input", () => {
//   it("pops up a success message", async () => {
//     setup();

//     const starInput = screen.getByTestId("starRate1");
//     act(() => {
//       fireEvent.click(starInput);
//     });

//     expect(starInput.value).toBe("1");

//     const textInput = screen.getByTestId("textArea");
//     act(() => {
//       fireEvent.change(textInput, {
//         target: { value: "This is a random feedback." },
//       });
//     });
//     expect(textInput.value).toBe("This is a random feedback.");

//     const submitBtn = screen.getByTestId("submitButton");
//     act(() => {
//       fireEvent.click(submitBtn);
//     });

//     await waitFor(() => {
//       expect(screen.getByTestId("formSubmitInnerLoader")).toBeInTheDocument();
//     });
//   });
// });
