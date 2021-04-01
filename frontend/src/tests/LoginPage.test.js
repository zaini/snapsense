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

import LoginPage from "../pages/Home/LoginPage.js";
import { LOGIN_USER, LoginForm } from "../components/Login/LoginForm";

afterEach(cleanup);

const fakeAdmin = { email: "admin@gmail.com", password: "Password123" };
const fakeSuperAdmin = {
  email: "superadmin@gmail.com",
  password: "Password123",
};
const fakePatient = { email: "patient@gmail.com", password: "Password123" };
const fakeDoctor = { email: "doctor@gmail.com", password: "Password123" };

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
        email: "patient1@gmail.com",
        password: "Password123",
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
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/login"]}>
          <Route path="/login">
            <LoginPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("LoginPage", () => {
  it("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  // it('should have radio buttons', () => {

  //   screen.debug();
  // });

  it("should have email and password form", () => {
    setup();
    expect(screen.getByText(/Choose Account Type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("email-test")).toBeInTheDocument();
    expect(screen.getByTestId("password-test")).toBeInTheDocument();
  });

  // it('should have login button', () => {
  //   screen.debug();
  // });
  // });

  // describe('Radio buttons', () => {
  //   it('should change user type', () => {
  //     screen.debug();
  //   });
  // });

  // describe('Login', () => {
  //   describe('with valid input', () => {
  //     it('calls on the submit event', async () => {
  //       screen.debug();
  //     })

  //   });

  // describe('with invalid email', () => {
  //   it('renders invalid credentials error', async () => {
  //     screen.debug();
  //   });
  // });
  // describe('with invalid password', () => {
  //   it('renders invalid credentials error', async () => {
  //     screen.debug();
  //   });
  // });
});
