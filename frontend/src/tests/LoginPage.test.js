import { React, useState } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { Route, MemoryRouter } from "react-router";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  act,
  renderHook,
} from "@testing-library/react";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

import LoginPage from "../pages/Home/LoginPage.js";
import { LOGIN_USER, LoginForm } from "../components/Login/LoginForm";

afterEach(cleanup);

// valid login as patient, doctor, admin, superadmin
// invalid login - password, email, type to email?
// login button renders and works
// type selector renders and works

//Mock data for GQL
const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: "patient@gmail.com",
        password: "ABCPassword123.",
        account_type: "PATIENT",
      },
    },
    error: {
      message: "Invalid Credentials",
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: "patient1@gmail.com",
        password: "ABCPassword123.",
        account_type: "PATIENT",
      },
    },
    response: {
      data: {
        login: {
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZm5hbWUiOiJQYXRpZW50IiwibG5hbWUiOiJPbmUiLCJlbWFpbCI6InBhdGllbnQxQGdtYWlsLmNvbSIsImZsYWciOjIsImNyZWF0ZWRBdCI6IjIwMjEtMDMtMjNUMTc6MzI6MzcuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDMtMjNUMTk6NDA6MDcuMDAwWiIsImFjY291bnRUeXBlIjoiUEFUSUVOVCIsImlhdCI6MTYxNjkyMTA5MywiZXhwIjoxNjE2OTI4MjkzfQ.LsXTQUJ7G80OtcyMRdt6F0dXIGq0H3lOvPf4oBzADdc",
        },
      },
    },
  },
];
//Render component
const setup = () => {
  act(() => {
    let user,
      login,
      logout = null;
    render(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/login"]}>
            <Route path="/login">
              <LoginPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
  });
};

describe("Login Form Wrapper contents", () => {
  it("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("should have correct heading", () => {
    setup();
    expect(screen.getByText(/Choose Account Type/i)).toBeInTheDocument();
    expect(screen.getByTestId("formHelper")).toBeInTheDocument();
  });

  it("should have all account types and radio buttons and submit buttons", () => {
    setup();
    const toCheck = [
      "labelPatient",
      "labelDoctor",
      "labelAdmin",
      "labelSuperAdmin",
      "btnPatient",
      "btnDoctor",
      "btnAdmin",
      "btnSuperAdmin",
      "btnSubmit",
    ];
    for (let i = 0; i < toCheck.length; i++) {
      expect(screen.getByTestId(toCheck[i])).toBeInTheDocument();
    }
  });

  it("should have email and password form", () => {
    setup();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("inputEmail")).toBeInTheDocument();
    expect(screen.getByTestId("inputPassword")).toBeInTheDocument();
  });
});

describe("Login Form Functionality", () => {
  it("should maintain helper text state on changing account", () => {
    setup();
    expect(screen.getByTestId("formHelper")).toBeInTheDocument();
    const helperText = screen.getByTestId("formHelper");
    expect(
      helperText.innerHTML ==
        "Hello patient! Please fill out the form below to get started"
    ).toBeTruthy();

    const superAdminBtn = screen.getByTestId("btnSuperAdmin");
    const adminBtn = screen.getByTestId("btnAdmin");
    const patientBtn = screen.getByTestId("btnPatient");
    const doctorBtn = screen.getByTestId("btnDoctor");

    act(() => {
      fireEvent.click(superAdminBtn);
    });
    expect(
      helperText.innerHTML ==
        "Hello superadmin! Please fill out the form below to get started"
    ).toBeTruthy();

    act(() => {
      fireEvent.click(adminBtn);
    });
    expect(
      helperText.innerHTML ==
        "Hello admin! Please fill out the form below to get started"
    ).toBeTruthy();

    act(() => {
      fireEvent.click(doctorBtn);
    });
    expect(
      helperText.innerHTML ==
        "Hello doctor! Please fill out the form below to get started"
    ).toBeTruthy();

    act(() => {
      fireEvent.click(patientBtn);
    });
    expect(
      helperText.innerHTML ==
        "Hello patient! Please fill out the form below to get started"
    ).toBeTruthy();
  });

  it("should not login invalid users and display error message", async () => {
    setup();
    expect(screen.getByTestId("formHelper")).toBeInTheDocument();
    const email = screen.getByTestId("inputEmail");
    const pw = screen.getByTestId("inputPassword");

    fireEvent.change(email, { target: { value: "patient@gmail.com" } });
    expect(email.value).toBe("patient@gmail.com");

    fireEvent.change(pw, { target: { value: "ABCPassword123." } });
    expect(pw.value).toBe("ABCPassword123.");

    act(() => {
      fireEvent.click(screen.getByTestId("btnSubmit"));
    });
    await waitFor(() => {
      expect(screen.getByText(/Invalid Credentials/i)).toBeInTheDocument();
    });
  });

  it("should login valid users and redirect to correct page", async () => {
    setup();

    expect(screen.getByTestId("formHelper")).toBeInTheDocument();
    const email = screen.getByTestId("inputEmail");
    const pw = screen.getByTestId("inputPassword");

    fireEvent.change(email, { target: { value: "patient1@gmail.com" } });
    expect(email.value).toBe("patient1@gmail.com");

    fireEvent.change(pw, { target: { value: "ABCPassword123." } });
    expect(pw.value).toBe("ABCPassword123.");

    await waitFor(() => {
      act(() => {
        fireEvent.click(screen.getByTestId("btnSubmit"));
      });
    });

    cleanup();

    let testHistory, testLocation;
    let user = {
      fname: "ABC",
    };
    let login,
      logout = null;

    render(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/login"]}>
            <LoginPage />
            <Route
              path="*"
              render={({ history, location }) => {
                testHistory = history;
                testLocation = location;
                return null;
              }}
            ></Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );
    expect(testLocation.pathname).toBe("/");
  });
});
