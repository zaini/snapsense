import React from "react";
import {
  screen,
  cleanup,
  waitFor,
  render,
  fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ProfilePage from "../pages/My/ProfilePage";
import { Route, MemoryRouter } from "react-router";
import { AuthContext } from "../context/auth";
import { MockedProvider } from "@apollo/client/testing";

import Mock from "./mocks/profilePageMocks";

afterEach(cleanup);

const setup = async () => {
  const patient = {
    id: 1,
    fname: "first",
    lname: "last",
    email: "patient1@gmail.com",
    createdAt: "2021-03-26T17:42:58.000Z",
    accountType: "PATIENT",
  };

  const toRet = {
    user: patient,
    login: () => {},
    logout: () => {},
  };

  act(() => {
    render(
      <AuthContext.Provider value={toRet}>
        <MockedProvider mocks={Mock} addTypename={false}>
          <MemoryRouter initialEntries={["/my/profile"]}>
            <Route path="/my/profile">
              <ProfilePage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

it("renders without crashing", () => {
  setup();
  expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
});

it("renders without crashing for PATIENT", () => {
  setup();
  expect(screen.getByText(/My Submissions/i)).toBeInTheDocument();
});

it("should load UserInfo in profile page without crashing", async () => {
  setup();
  await waitFor(() => {
    const changePWModalButton = screen.getByTestId("changePasswordButton");
    const deleteAccountModalButton = screen.getByTestId("deleteAccountButton");
    expect(changePWModalButton).toBeInTheDocument();
    expect(deleteAccountModalButton).toBeInTheDocument();
  });
});

it("should show loading spinner in profile page for PATIENT without crashing", async () => {
  setup();
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

it("should be able to open change password form", async () => {
  setup();
  act(() => {
    fireEvent(
      screen.getByTestId("changePasswordButton"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() =>
    expect(screen.getByTestId("changePasswordModal")).toBeInTheDocument()
  );
});

it("should be able to open delete account modal", async () => {
  setup();
  act(() => {
    fireEvent(
      screen.getByTestId("deleteAccountButton"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  expect(screen.getByTestId("deleteAccountModal")).toBeInTheDocument();
});

describe("change password modal tests", () => {
  it("should give an error if fail to properly repeat password", async () => {
    setup();

    act(() => {
      const openModalBtn = screen.getByTestId("changePasswordButton");
      fireEvent.click(openModalBtn);
    });

    act(() => {
      const newPasswordInput = screen.getByTestId("password");
      fireEvent.change(newPasswordInput, { target: { value: "Password000" } });
      expect(newPasswordInput.value).toBe("Password000");

      const newPasswordRepeatInput = screen.getByTestId("passwordRepeat");
      fireEvent.change(newPasswordRepeatInput, {
        target: { value: "Password123" },
      });
      expect(newPasswordRepeatInput.value).toBe("Password123");
    });

    await waitFor(() => {
      act(() => {
        const btnSubmit = screen.getByTestId("submitChangePassword");
        fireEvent.click(btnSubmit);
      });
    });

    expect(
      screen.getByText("'Password' must match 'Repeat Password'")
    ).toBeInTheDocument();
  });

  it("should give an error if repeated password is too simple", async () => {
    setup();

    act(() => {
      const openModalBtn = screen.getByTestId("changePasswordButton");
      fireEvent.click(openModalBtn);
    });

    act(() => {
      const newPasswordInput = screen.getByTestId("password");
      fireEvent.change(newPasswordInput, { target: { value: "asd" } });
      expect(newPasswordInput.value).toBe("asd");

      const newPasswordRepeatInput = screen.getByTestId("passwordRepeat");
      fireEvent.change(newPasswordRepeatInput, {
        target: { value: "asd" },
      });
      expect(newPasswordRepeatInput.value).toBe("asd");
    });

    await waitFor(() => {
      act(() => {
        const btnSubmit = screen.getByTestId("submitChangePassword");
        fireEvent.click(btnSubmit);
      });
    });

    expect(
      screen.getByText("Validation error: Invalid password")
    ).toBeInTheDocument();
  });

  it("should give a message saying that the password has successfully changed if it is valid", async () => {
    setup();

    act(() => {
      const openModalBtn = screen.getByTestId("changePasswordButton");
      fireEvent.click(openModalBtn);
    });

    act(() => {
      const newPasswordInput = screen.getByTestId("password");
      fireEvent.change(newPasswordInput, { target: { value: "Password000" } });
      expect(newPasswordInput.value).toBe("Password000");

      const newPasswordRepeatInput = screen.getByTestId("passwordRepeat");
      fireEvent.change(newPasswordRepeatInput, {
        target: { value: "Password000" },
      });
      expect(newPasswordRepeatInput.value).toBe("Password000");
    });

    await waitFor(() => {
      act(() => {
        const btnSubmit = screen.getByTestId("submitChangePassword");
        fireEvent.click(btnSubmit);
      });
    });

    expect(screen.getByText("Password has been updated!")).toBeInTheDocument();
  });
});

describe("delete account modal tests", () => {
  it("should give an error if fail to properly repeat password", async () => {
    setup();

    act(() => {
      const openModalBtn = screen.getByTestId("deleteAccountButton");
      fireEvent.click(openModalBtn);
    });

    act(() => {
      const passwordInput = screen.getByTestId("password");
      fireEvent.change(passwordInput, { target: { value: "Password000" } });
      expect(passwordInput.value).toBe("Password000");

      const passwordRepeatInput = screen.getByTestId("passwordRepeat");
      fireEvent.change(passwordRepeatInput, {
        target: { value: "Password123" },
      });
      expect(passwordRepeatInput.value).toBe("Password123");
    });

    await waitFor(() => {
      act(() => {
        const btnSubmit = screen.getByTestId("submitDeleteAccount");
        fireEvent.click(btnSubmit);
      });
    });

    expect(
      screen.getByText("'Password' must match 'Repeat Password'")
    ).toBeInTheDocument();
  });

  it("should give an error if repeated password is wrong", async () => {
    setup();

    act(() => {
      const openModalBtn = screen.getByTestId("deleteAccountButton");
      fireEvent.click(openModalBtn);
    });

    act(() => {
      const passwordInput = screen.getByTestId("password");
      fireEvent.change(passwordInput, { target: { value: "WRONGPASSWORD" } });
      expect(passwordInput.value).toBe("WRONGPASSWORD");

      const passwordRepeatInput = screen.getByTestId("passwordRepeat");
      fireEvent.change(passwordRepeatInput, {
        target: { value: "WRONGPASSWORD" },
      });
      expect(passwordRepeatInput.value).toBe("WRONGPASSWORD");
    });

    await waitFor(() => {
      act(() => {
        const btnSubmit = screen.getByTestId("submitDeleteAccount");
        fireEvent.click(btnSubmit);
      });
    });

    expect(screen.getByText("Incorrect password!")).toBeInTheDocument();
  });
});
