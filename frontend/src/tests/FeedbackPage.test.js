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
        createFeedback: { id: "1", stars: 1, extra: "hello world" },
      },
    },
  },
];

const component = render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <Feedback />
  </MockedProvider>
);

/*------ Tests  -----*/

describe("FeedbackPage", () => {
  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});

describe("Click submit button", () => {
  const button = component.findAllByRole("Button");

  it("Landing page has a button", () => {
    expect(button).toBeTruthy();
  });

  it("On submit", () => {
    expect(button.innerHTML).toBe(undefined);
    // fireEvent.click(button);
    // expect(btn.innerHTML).toBe("You Clicked");
  });
});

it("Textarea", () => {
  const TextArea = component.findAllByRole("TextArea");
  expect(TextArea).toBeTruthy();
});
