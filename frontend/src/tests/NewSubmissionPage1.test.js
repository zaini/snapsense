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
