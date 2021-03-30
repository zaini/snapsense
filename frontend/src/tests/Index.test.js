import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { BrowserRouter } from "react-router-dom";
import { MemoryRouter, Route } from "react-router";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import { AuthContext } from "../context/auth";

const login = (userData) => {};

const logout = () => {};

const patient = {
  id: 1,
  fname: "Patient",
  lname: "One",
  email: "patient1@gmail.com",
  flag: 2,
  accountType: "PATIENT",
};

const doctor = {
  id: 1,
  fname: "Doctor",
  lname: "One",
  email: "doctor1@nhs.net",
  hospital_id: 1,
  accountType: "DOCTOR",
};

const admin = {
  id: 1,
  fname: "Admin",
  lname: "One",
  email: "admin1@gmail.com",
  hospital_id: 1,
  accountType: "ADMIN",
};

const superadmin = {
  id: 1,
  name: "Snapsense",
  email: "snapsense@gmail.com",
  accountType: "SUPERADMIN",
};

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

describe("visit routes without being logged in", () => {
  let user = null;

  test("home page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
  });

  test("about us page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/about" }
    );
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
  });

  test("feedback page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/feedback" }
    );
    expect(
      screen.getByText("How would you rate your experience with SnapSense?")
    ).toBeInTheDocument();
  });

  test("login page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/login" }
    );
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("logout page route", async () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
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
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my" }
    );
    // Redirected to login page
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("show invite page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/invites/show/:token_id" }
    );
    expect(screen.getByText("You have an invite!")).toBeInTheDocument();
  });

  test("show error page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/error" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my profile page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/profile" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit new invites page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/invites/new" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit my doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit my feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit specific feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback/show/1" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit hospitals page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit patients page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit admins page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit new hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/new" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit new admin for hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/1/admins/new" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit specific hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/show/1" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit specific admin page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins/show/1" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("visit specific patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/show/1" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("view requests for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("create new request for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/:patient_id/requests/new" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("view patients pending requests", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/requests" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("view all submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("view review submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/review" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("view create new submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/new" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });

  test("view specific submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/show/1" }
    );
    // Redirect to login
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
  });
});

describe("visit routes while logged in as patient", () => {
  let user = patient;

  test("home page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("about us page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/about" }
    );
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("feedback page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/feedback" }
    );
    expect(
      screen.getByText("How would you rate your experience with SnapSense?")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("login page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/login" }
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("my page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my" }
    );
    expect(screen.getByText("Create New Submission Now")).toBeInTheDocument();
  });

  test("show invite page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/invites/show/1" }
    );
    expect(screen.getByText("You have an invite!")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("show error page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/error" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my profile page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/profile" }
    );
    expect(screen.getByTestId("profile-header")).toBeInTheDocument();
    expect(screen.getByTestId("profile-first-name").value).toBe(user.fname);
    expect(screen.getByTestId("profile-last-name").value).toBe(user.lname);
  });

  test("visit new invites page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/invites/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByTestId("doctors-header")).toBeInTheDocument();
  });

  test("visit my feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit hospitals page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit patients page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit admins page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByTestId("doctors-header")).toBeInTheDocument();
  });

  test("visit new hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit new admin for hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/1/admins/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific admin page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view requests for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("create new request for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view patients pending requests", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/requests" }
    );
    expect(screen.getByText("My Requests")).toBeInTheDocument();
  });

  test("view all submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions" }
    );
    expect(screen.getByTestId("submissions-header")).toBeInTheDocument();
  });

  test("view review submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/review" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view create new submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/new" }
    );
    expect(
      screen.getByText(
        "Open the tabs to add your images or questionnaire or both!"
      )
    ).toBeInTheDocument();
  });

  test("view specific submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/show/1" }
    );
    expect(screen.getByText("View Submission")).toBeInTheDocument();
  });
});

describe("visit routes while logged in as doctor", () => {
  let user = doctor;

  test("home page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("about us page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/about" }
    );
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("feedback page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/feedback" }
    );
    expect(
      screen.getByText("How would you rate your experience with SnapSense?")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("login page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/login" }
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("my page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my" }
    );
    expect(screen.getByText("My Home")).toBeInTheDocument();
  });

  test("show invite page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/invites/show/1" }
    );
    expect(screen.getByText("You have an invite!")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("show error page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/error" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my profile page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/profile" }
    );
    expect(screen.getByTestId("profile-header")).toBeInTheDocument();
    expect(screen.getByTestId("profile-first-name").value).toBe(user.fname);
    expect(screen.getByTestId("profile-last-name").value).toBe(user.lname);
  });

  test("visit new invites page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/invites/new" }
    );
    expect(screen.getByText("Create Invitation")).toBeInTheDocument();
  });

  test("visit my doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit hospitals page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit patients page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients" }
    );
    expect(screen.getByText("My Patients")).toBeInTheDocument();
  });

  test("visit admins page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit new hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit new admin for hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/1/admins/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific admin page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/show/1" }
    );
    expect(screen.getByTestId("patient-profile")).toBeInTheDocument();
  });

  test("view requests for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <Route path="/my/patients/:patient_id/requests">
            <App />
          </Route>
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests" }
    );
    expect(screen.getByText("My Requests")).toBeInTheDocument();
  });

  test("create new request for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests/new" }
    );
    expect(screen.getByText("Submission Request")).toBeInTheDocument();
  });

  test("view patients pending requests", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/requests" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view all submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions" }
    );
    expect(screen.getByTestId("submissions-header")).toBeInTheDocument();
  });

  test("view review submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/review" }
    );
    expect(screen.getByText("Review Patient Submissions")).toBeInTheDocument();
  });

  test("view create new submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view specific submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/show/1" }
    );
    expect(screen.getByText("View Submission")).toBeInTheDocument();
  });
});

describe("visit routes while logged in as an admin", () => {
  let user = admin;

  test("home page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("about us page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/about" }
    );
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("feedback page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/feedback" }
    );
    expect(
      screen.getByText("How would you rate your experience with SnapSense?")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("login page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/login" }
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("my page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("show invite page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/invites/show/1" }
    );
    expect(screen.getByText("You have an invite!")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("show error page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/error" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my profile page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/profile" }
    );
    expect(screen.getByTestId("profile-header")).toBeInTheDocument();
    expect(screen.getByTestId("profile-first-name").value).toBe(user.fname);
    expect(screen.getByTestId("profile-last-name").value).toBe(user.lname);
  });

  test("visit new invites page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/invites/new" }
    );
    expect(screen.getByText("Create Invitation")).toBeInTheDocument();
  });

  test("visit my doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByText("My Doctors")).toBeInTheDocument();
  });

  test("visit my feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit hospitals page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit patients page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit admins page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByText("My Doctors")).toBeInTheDocument();
  });

  test("visit new hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit new admin for hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/1/admins/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific admin page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit specific patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view requests for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <Route path="/my/patients/:patient_id/requests">
            <App />
          </Route>
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("create new request for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view patients pending requests", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/requests" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view all submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view review submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/review" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view create new submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view specific submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });
});

describe("visit routes while logged in as a superadmin", () => {
  let user = superadmin;

  test("home page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("about us page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/about" }
    );
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("feedback page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/feedback" }
    );
    expect(
      screen.getByText("How would you rate your experience with SnapSense?")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("login page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/login" }
    );
    expect(
      screen.getByText("Snapsense, welcomes you to the future")
    ).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("my page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("show invite page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/invites/show/1" }
    );
    expect(screen.getByText("You have an invite!")).toBeInTheDocument();
    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
  });

  test("show error page route", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/error" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my profile page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/profile" }
    );
    expect(screen.getByTestId("profile-header")).toBeInTheDocument();
    expect(screen.getByTestId("profile-name").value).toBe(user.name);
  });

  test("visit new invites page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/invites/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit my feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback" }
    );
    expect(screen.getByText("All Feedback")).toBeInTheDocument();
  });

  test("visit specific feedback page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/feedback/show/1" }
    );
    expect(screen.getByTestId("view-feedback-page")).toBeInTheDocument();
  });

  test("visit hospitals page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals" }
    );
    expect(screen.getByTestId("hospitals-page")).toBeInTheDocument();
  });

  test("visit patients page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit admins page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins" }
    );
    expect(screen.getByTestId("admins-page")).toBeInTheDocument();
  });

  test("visit doctors page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/doctors" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("visit new hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/new" }
    );
    expect(screen.getByText("Create a Hospital")).toBeInTheDocument();
  });

  test("visit new admin for hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/1/admins/new" }
    );
    expect(screen.getByText("Create an Admin")).toBeInTheDocument();
  });

  test("visit specific hospital page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/hospitals/show/1" }
    );
    expect(screen.getByTestId("hospital-page")).toBeInTheDocument();
  });

  test("visit specific admin page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/admins/show/1" }
    );
    expect(screen.getByTestId("admin-profile")).toBeInTheDocument();
  });

  test("visit specific patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view requests for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <Route path="/my/patients/:patient_id/requests">
            <App />
          </Route>
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("create new request for patient page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/patients/1/requests/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view patients pending requests", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/requests" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view all submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view review submissions page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/review" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view create new submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/new" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });

  test("view specific submission page", () => {
    renderWithRouter(
      <AuthContext.Provider value={{ user, login, logout }}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </AuthContext.Provider>,
      { route: "/my/submissions/show/1" }
    );
    expect(screen.getByText("An Error Occured!")).toBeInTheDocument();
  });
});
