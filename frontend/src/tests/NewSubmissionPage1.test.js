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
          image: {id: '1', url:''},
          answers: {
            id: '1', Question: {id: '1', text: 'Text question' }, value: '', extra: ''},
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


/*------ Essential  -----*/
afterEach(async () => {
  await cleanup();
});

//Render component
const component = render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <NewSubmissionPage />
  </MockedProvider>
);


/*------ Tests  -----*/

it("renders without crashing", () => {
  expect(component).toBeTruthy();
});

describe("Submit button", () => {
  it("has a submit button", () => {
    const button = component.findAllByTestId("submitbutton");
    expect(button).toBeTruthy();
  });
});

describe("ImageUpload", () => {
  it("has a imageUpload", () => {
    const imageUpload = component.findAllByTestId("imageUpload");
    expect(imageUpload).toBeTruthy();
  });
});

describe("questionnaireForm", () => {
  it("has a questionnaireForm", () => {
    const form = component.findAllByTestId("questionnaireForm");
    expect(form).toBeTruthy();
  });
});






  
