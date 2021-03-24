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

//Component variable to avoid code duplication.
const component = render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <Feedback />
  </MockedProvider>
);

/* Essentials */
afterAll(cleanup);

/*------ Tests  -----*/
//Feedback page general tests
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
  const button = component.findAllByTestId("submitbutton");

  it("Page has a submit button", () => {
    expect(button).toBeTruthy();
  });
});

describe("User can click on submit button", () => {
  userEvent.click(screen.getByText("Submit"));
  expect(screen.getByRole("Button")).toBeChecked();
});

//Input text test
describe("Feedback textbox", () => {
  const TextArea = component.findAllByTestId("textarea");

  it("Textarea exist", () => {
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

describe("this is an expected failure", () => {
  userEvent.type(screen.getByTestId("textarea"), "Thank you for the failing");
  expect(screen.getByTestId("textarea")).toHaveValue("this is a failed.");
});

//Star Rate test
describe("Star Rating", () => {
  const StarRate = component.findAllByTestId("starrate");

  it("Start rating exist", () => {
    expect(StarRate).toBeTruthy();
  });
});
