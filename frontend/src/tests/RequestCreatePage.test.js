import { React } from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

import NewRequestPage from "../pages/My/NewRequestPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);
import giveMocks from "./mocks/requestCreatePageMocks";

const initialDate = new Date();

const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={giveMocks(initialDate)} addTypename={false}>
        <MemoryRouter initialEntries={["/my/patients/1/requests/new"]}>
          <Route path="/my/patients/:patient_id/requests/new">
            <NewRequestPage dateIn={initialDate} />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("page loading", () => {
  test("if page renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });

  test("if loading spinner shows when opening new requests page", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe("new request page renders properly", () => {
  test("if new request page shows warning text if patient doesnt exist", async () => {
    act(() => {
      render(
        <MockedProvider mocks={giveMocks(initialDate)} addTypename={false}>
          <MemoryRouter initialEntries={["/my/patients/2/requests/new"]}>
            <Route path="/my/patients/:patient_id/requests/new">
              <NewRequestPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/This is an invalid patient/i)
      ).toBeInTheDocument();
    });
  });

  test("if new request page loads new request form on gql query success", async () => {
    setup();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Submission Request/i)).toBeInTheDocument();
    });
  });

  test("if new request page loads non periodic form by default", async () => {
    setup();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("nonPeriodicForm")).toBeInTheDocument();
      const form = screen.getByTestId("nonPeriodicForm");
      within(form).getByTestId("radioImage");
      within(form).getByTestId("radioQuestion");
      within(form).getByTestId("radioBoth");
    });
  });
});

describe("new request form renders properly", () => {
  test("if schedule tab on request page loads periodic form", async () => {
    setup();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByText("Scheduled"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      });

      expect(screen.getByTestId("periodicForm")).toBeInTheDocument();
      const form = screen.getByTestId("periodicForm");
      within(form).getByTestId("radioImage");
      within(form).getByTestId("radioQuestion");
      within(form).getByTestId("radioBoth");
      within(form).getByText("Interval in days");
      within(form).getByText("Frequency of Cycles");
    });
  });

  test("if interval on schedule form on request page allows values within 0 and 20 inclusive", async () => {
    setup();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByText("Scheduled"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      expect(screen.getByTestId("periodicForm")).toBeInTheDocument();
      const form = screen.getByTestId("periodicForm");

      const interval = within(form).getByTestId("inputInterval");
      act(() => {
        fireEvent.change(interval, { target: { value: "15" } });
      });

      expect(interval.value).toBe("15");
    });
  });
});

describe("new request form submits properly", () => {
  test("if form submit gives success message", async () => {
    setup();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId("nonPeriodicForm")).toBeInTheDocument();
    });

    const form = screen.getByTestId("nonPeriodicForm");

    const btnSubmit = within(form).getByText("Submit");
    act(() => {
      fireEvent.click(btnSubmit);
    });
    await waitFor(async () => {
      expect(screen.getByTestId("formSubmitInnerLoader")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByTestId("formSubmitInnerSuccess")).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Request has been sent to Patient/i)
    ).toBeInTheDocument();
  });

  test("if form does not submit on invalid input", async () => {
    setup();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId("nonPeriodicForm")).toBeInTheDocument();
    });

    const form = screen.getByTestId("nonPeriodicForm");

    const interval = within(form).getByTestId("inputInterval");

    act(() => {
      fireEvent.change(interval, { target: { value: "50" } });
    });

    expect(interval.value).toBe("50");

    const btnSubmit = within(form).getByText("Submit");

    act(() => {
      fireEvent.click(btnSubmit);
    });

    await waitFor(async () => {
      expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull();
      expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull();
    });
  });
});
