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

import { Route, MemoryRouter } from "react-router";

import { AuthContext } from "../context/auth";
import NewInvitePage from "../pages/My/NewInvitePage";
import { mocksWithData } from "./mocks/inviteUser";

afterEach(cleanup);

const admin = {
  id: 1,
  fname: "Admin",
  lname: "One",
  email: "admin@nhs.net",
  createdAt: "2021-03-25T17:42:58.000Z",
  updatedAt: "2021-03-25T17:42:58.000Z",
  accountType: "ADMIN",
};

const doctor = {
  id: 1,
  fname: "Doctor",
  lname: "One",
  email: "doctor1@nhs.net",
  hospital_id: 1,
  createdAt: "2021-03-25T17:42:58.000Z",
  updatedAt: "2021-03-25T17:42:58.000Z",
  accountType: "DOCTOR",
};

const setupAdmin = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: admin }}>
        <MockedProvider mocks={mocksWithData}>
          <MemoryRouter initialEntries={["/my/invites/new"]}>
            <Route path="/my/invites/new">
              <NewInvitePage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

const setupDoctor = async () => {
  act(() => {
    render(
      <AuthContext.Provider value={{ user: doctor }}>
        <MockedProvider mocks={mocksWithData}>
          <MemoryRouter initialEntries={["/my/invites/new"]}>
            <Route path="/my/invites/new">
              <NewInvitePage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

describe("invite user page", () => {
  test("if page renders without crashing for admin", async () => {
    expect(setupAdmin).toBeTruthy();
  });
  test("if page renders without crashing for doctor", async () => {
    expect(setupDoctor).toBeTruthy();
  });
});

describe("invite patient as a doctor", () => {
  test("if page shows correct heading and input boxes", async () => {
    setupDoctor();
    expect(screen.getByText(/Create Invitation/i)).toBeInTheDocument();
    expect(screen.getByTestId("inviteEmail")).toBeInTheDocument();
    expect(screen.getByTestId("inviteEmailRepeat")).toBeInTheDocument();
    expect(screen.getByTestId("inviteSubmit")).toBeInTheDocument();
  });

  test("if form correctly validates emails", async () => {
    setupDoctor();
    const emailInput = screen.getByTestId("inviteEmail");
    const emailInputRepeat = screen.getByTestId("inviteEmailRepeat");
    const submitBtn = screen.getByTestId("inviteSubmit");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "inviteuser@gmail.com" },
      });
    });

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "inviteuser_incorrect@gmail.com" },
      });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(/Emails must be identical/i)).toBeInTheDocument();
    });
  });

  test("if form correctly submits when emails match", async () => {
    setupDoctor();
    const emailInput = screen.getByTestId("inviteEmail");
    const emailInputRepeat = screen.getByTestId("inviteEmailRepeat");
    const submitBtn = screen.getByTestId("inviteSubmit");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "inviteuser@gmail.com" },
      });
    });

    act(() => {
      fireEvent.change(emailInputRepeat, {
        target: { value: "inviteuser@gmail.com" },
      });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Your invite has been sent!/i)
      ).toBeInTheDocument();
    });
  });
});

describe("invite doctor as an admin", () => {
  test("if page shows correct heading and input boxes", async () => {
    setupAdmin();
    expect(screen.getByText(/Create Invitation/i)).toBeInTheDocument();
    expect(screen.getByTestId("inviteEmail")).toBeInTheDocument();
    expect(screen.getByTestId("inviteEmailRepeat")).toBeInTheDocument();
    expect(screen.getByTestId("inviteSubmit")).toBeInTheDocument();
  });

  test("if form correctly validates emails", async () => {
    setupAdmin();
    const emailInput = screen.getByTestId("inviteEmail");
    const emailInputRepeat = screen.getByTestId("inviteEmailRepeat");
    const submitBtn = screen.getByTestId("inviteSubmit");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "inviteuser@gmail.com" },
      });
    });

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "inviteuser_incorrect@gmail.com" },
      });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(/Emails must be identical/i)).toBeInTheDocument();
    });
  });

  test("if form only allows NHS emails and throws valid error", async () => {
    setupAdmin();
    const emailInput = screen.getByTestId("inviteEmail");
    const emailInputRepeat = screen.getByTestId("inviteEmailRepeat");
    const submitBtn = screen.getByTestId("inviteSubmit");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "doctor@gmail.com" },
      });
    });

    act(() => {
      fireEvent.change(emailInputRepeat, {
        target: { value: "doctor@gmail.com" },
      });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText(/Only NHS Emails Allowed/i)).toBeInTheDocument();
    });
  });

  test("if form correctly submits when emails match", async () => {
    setupAdmin();
    const emailInput = screen.getByTestId("inviteEmail");
    const emailInputRepeat = screen.getByTestId("inviteEmailRepeat");
    const submitBtn = screen.getByTestId("inviteSubmit");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "inviteuser@gmail.com" },
      });
    });

    act(() => {
      fireEvent.change(emailInputRepeat, {
        target: { value: "inviteuser@gmail.com" },
      });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Your invite has been sent!/i)
      ).toBeInTheDocument();
    });
  });
});
