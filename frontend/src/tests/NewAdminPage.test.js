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

const {
  CREATE_ADMIN,
  GET_ADMINS,
} = require("../components/Admin/NewAdminForm");
const { GET_HOSPITAL } = require("../pages/My/NewAdminPage");

const mocks = [
  {
    request: {
      query: GET_HOSPITAL,
      variables: {
        hospital_id: "1",
      },
    },
    result: {
      data: {
        getSpecificHospital: {
          id: 1,
          name: "Hospital",
          contact_email: "hospital@gmail.com",
        },
      },
    },
  },
  {
    request: {
      query: GET_HOSPITAL,
      variables: {
        hospital_id: "2",
      },
    },
    error: {
      graphQLErrors: [
        {
          message: "Hospital does not exist",
        },
      ],
    },
  },
  {
    request: {
      query: CREATE_ADMIN,
      variables: {
        fname: "Admin",
        lname: "One",
        email: "admin1@gmail.com",
        password: "Password123",
        hospital_id: 1,
      },
    },
    result: { data: { createAdmin: true } },
  },
  {
    request: {
      query: GET_ADMINS,
      variables: { id: "2" },
    },
    result: {
      data: {
        getAdmins: [
          {
            id: "1",
            fname: "Admin",
            lname: "One",
            email: "admin1@gmail.com",
            Hospital: {
              name: "Hospital One",
            },
          },
          {
            id: "2",
            fname: "Admin",
            lname: "Two",
            email: "admin2@gmail.com",
            Hospital: {
              name: "Hospital Two",
            },
          },
          {
            id: "3",
            fname: "Admin ",
            lname: "Three",
            email: "admin.three@gmail.com",
            Hospital: {
              name: "Hospital One",
            },
          },
        ],
      },
    },
  },
];

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

  it("has correct name, family name, email and password text input forms", async () => {
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

  it("can have text written in it for family name", async () => {
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

      const fnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(fnameInput, {
          target: { value: "validFName" },
        });
      });
      expect(fnameInput.value).toBe("validFName");

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

  it("doesn't submit when the family name is invalid", async () => {
    setup();

    await waitFor(() => {
      const nameInput = screen.getByTestId("adminNameInput");
      act(() => {
        fireEvent.change(nameInput, { target: { value: "validName" } });
      });
      expect(nameInput.value).toBe("validName");

      const fnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(fnameInput, {
          target: { value: "invalidFName" },
        });
      });
      expect(fnameInput.value).toBe("invalidFName");

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

      const fnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(fnameInput, {
          target: { value: "invalidFName" },
        });
      });
      expect(fnameInput.value).toBe("invalidFName");

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

      const fnameInput = screen.getByTestId("adminLNameInput");
      act(() => {
        fireEvent.change(fnameInput, {
          target: { value: "validFName" },
        });
      });
      expect(fnameInput.value).toBe("validFName");

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

    const fnameInput = screen.getByTestId("adminLNameInput");
    act(() => {
      fireEvent.change(fnameInput, {
        target: { value: "One" },
      });
    });
    expect(fnameInput.value).toBe("One");

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
