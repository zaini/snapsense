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

const { CREATE_REQUEST } = require("../components/Request/NewRequestForm");
const { GET_PATIENT_AS_DOCTOR } = require("../pages/My/NewRequestPage");

const initialDate = new Date();
const mocks = [
  {
    request: {
      query: GET_PATIENT_AS_DOCTOR,
      variables: {
        patient_id: "1",
      },
    },
    result: {
      data: {
        getPatientAsDoctor: {
          id: 1,
          fname: "Patient",
          lname: "One",
        },
      },
    },
  },
  {
    request: {
      query: GET_PATIENT_AS_DOCTOR,
      variables: {
        patient_id: "2",
      },
    },
    error: Error("This is an invalid patient"),
  },
  {
    request: {
      query: CREATE_REQUEST,
      variables: {
        patient_id: 1,
        request_type: 3,
        interval: 0,
        frequency: 0,
        deadline: initialDate.getTime().toString(),
      },
    },
    result: { data: { createRequest: true } },
  },
];

const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
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
  test("page renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });

  test("loading spinner shows when opening new requests page", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe("new request page renders properly", () => {
  test("new request page shows warning text if patient doesnt exist", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
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
      expect(screen.getByText(/Invalid Patient!/i)).toBeInTheDocument();
    });
  });

  test("new request page loads new request form on gql query success", async () => {
    setup();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Submission Request for /i)).toBeInTheDocument();
    });
  });

  test("new request page loads non periodic form by default", async () => {
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
  test("schedule tab on request page loads periodic form", async () => {
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

  test("interval on schedule form on request page allows values within 0 and 20 inclusive", async () => {
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
  test("form submit gives success message", async () => {
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

  test("form submit shows relevant error message on invalid input", async () => {
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

    expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull(); // it doesn't exist
    expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull(); // it doesn't exist
  });
});
