import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import ApolloProvider from "../ApolloProvider";
import { AuthContext } from "../context/auth";

describe("visit routes without being logged in", () => {
  test("home page route", () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
  });

  test("about us page route", () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>,
      { route: "/about" }
    );
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
  });

  test("feedback page route", () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>,
      { route: "/feedback" }
    );
    expect(
      screen.getByText("How would you rate your experience with SnapSense?")
    ).toBeInTheDocument();
  });

  test("login page route", () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>,
      { route: "/login" }
    );
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("logout page route", async () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>,
      { route: "/logout" }
    );
    // You are being logged out
    expect(screen.getByText("Logging you out...")).toBeInTheDocument();
    // Wait to be redirected home
    await waitFor(() =>
      screen.getByText("Snapsense, welcomes you to the future")
    );
  });

  test("my page route", () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>,
      { route: "/my" }
    );
    // Redirected to login page
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("show invite page route", () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>,
      { route: "/invites/show/:token_id" }
    );
    expect(screen.getByText("You have an invite!")).toBeInTheDocument();
  });

  test("show error page route", () => {
    renderWithRouter(
      <AuthContext.Provider>
        <ApolloProvider />
      </AuthContext.Provider>,
      { route: "/error" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });
});

// describe("visit routes logged in as patient", () => {
//   test("my page route logged in as patient", () => {
//     renderWithRouter(
//       <AuthContext.Provider value={{ user: patient }}>
//         <ApolloProvider />
//       </AuthContext.Provider>,
//       { route: "/my" }
//     );
//     expect(screen.getByText("request(s) to fulfil.")).toBeInTheDocument();
//   });
// });

const patient = {
  id: 1,
  fname: "Patient",
  lname: "One",
  email: "patient1@gmail.com",
  flag: 2,
  createdAt: "2021-03-23T17:32:37.000Z",
  updatedAt: "2021-03-29T10:51:36.000Z",
  accountType: "PATIENT",
};

const doc = {
  id: 1,
  fname: "Doctor",
  lname: "One",
  email: "doctor1@nhs.net",
  hospital_id: 1,
  createdAt: "2021-03-25T17:42:58.000Z",
  updatedAt: "2021-03-25T17:42:58.000Z",
  accountType: "DOCTOR",
};

const admin = {
  id: 1,
  fname: "Doctor",
  lname: "One",
  email: "doctor1@nhs.net",
  hospital_id: 1,
  createdAt: "2021-03-25T17:42:58.000Z",
  updatedAt: "2021-03-25T17:42:58.000Z",
  accountType: "DOCTOR",
};

const superadmin = {
  id: 1,
  fname: "Doctor",
  lname: "One",
  email: "doctor1@nhs.net",
  hospital_id: 1,
  createdAt: "2021-03-25T17:42:58.000Z",
  updatedAt: "2021-03-25T17:42:58.000Z",
  accountType: "DOCTOR",
};

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};
