import { MockedProvider } from "@apollo/client/testing";
import { gql, useMutation } from "@apollo/client";
import {
  UPLOAD_SUBMISSION,
  NewSubmissionPage,
} from "../pages/My/NewSubmissionPage";

import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mocks = [
  {
    request: {
      query: UPLOAD_SUBMISSION,
    },
  },
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






  
