import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import MainNavbar from "../components/utils/MainNavbar";
import { AuthContext } from "../context/auth";
import { Route } from "react-router";
import { act } from "react-dom/test-utils";

const setup = (userType) => {
  act(() => {
    render(
      <AuthContext.Provider
        value={{
          user: { accountType: userType },
        }}
      >
        <BrowserRouter>
          <Route path="/">
            <MainNavbar />
          </Route>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  });
};

describe("Renders the correct navbar for a superadmin", () => {
  it("renders the correct logo on the navbar and is selectable", async () => {
    setup("SUPERADMIN");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  it("renders a my dashboard option on the navbar and is selectable", async () => {
    setup("SUPERADMIN");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  it("renders a contact us option on the navbar and is selectable", async () => {
    setup("SUPERADMIN");
    const contactOption = screen.getByText(/Contact Us/i);

    expect(contactOption).toBeInTheDocument();
    fireEvent.click(contactOption);
  });

  it("renders a logout option on the navbar and is selectable", async () => {
    setup("SUPERADMIN");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("renders the correct logo on the navbar and is selectable", () => {
  it("displays a logo on the navbar", async () => {
    setup("ADMIN");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  it("renders a my dashboard option on the navbar and is selectable", async () => {
    setup("ADMIN");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  it("renders a feedback option on the navbar and is selectable", async () => {
    setup("ADMIN");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  it("renders a logout option on the navbar and is selectable", async () => {
    setup("ADMIN");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("Renders the correct navbar for an doctor", () => {
  it("renders the correct logo on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  it("renders a my dashboard option on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  it("renders a feedback option on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  it("renders a logout option on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("Renders the correct navbar for an patient", () => {
  it("renders the correct logo on the navbar and is selectable", async () => {
    setup("PATIENT");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  it("renders a my dashboard option on the navbar and is selectable", async () => {
    setup("PATIENT");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  it("renders a feedback option on the navbar and is selectable", async () => {
    setup("PATIENT");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  it("renders a logout option on the navbar and is selectable", async () => {
    setup("PATIENT");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("Renders the correct navbar for a user who is not logged in", () => {
  it("renders the correct logo on the navbar and is selectable", async () => {
    setup("");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  it("renders a home option on the navbar and is selectable", async () => {
    setup("");
    const homeOption = screen.getByText(/Home/i);

    expect(homeOption).toBeInTheDocument();
    fireEvent.click(homeOption);
  });

  it("renders an about option on the navbar and is selectable", async () => {
    setup("");
    const aboutOption = screen.getByText(/About Us/i);

    expect(aboutOption).toBeInTheDocument();
    fireEvent.click(aboutOption);
  });

  it("renders a feedback option on the navbar and is selectable", async () => {
    setup("");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  it("renders a login option on the navbar and is selectable", async () => {
    setup("");
    const loginOption = screen.getByText(/Login/i);

    expect(loginOption).toBeInTheDocument();
    fireEvent.click(loginOption);
  });
});
