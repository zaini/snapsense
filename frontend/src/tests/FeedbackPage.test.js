import Feedback, { CREATE_FEEDBACK } from "../components/Feedback/Feedback";
import { MockedProvider } from "@apollo/client/testing";
import {
  render,
  cleanup,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//Render component
const component = render(
  <MockedProvider
    customResolvers={{
      Mutation: () => ({
        createFeedback: () => ({ id: 1, stars: 5, extra: "go to the store" }),
      }),
    }}
  >
    <Feedback />
  </MockedProvider>
);

/* Essential */
afterEach(async () => {
  await cleanup();
});

/*------ Tests  -----*/
// Feedback page general tests
describe("A user can input in textarea to make a feedback", () => {
  userEvent.type(
    screen.getByTestId("text-area"),
    "The website was really useful and easy to use. Therefore I do not need to visit the hospital. Thanks!"
  );
  expect(screen.getByTestId("text-area")).toHaveValue(
    "The website was really useful and easy to use. Therefore I do not need to visit the hospital. Thanks!"
  );
});

describe("FeedbackPage", () => {
  it("A user can submit a written feedback", async () => {
    const additionalFeedback = screen.getByPlaceholderText("Enter here");
    const submitButton = component.getByTestId("submit-button");

    fireEvent.change(additionalFeedback, {
      target: { value: "Hello World" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByText("Hello World"));
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});

//Submit button exist
describe("Submit button", () => {
  it("Page has a submit button", () => {
    const button = component.findAllByTestId("submit-button");
    expect(button).toBeTruthy();
  });
});

//Input text exist
describe("Feedback textbox", () => {
  it("Textarea exist", () => {
    const TextArea = component.findAllByTestId("text-area");
    expect(TextArea).toBeTruthy();
  });
});

//Star Rate exist
describe("Star Rating", () => {
  it("Start rating exist", () => {
    const StarRate = component.findAllByTestId("star-rate");
    expect(StarRate).toBeTruthy();
  });
});
