import { MockedProvider } from "@apollo/client/testing";
import { gql, useMutation } from "@apollo/client";
import { NewSubmissionPage } from "../pages/My/NewSubmissionPage";

import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

const { UPLOAD_SUBMISSION } = require("../pages/My/NewSubmissionPage");
const {GET_SUBMISSION}= require("../components/SubmissionsView/SubmissionsComponent.js")


const mocks = [
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
            }],
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
          }
        },
      result: { 
        data: {
           uploadSubmission: true } 
          },
  },
  // {
  //   request: {
  //     query: GET_SUBMISSION,
  //     variables: {
  //       patient_id: "2",
  //     },
  //   },
  //   error: {
  //     graphQLErrors: [
  //       {
  //         message: "This is an invalid patient",
  //       },
  //     ],
  //   },
  // },

];


// /*------ Essential  -----*/
// afterEach(async () => {
//   await cleanup();
// });

//Render setup
const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/my/submissions/new"]}>
          <Route path="/my/submissions/new">
            <ReviewSubmissions />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

/*------ Tests  -----*/
describe("page loading", () => {

  it("renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });
});
  // it("has a submit button", async () => {
  //   const button = setup.findByText("submitbutton");
  //   expect(button).toBeTruthy();
  // });


// it(" has submit button by default", async () => {
//   setup();
//   await waitFor(() => {
//     expect(screen.getByTestId("submitbutton")).toBeInTheDocument();
// });
  
// describe("ImageUpload", () => {
//   it("has a imageUpload", () => {
//     const imageUpload = setup.findAllByTestId("imageUpload");
//     expect(imageUpload).toBeTruthy();
//   });
// });

// describe("questionnaireForm", () => {
//   it("has a questionnaireForm", () => {
//     const form = setup.findAllByTestId("questionnaireForm");
//     expect(form).toBeTruthy();
//   });
// });
