import {React} from 'react';
import { BrowserRouter } from "react-router-dom";
import { fireEvent, waitFor, render, screen } from "@testing-library/react";
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

describe("Renders the correct navbar for an superadmin", () => {

  it("displays a logo on the navbar", () => {
    setup("SUPERADMIN");
    const logoOption = screen.getByText(/My Dashboard/i);

    expect(logoOption).toBeInTheDocument();
    await fireEvent.click(logoOption);
  });

  it("displays a my dashboard option on the navbar", async () => {
    setup("SUPERADMIN");
    const dashBoardOption = screen.getByText(/My Dashboard/i);
    
    expect(dashBoardOption).toBeInTheDocument();
    await fireEvent.click(dashBoardOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("SUPERADMIN");
    const contactOption = screen.getByText(/Contact Us/i);
    
    expect(contactOption).toBeInTheDocument();
    await fireEvent.click(contactOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("SUPERADMIN");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    await fireEvent.click(logoutOption);
  })

})

describe("Renders the correct navbar for an admin", () => {

  it("displays a logo on the navbar", () => {
    setup("ADMIN");
    const logoOption = screen.getByText(/My Dashboard/i);

    expect(logoOption).toBeInTheDocument();
    await fireEvent.click(logoOption);
  });

  it("displays a my dashboard option on the navbar", async () => {
    setup("ADMIN");
    const dashBoardOption = screen.getByText(/My Dashboard/i);
    
    expect(dashBoardOption).toBeInTheDocument();
    await fireEvent.click(dashBoardOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("ADMIN");
    const feedbackOption = screen.getByText(/Share Feedback/i);
    
    expect(feedbackOption).toBeInTheDocument();
    await fireEvent.click(feedbackOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("ADMIN");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    await fireEvent.click(logoutOption);
  })

})

describe("Renders the correct navbar for an doctor", () => {

  it("displays a logo on the navbar", () => {
    setup("DOCTOR");
    const logoOption = screen.getByText(/My Dashboard/i);

    expect(logoOption).toBeInTheDocument();
    await fireEvent.click(logoOption);
  });

  it("displays a my dashboard option on the navbar", async () => {
    setup("DOCTOR");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    await fireEvent.click(dashBoardOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("DOCTOR");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    await fireEvent.click(feedbackOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("DOCTOR");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    await fireEvent.click(logoutOption);
  })

})

describe("Renders the correct navbar for an patient", () => {

  it("displays a logo on the navbar", () => {
    setup("PATIENT");
    const logoOption = screen.getByText(/My Dashboard/i);

    expect(logoOption).toBeInTheDocument();
    await fireEvent.click(logoOption);

  });

  it("displays a my dashboard option on the navbar", async () => {
    setup("PATIENT");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    await fireEvent.click(dashBoardOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("PATIENT");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    await fireEvent.click(feedbackOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("PATIENT");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    await fireEvent.click(logoutOption);
  })

})

describe("Renders the correct navbar for a user who is not logged in", () => {

  it("displays a logo on the navbar", () => {
    setup("");
    const logoOption = screen.getByText(/My Dashboard/i);

    expect(logoOption).toBeInTheDocument();
    await fireEvent.click(logoOption);
  });

  it("displays a my dashboard option on the navbar", async () => {
    setup("");
    const homeOption = screen.getByText(/Home/i);

    expect(homeOption).toBeInTheDocument();
    await fireEvent.click(homeOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("");
    const aboutOption = screen.getByText(/About Us/i);

    expect(aboutOption).toBeInTheDocument();
    await fireEvent.click(aboutOption);
  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    await fireEvent.click(feedbackOption);

  })

  it("displays a my dashboard option on the navbar", async () => {
    setup("");
    const loginOption = screen.getByText(/Login/i);

    expect(loginOption).toBeInTheDocument();
    await fireEvent.click(loginOption);
  })

})