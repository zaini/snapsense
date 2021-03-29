import {React} from 'react';
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import MainNavbar from '../components/utils/MainNavbar';
import { AuthContext } from "../context/auth";
import { Route } from "react-router";
import { act } from "react-dom/test-utils";

const setup = (userType) => {
  act(() => {
    render(
      <AuthContext.Provider value={{
        user: {accountType: userType}
      }}>
        <BrowserRouter>
          <Route path="/">
              <MainNavbar />
          </Route>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  });
}

describe("Renders the correct navbar for an admin", () => {

  it("displays a logo on the navbar", () => {
    setup("ADMIN");
    expect(screen.getByTestId(/navLogo/i)).toBeInTheDocument();
  });

  it("displays a my dashboard option on the navbar", () => {
    setup("ADMIN");
    expect(screen.getByText(/My Dashboard/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("ADMIN");
    expect(screen.getByText(/Share Feedback/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("ADMIN");
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  })

})

describe("Renders the correct navbar for an doctor", () => {

  it("displays a logo on the navbar", () => {
    setup("DOCTOR");
    expect(screen.getByTestId(/navLogo/i)).toBeInTheDocument();
  });

  it("displays a my dashboard option on the navbar", () => {
    setup("DOCTOR");
    expect(screen.getByText(/My Dashboard/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("DOCTOR");
    expect(screen.getByText(/Share Feedback/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("DOCTOR");
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  })

})

describe("Renders the correct navbar for an patient", () => {

  it("displays a logo on the navbar", () => {
    setup("PATIENT");
    expect(screen.getByTestId(/navLogo/i)).toBeInTheDocument();
  });

  it("displays a my dashboard option on the navbar", () => {
    setup("PATIENT");
    expect(screen.getByText(/My Dashboard/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("PATIENT");
    expect(screen.getByText(/Share Feedback/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("PATIENT");
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  })

})

describe("Renders the correct navbar for a user who is not logged in", () => {

  it("displays a logo on the navbar", () => {
    setup("");
    expect(screen.getByTestId(/navLogo/i)).toBeInTheDocument();
  });

  it("displays a my dashboard option on the navbar", () => {
    setup("");
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("");
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("PATIENT");
    expect(screen.getByText(/Share Feedback/i)).toBeInTheDocument();
  })

  it("displays a my dashboard option on the navbar", () => {
    setup("");
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  })

})