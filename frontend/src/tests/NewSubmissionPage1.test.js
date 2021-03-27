<<<<<<< HEAD
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

afterEach(async () => {
  await cleanup();
});

//Render component
const component = render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <NewSubmissionPage />
  </MockedProvider>
);

it("should be truthy", () => {
  const button = component.findAllByTestId("submitbutton");
  expect(button).toBeTruthy();
});
=======
import { MockedProvider } from '@apollo/client/testing';
import { gql, useMutation } from "@apollo/client";
import UPLOAD_SUBMISSION, {NewSubmissionPage} from "../pages/My/NewSubmissionPage";
import { render, cleanup, screen } from "@testing-library/react";

const mocks = [
    {
      request: {
        query: UPLOAD_SUBMISSION,

      },
    },
];

    //Render component
    const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewSubmissionPage />
    </MockedProvider>,
    );

    /* Essential */
    afterEach(async () => {
        await cleanup();
    });
  

    it("should be truthy", () => {
        const button = component.findAllByTestId("submitbutton");
        expect(button).toBeTruthy();
    });
>>>>>>> d9413db2fcda5851e040c24dcf7b9088bf3de5bf
