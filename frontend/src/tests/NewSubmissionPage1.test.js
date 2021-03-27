import { MockedProvider } from '@apollo/client/testing';
import { gql, useMutation } from "@apollo/client";
import UPLOAD_SUBMISSION, {NewSubmissionPage} from "../pages/My/NewSubmissionPage";
import { render, cleanup, screen } from "@testing-library/react";

const mocks = [
    {
      request: {
        query: UPLOAD_SUBMISSION,
        // variables: { id: '1', Patient: {id:'1', fname:'firstname', lname:'lname',email:'patient1@gmail.com'}, Images: {id:'1',url:''}, 
        // Answers: {id:'1', Question: {id: '1', text:'Text Question'} }},
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