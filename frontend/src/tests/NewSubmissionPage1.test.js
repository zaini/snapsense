import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { gql, useMutation } from "@apollo/client";
import { UPLOAD_SUBMISSION, NewSubmissionPage } from "../pages/My/NewSubmissionPage";
import { render, cleanup, screen } from "@testing-library/react";


const mocks = [
    {
      request: {
        query: UPLOAD_SUBMISSION,
        variables: { id: 1, Patient: 1, images: 1 , answers: 1 },
      },
    }];
    //Render component
    const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewSubmissionPage />
    </MockedProvider>,
);

it("should be truthy", () => {
    const button = component.findAllByTestId("submitbutton");
    expect(button).toBeTruthy();
});