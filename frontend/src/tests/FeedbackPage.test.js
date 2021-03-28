import { CREATE_FEEDBACK, Feedback } from "../components/Feedback/Feedback";
import { MockedProvider } from "@apollo/client/testing";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//Creating mock data
const mocks = [
  {
    request: {
      query: CREATE_FEEDBACK,
    },
  },
];

//Render component
const component = render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <Feedback />
  </MockedProvider>
);

/* Essential */
afterEach(async () => {
  await cleanup();
});

/*------ Tests  -----*/
// Feedback page general tests
describe("FeedbackPage", () => {
  it("has those written lines", () => {
    expect(
      screen.getByText("How would you rate your experience with SnapSense?")
    ).toBeInTheDocument();
    expect(screen.getByText("Additional Feedback")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});

//Submit button check
describe("Submit button", () => {
  it("Page has a submit button", () => {
    const button = component.findAllByTestId("submitbutton");
    expect(button).toBeTruthy();
  });
});

//TODO
// describe("User can click on submit button", () => {
//   const SubmitButton = jest.fn();
//   userEvent.click(screen.getByText("Submit"));
//   expect(SubmitButton).toBeCalledTimes(1);
// });

//Input text test
describe("Feedback textbox", () => {
  it("Textarea exist", () => {
    const TextArea = component.findAllByTestId("textarea");
    expect(TextArea).toBeTruthy();
  });
});

describe("A user can input in textarea to make a feedback", () => {
  userEvent.type(
    screen.getByTestId("textarea"),
    "The website was really useful and easy to use. Therefore I do not need to visit the hospital. Thanks!"
  );
  expect(screen.getByTestId("textarea")).toHaveValue(
    "The website was really useful and easy to use. Therefore I do not need to visit the hospital. Thanks!"
  );
});



//Star Rate test
describe("Star Rating", () => {
  it("Start rating exist", () => {
    const StarRate = component.findAllByTestId("starrate");
    expect(StarRate).toBeTruthy();
  });
});
