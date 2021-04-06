import { MockedProvider } from "@apollo/client/testing";
import { Route, MemoryRouter } from "react-router";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

import questionsObject from "../utils/QuestionsObject";
import NewSubmissionPage from "../pages/My/NewSubmissionPage";

import { mockSuccess } from "./mocks/newSubmissionPageMocks";

/* Essential */
afterEach(cleanup);

// Render
const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mockSuccess} addTypename={false}>
        <MemoryRouter initialEntries={["/my/submissions/new"]}>
          <Route path="/my/submissions/new">
            <NewSubmissionPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

/*------ Tests  -----*/

// New Submission page general tests
describe("New submission page", () => {
  it("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("has a imageUpload", async () => {
    setup();
    expect(screen.getByTestId("imageUpload")).toBeInTheDocument();
  });

  it("has questions to be answered", async () => {
    setup();
    await waitFor(() => {
      for (let i = 1; i < 9; i++) {
        expect(screen.getByTestId(`Questionnaire${i}`)).toBeInTheDocument();
      }
    });
  });

  it("has a submit button", async () => {
    setup();
    expect(screen.getByTestId("submitButton")).toBeInTheDocument();
  });

  it("has a back button", async () => {
    setup();
    expect(screen.getByTestId("backButton")).toBeInTheDocument();
  });

  it("has a next button", async () => {
    setup();
    expect(screen.getByTestId("nextButton")).toBeInTheDocument();
  });
});

//Image upload is an external component
describe("Image upload", () => {
  it("uploads an image", async () => {
    setup();

    const imageInput = screen.getByTestId("imageUpload");
    act(() => {
      fireEvent.change(imageInput, {
        target: { files: "chucknorris.png", length: 1 },
      });
    });
    expect(imageInput.files).toBe("chucknorris.png");
  });

  it("User can upload multiple images", async () => {
    setup();

    const imageInput = screen.getByTestId("imageUpload");

    act(() => {
      fireEvent.change(imageInput, {
        target: { files: ["chucknorris.png", "mazzkcby.jpg"] },
      });
    });
    expect(imageInput.files).toStrictEqual(["chucknorris.png", "mazzkcby.jpg"]);
  });
});

//Questionnaire Page
describe("Questionnaire Form", () => {
  const actions = () => {
    setup();
    expect(screen.getByTestId("tabQuestion")).toBeInTheDocument();
    const tab = screen.getByTestId("tabQuestion");
    act(() => {
      fireEvent.click(tab);
    });
    const tabPanel = screen.getByTestId("tabPanel");
    expect(tabPanel).toBeInTheDocument();
    // screen.debug(tabPanel, 10000);
    return tabPanel;
  };

  it("has a correct heading", async () => {
    const tabPanel = actions();
    expect(within(tabPanel).getByTestId("questionHeading")).toBeInTheDocument();
  });

  it("has stepper component with correct data", async () => {
    const tabPanel = actions();
    const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Review"];

    expect(within(tabPanel).getByTestId("stepperHolder")).toBeInTheDocument();
    steps.forEach((label) => {
      expect(
        within(tabPanel).getByTestId(`stepperInnerHolder${label}`)
      ).toBeInTheDocument();

      expect(
        within(tabPanel).getByTestId(`stepperLabel${label}`)
      ).toBeInTheDocument();

      expect(
        within(screen.getByTestId(`stepperLabel${label}`)).getByText(label)
      ).toBeInTheDocument();
    });
  });

  it("has buttons in correct state on load", async () => {
    const tabPanel = actions();
    const nextButton = within(tabPanel).getByTestId("nextButton");
    const backButtton = within(tabPanel).getByTestId("backButton");
    const submitButton = screen.getByTestId("submitButton");
    expect(nextButton.disabled).toBe(false);
    expect(backButtton.disabled).toBe(true);
    expect(submitButton.disabled).toBe(true);
  });

  it("has all questions rendered correctly", async () => {
    const tabPanel = actions();
    const maxQIndex = 7;
    const maxAIndex = 1;

    expect(screen.getByTestId(`questionMaster`)).toBeInTheDocument();

    for (let q = 0; q <= maxQIndex; q++) {
      expect(screen.getByTestId(`qText${q}`)).toBeInTheDocument();
      expect(screen.getByTestId(`qExtra${q}`)).toBeInTheDocument();
      expect(screen.getByTestId(`qText${q}`).innerHTML).toBe(
        questionsObject[q].questionText
      );
      for (let a = 0; a <= maxAIndex; a++) {
        expect(screen.getByTestId(`q${q}Option${a}`)).toBeInTheDocument();
      }
    }
  });

  it("shows correct information on the review page", async () => {
    const tabPanel = actions();
    const backButtton = within(tabPanel).getByTestId("backButton");
    const submitButton = screen.getByTestId("submitButton");
    const maxQIndex = 7;
    expect(submitButton.disabled).toBe(true);
    for (let q = 0; q <= maxQIndex; q++) {
      const nextButton = within(tabPanel).getByTestId("nextButton");
      const qRadioYes = screen.getByTestId(`q${q}Option1`);
      act(() => {
        fireEvent.click(qRadioYes);
      });

      act(() => {
        fireEvent.click(nextButton);
      });
    }
    expect(submitButton.disabled).toBe(false);

    expect(within(tabPanel).getByTestId("reviewPage")).toBeInTheDocument();

    for (let q = 1; q <= maxQIndex + 1; q++) {
      expect(within(tabPanel).getByTestId(`aOption${q}`).innerHTML).toBe("Yes");
    }
  });

  it("submits data correctly", async () => {
    const tabPanel = actions();
    const backButtton = within(tabPanel).getByTestId("backButton");
    const submitButton = screen.getByTestId("submitButton");
    const maxQIndex = 7;
    expect(submitButton.disabled).toBe(true);
    for (let q = 0; q <= maxQIndex; q++) {
      const nextButton = within(tabPanel).getByTestId("nextButton");
      const qRadioYes = screen.getByTestId(`q${q}Option1`);
      act(() => {
        fireEvent.click(qRadioYes);
      });

      act(() => {
        fireEvent.click(nextButton);
      });
    }

    expect(submitButton.disabled).toBe(false);
    act(() => {
      fireEvent.click(submitButton);
    });

    expect(screen.getAllByText(/Loading../i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Loading../i)[1]).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("formDone")).toBeInTheDocument();
    });
  });
});
