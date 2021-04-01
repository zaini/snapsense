
import Feedback, { CREATE_FEEDBACK } from "../components/Feedback/Feedback";
import { GET_SPECIFIC_FEEDBACK } from "../components/Feedback/ViewFeedback";
import { MockedProvider } from "@apollo/client/testing";
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Route, MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";

/* Essential */
afterEach(cleanup);

//Creating mock data
const mocks = [
  {
    request: {
      query: CREATE_FEEDBACK,
      variables: {
        stars: 1,
        extra: "This is a random feedback.",
      },
    },
    result: { data: { createFeedback: true } },
  },
  {
    request: {
      query: GET_SPECIFIC_FEEDBACK,
      variables: {},
    },
    result: {
      data: {
        getSpecificFeedback: {
          id: "1",
          stars: 1,
          extra: "This is a random feedback.",
        },
      },
    },
  },
];

// Render
const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/feedback"]}>
          <Route path="/feedback">
            <Feedback />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

/*------ Tests  -----*/
// Feedback page general tests
describe("New feedback page", () => {
  test("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  test("has a star rate option", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("starRate1")).toBeInTheDocument();
      expect(screen.getByTestId("starRate2")).toBeInTheDocument();
      expect(screen.getByTestId("starRate3")).toBeInTheDocument();
      expect(screen.getByTestId("starRate4")).toBeInTheDocument();
      expect(screen.getByTestId("starRate5")).toBeInTheDocument();
    });
  });

  test("has a name text area for additional feedback", async () => {
    setup();
    expect(screen.getByTestId("textArea")).toBeInTheDocument();
  });

  test("has a submit button", async () => {
    setup();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Placeholder for Enter Here", () => {
  it("can have text written in it", () => {
    setup();
    const textInput = screen.getByTestId("textArea");

    act(() => {
      fireEvent.change(textInput, { target: { value: "This is a feedback" } });
    });
    expect(textInput.value).toBe("This is a feedback");
  });
});

describe("Placeholder for stars", () => {
  it("users can rate stars", async () => {
    setup();
    const starInput = screen.getByTestId("starRate1");

    act(() => {
      fireEvent.change(starInput, {
        target: { value: 1 },
      });
    });
    expect(starInput.value).toBe("1");
  });
});

//gql testing
describe("Submitting form with valid input", () => {
  it("pops up a success message", async () => {
    setup();

    const starInput = screen.getByTestId("starRate1");
    act(() => {
      fireEvent.click(starInput);
    });

    expect(starInput.value).toBe("1");

    const textInput = screen.getByTestId("textArea");
    act(() => {
      fireEvent.change(textInput, {
        target: { value: "This is a random feedback." },
      });
    });
    expect(textInput.value).toBe("This is a random feedback.");

    const submitBtn = screen.getByTestId("submitButton");
    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByTestId("formSubmitInnerLoader")).toBeInTheDocument();
    });
  });
});