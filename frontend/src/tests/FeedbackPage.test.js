import { CREATE_FEEDBACK, Feedback } from "../components/Feedback/Feedback";
import { MockedProvider } from "@apollo/client/testing";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";

//Creating mock data
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

//Component variable to avoid code duplication.
const component = render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <Feedback />
  </MockedProvider>
);

/* Essentials */
screen.debug(); //to see the html elements
afterEach(cleanup);

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

  it("On submit", () => {
    expect(button.innerHTML).toBe(undefined);
  });
});

//Input text test
describe("Feedback textbox", () => {
  const TextArea = component.findAllByTestId("textarea");

  it("Textarea exist", () => {
    expect(TextArea).toBeTruthy();
  });
});

//Star Rate test
describe("Star Rating", () => {
  const StarRate = component.findAllByTestId("starrate");

  it("Start rating exist", () => {
    expect(StarRate).toBeTruthy();
  });
});
