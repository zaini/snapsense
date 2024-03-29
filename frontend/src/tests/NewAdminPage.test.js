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

import NewAdminPage from "../pages/My/NewAdminPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

import mocks from "./mocks/newAdminPageMocks";

//render component
const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/hospitals/1/admins/new"]}>
          <Route path="/my/hospitals/:hospital_id/admins/new">
            <NewAdminPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("New admin page", () => {
  it("renders without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("shows loading spinner when opens", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("has a correct title", () => {
    setup();
    expect(screen.getByText("Create an Admin")).toBeInTheDocument();
  });

  it("displays the correct placeholder for Name, Family Name, Email and Password input fields", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("adminNameInput")).toBeInTheDocument();
      expect(screen.getByTestId("adminLNameInput")).toBeInTheDocument();
      expect(screen.getByTestId("adminEmailInput")).toBeInTheDocument();
      expect(screen.getByTestId("adminPasswordInput")).toBeInTheDocument();
    });
  });

  it("has a submit button", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  it("shows warning text if hospital doesn't exist", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/hospitals/2/admins/new"]}>
            <Route path="/my/hospitals/:hospital_id/admins/new">
              <NewAdminPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Hospital does not exist/i)).toBeInTheDocument();
    });
  });
});

describe("Placeholders", () => {
  it("can have text written in it for name", async () => {
    setup();
    await waitFor(() => {
      const nameInput = screen.getByTestId("adminNameInput");
      act(() => {
        fireEvent.change(nameInput, { target: { value: "Admin" } });
      });
      expect(nameInput.value).toBe("Admin");
    });
  });

  it("can have text written in it for last name", async () => {
    setup();
    await waitFor(() => {
      const fnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(fnameInput, { target: { value: "One" } });
      });
      expect(fnameInput.value).toBe("One");
    });
  });

  it("can have text written in it for email", async () => {
    setup();
    await waitFor(() => {
      const emailInput = screen.getByTestId("adminEmailInput");
      act(() => {
        fireEvent.change(emailInput, { target: { value: "admin1@gmail.com" } });
      });
      expect(emailInput.value).toBe("admin1@gmail.com");
    });
  });

  it("can have text written in it for password", async () => {
    setup();
    await waitFor(() => {
      const passwordInput = screen.getByTestId("adminPasswordInput");
      act(() => {
        fireEvent.change(passwordInput, { target: { value: "Password123" } });
      });
      expect(passwordInput.value).toBe("Password123");
    });
  });
});

describe("Submitting form with invalid input", () => {
  it("doesn't submit when the name is invalid", async () => {
    setup();

    await waitFor(() => {
      const nameInput = screen.getByTestId("adminNameInput");
      act(() => {
        fireEvent.change(nameInput, { target: { value: "invalidName" } });
      });
      expect(nameInput.value).toBe("invalidName");

      const lnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(lnameInput, {
          target: { value: "validFName" },
        });
      });
      expect(lnameInput.value).toBe("validFName");

      const emailInput = screen.getByTestId("adminEmailInput");
      act(() => {
        fireEvent.change(emailInput, {
          target: { value: "admin@gmail.com" },
        });
      });
      expect(emailInput.value).toBe("admin@gmail.com");

      const passwordInput = screen.getByTestId("adminPasswordInput");
      act(() => {
        fireEvent.change(passwordInput, {
          target: { value: "Password123" },
        });
      });
      expect(passwordInput.value).toBe("Password123");

      const submitButton = screen.getByRole("button");
      act(() => {
        fireEvent.click(submitButton);
      });

      expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull();
      expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull();
    });
  });

  it("doesn't submit when the last name is invalid", async () => {
    setup();

    await waitFor(() => {
      const nameInput = screen.getByTestId("adminNameInput");
      act(() => {
        fireEvent.change(nameInput, { target: { value: "validName" } });
      });
      expect(nameInput.value).toBe("validName");

      const lnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(lnameInput, {
          target: { value: "invalidFName" },
        });
      });
      expect(lnameInput.value).toBe("invalidFName");

      const emailInput = screen.getByTestId("adminEmailInput");
      act(() => {
        fireEvent.change(emailInput, {
          target: { value: "admin@gmail.com" },
        });
      });
      expect(emailInput.value).toBe("admin@gmail.com");

      const passwordInput = screen.getByTestId("adminPasswordInput");
      act(() => {
        fireEvent.change(passwordInput, {
          target: { value: "Password123" },
        });
      });
      expect(passwordInput.value).toBe("Password123");

      const submitButton = screen.getByRole("button");
      act(() => {
        fireEvent.click(submitButton);
      });

      expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull();
      expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull();
    });
  });

  it("doesn't submit when the email is invalid", async () => {
    setup();

    await waitFor(() => {
      const nameInput = screen.getByTestId("adminNameInput");
      act(() => {
        fireEvent.change(nameInput, { target: { value: "validName" } });
      });
      expect(nameInput.value).toBe("validName");

      const lnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(lnameInput, {
          target: { value: "invalidFName" },
        });
      });
      expect(lnameInput.value).toBe("invalidFName");

      const emailInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(emailInput, {
          target: { value: "invalidEmail" },
        });
      });
      expect(emailInput.value).toBe("invalidEmail");

      const passwordInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(passwordInput, {
          target: { value: "Password123" },
        });
      });
      expect(passwordInput.value).toBe("Password123");

      const submitButton = screen.getByRole("button");
      act(() => {
        fireEvent.click(submitButton);
      });

      expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull();
      expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull();
    });
  });

  it("doesn't submit when the email is invalid", async () => {
    setup();

    await waitFor(() => {
      const nameInput = screen.getByTestId("adminNameInput");
      act(() => {
        fireEvent.change(nameInput, { target: { value: "validName" } });
      });
      expect(nameInput.value).toBe("validName");

      const lnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(lnameInput, {
          target: { value: "validLName" },
        });
      });
      expect(lnameInput.value).toBe("validLName");

      const emailInput = screen.getByTestId("adminEmailInput");
      act(() => {
        fireEvent.change(emailInput, {
          target: { value: "admin@gmail.com" },
        });
      });
      expect(emailInput.value).toBe("admin@gmail.com");

      const passwordInput = screen.getByTestId("adminPasswordInput");
      act(() => {
        fireEvent.change(passwordInput, {
          target: { value: "invalidPassword" },
        });
      });
      expect(passwordInput.value).toBe("invalidPassword");

      const submitButton = screen.getByRole("button");
      act(() => {
        fireEvent.click(submitButton);
      });

      expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull();
      expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull();
    });
  });
});

describe("Submitting form with valid input", () => {
  it("submits the information and pops up a success message", async () => {
    setup();

    await waitFor(() => {
      const nameInput = screen.getByTestId("adminNameInput");
      act(() => {
        fireEvent.change(nameInput, { target: { value: "Admin" } });
      });
      expect(nameInput.value).toBe("Admin");
    });

    const lnameInput = screen.getByTestId("adminLNameInput");
    act(() => {
      fireEvent.change(lnameInput, {
        target: { value: "One" },
      });
    });
    expect(lnameInput.value).toBe("One");

    const emailInput = screen.getByTestId("adminEmailInput");
    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "admin1@gmail.com" },
      });
    });
    expect(emailInput.value).toBe("admin1@gmail.com");

    const passwordInput = screen.getByTestId("adminPasswordInput");
    act(() => {
      fireEvent.change(passwordInput, {
        target: { value: "Password123" },
      });
    });
    expect(passwordInput.value).toBe("Password123");

    const submitButton = screen.getByRole("button");

    await waitFor(() => {
      act(() => {
        fireEvent.click(submitButton);
      });
      expect(screen.getByTestId("formSubmitInnerLoader")).toBeInTheDocument();
    });
  });
});
