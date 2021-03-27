import { MockedProvider } from "@apollo/client/testing";
import { gql, useMutation } from "@apollo/client";
import {
  UPLOAD_SUBMISSION,
  NewSubmissionPage,
} from "../pages/My/NewSubmissionPage";

import { render, cleanup, screen } from "@testing-library/react";
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
    const button = component.findAllByTestId("imageUpload");
    expect(button).toBeTruthy();
  });
});

describe("questionnaireForm", () => {
  it("has a questionnaireForm", () => {
    const button = component.findAllByTestId("questionnaireForm");
    expect(button).toBeTruthy();
  });
});
