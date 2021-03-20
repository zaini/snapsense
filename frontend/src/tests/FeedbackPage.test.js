import { CREATE_FEEDBACK, Feedback } from "../components/Feedback/Feedback";
import { MockedProvider } from "@apollo/client/testing";
import { render, cleanup, fireEvent } from "@testing-library/react";

const mocks = [
  {
    request: {
      query: CREATE_FEEDBACK,
      variables: {
        stars: "1",
        extra: "hello world",
      },
    },
    result: {
      data: {
        createFeedback: { id: "1", stars: 1, breed: "hello world" },
      },
    },
  },
];

const component = render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <Feedback />
  </MockedProvider>
);

afterEach(cleanup);

/// Tests
it("renders without error", () => {
  expect(component).toMatchSnapshot();
});
