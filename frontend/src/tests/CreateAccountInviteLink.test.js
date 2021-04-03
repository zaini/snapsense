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
import ShowInvitePage from "../pages/Home/ShowInvitePage";
import {
  mocksWithData,
  tokenExists,
  tokenNew,
} from "./mocks/createAccountInvite";

afterEach(cleanup);

const patient = {
  id: 1,
  fname: "patient",
  lname: "one",
  email: "ayanahmad.ahay@gmail.com",
  flag: 2,
  createdAt: "2021-03-23T17:32:37.000Z",
  updatedAt: "2021-03-29T10:51:36.000Z",
  accountType: "PATIENT",
};

const setupExists = async () => {
  act(() => {
    const logout = () => {};
    render(
      <AuthContext.Provider value={{ user: patient, logout }}>
        <MockedProvider mocks={mocksWithData}>
          <MemoryRouter initialEntries={[`/invites/show/${tokenExists}`]}>
            <Route
              path="/invites/show/:token_id"
              component={ShowInvitePage}
            ></Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

const setupNew = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocksWithData}>
        <MemoryRouter initialEntries={[`/invites/show/${tokenNew}`]}>
          <Route
            path="/invites/show/:token_id"
            component={ShowInvitePage}
          ></Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("viewing invite for a new user patient", () => {
  test("if page renders without crashing", async () => {
    expect(setupNew).toBeTruthy();
  });

  test("if spinner shows on page load", async () => {
    setupNew();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if correct heading an form are rendered", async () => {
    setupNew();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/You have an invite!/i)).toBeInTheDocument();
      expect(screen.getByTestId("InvitePatientNewForm")).toBeInTheDocument();
    });
  });

  test("if correct heading and form are rendered", async () => {
    setupNew();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/You have an invite!/i)).toBeInTheDocument();
      expect(screen.getByTestId("InvitePatientNewForm")).toBeInTheDocument();
    });
    expect(screen.getByTestId("fnameForm")).toBeInTheDocument();
    expect(screen.getByTestId("lnameForm")).toBeInTheDocument();
    expect(screen.getByTestId("passwordForm")).toBeInTheDocument();
    expect(screen.getByTestId("repPasswordForm")).toBeInTheDocument();
    expect(screen.getByTestId("submitForm")).toBeInTheDocument();
  });
});

describe("submitting invite form for a new user patient", () => {
  test("if form shows valid validation messages", async () => {
    setupNew();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/You have an invite!/i)).toBeInTheDocument();
      expect(screen.getByTestId("InvitePatientNewForm")).toBeInTheDocument();
    });
    const fname = screen.getByTestId("fnameForm");
    const lname = screen.getByTestId("lnameForm");
    const pw = screen.getByTestId("passwordForm");
    const rePw = screen.getByTestId("repPasswordForm");
    const submit = screen.getByTestId("submitForm");

    act(() => {
      fireEvent.change(fname, {
        target: { value: "Fname" },
      });
    });
    act(() => {
      fireEvent.change(lname, {
        target: { value: "Lname" },
      });
    });
    act(() => {
      fireEvent.change(pw, {
        target: { value: "AbCdEf123" },
      });
    });
    act(() => {
      fireEvent.change(rePw, {
        target: { value: "AbCdEf1231" },
      });
    });

    act(() => {
      fireEvent.click(submit);
    });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/Password must be identical/i)
      ).toBeInTheDocument();
    });
  });

  test("if form submits with valid details", async () => {
    setupNew();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/You have an invite!/i)).toBeInTheDocument();
      expect(screen.getByTestId("InvitePatientNewForm")).toBeInTheDocument();
    });
    const fname = screen.getByTestId("fnameForm");
    const lname = screen.getByTestId("lnameForm");
    const pw = screen.getByTestId("passwordForm");
    const rePw = screen.getByTestId("repPasswordForm");
    const submit = screen.getByTestId("submitForm");

    act(() => {
      fireEvent.change(fname, {
        target: { value: "Fname" },
      });
    });
    act(() => {
      fireEvent.change(lname, {
        target: { value: "Lname" },
      });
    });
    act(() => {
      fireEvent.change(pw, {
        target: { value: "AbCdEf123" },
      });
    });
    act(() => {
      fireEvent.change(rePw, {
        target: { value: "AbCdEf123" },
      });
    });

    jest.spyOn(window, "alert").mockImplementation(() => {});
    act(() => {
      fireEvent.click(submit);
    });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(window.alert).toBeCalledWith(
        "You have created an account and accepted this invitation."
      );
    });
  });
});

describe("viewing invite for an existing user patient ", () => {
  test("if page renders without crashing for existing user", async () => {
    expect(setupExists).toBeTruthy();
  });

  test("if spinner shows on page load for existing user", async () => {
    setupExists();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("if correct heading an form are rendered for existing user", async () => {
    setupExists();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/You have an invite!/i)).toBeInTheDocument();
      expect(
        screen.getByTestId("InvitePatientExistingForm")
      ).toBeInTheDocument();
    });
  });

  test("if correct heading and form are rendered for existing user", async () => {
    setupExists();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/You've been invited by doctor1@nhs.net/i)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("InvitePatientExistingForm")
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId("btnAccept")).toBeInTheDocument();
    expect(screen.getByTestId("btnDecline")).toBeInTheDocument();
  });
});

describe("taking action on invite form for existing user patient", () => {
  test("if declining the invite shows correct alert", async () => {
    setupExists();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByTestId("InvitePatientExistingForm")
      ).toBeInTheDocument();
    });
    const decline = screen.getByTestId("btnDecline");

    jest.spyOn(window, "alert").mockImplementation(() => {});
    act(() => {
      fireEvent.click(decline);
    });

    expect(window.alert).toBeCalledWith(
      "You have declined this invitation. You can come back to this link to accept it before it expires."
    );
  });

  test("if accepting the invite shows correct alert", async () => {
    setupExists();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByTestId("InvitePatientExistingForm")
      ).toBeInTheDocument();
    });
    const accept = screen.getByTestId("btnAccept");

    jest.spyOn(window, "alert").mockImplementation(() => {});
    act(() => {
      fireEvent.click(accept);
    });

    await waitFor(() => {
      expect(window.alert).toBeCalledWith("You have accepted this invitation.");
    });
  });
});
