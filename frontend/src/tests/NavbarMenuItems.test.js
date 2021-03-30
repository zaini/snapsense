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
  test("if the correct logo on the navbar renders and is selectable", async () => {
    setup("SUPERADMIN");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  test("if a my dashboard option renders on the navbar and is selectable", async () => {
    setup("SUPERADMIN");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  test("if a contact us option renders on the navbar and is selectable", async () => {
    setup("SUPERADMIN");
    const contactOption = screen.getByText(/Contact Us/i);

    expect(contactOption).toBeInTheDocument();
    fireEvent.click(contactOption);
  });

  test("if a logout option renders on the navbar and is selectable", async () => {
    setup("SUPERADMIN");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("renders the correct logo on the navbar and is selectable", () => {
  test("if the correct logo on the navbar renders and is selectable", async () => {
    setup("ADMIN");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  test("if a my dashboard option renders on the navbar and is selectable", async () => {
    setup("ADMIN");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  test("if a feedback option renders on the navbar and is selectable", async () => {
    setup("ADMIN");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  test("if a logout option renders on the navbar and is selectable", async () => {
    setup("ADMIN");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("Renders the correct navbar for an doctor", () => {
  test("if the correct logo renders on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  test("if a my dashboard option renders on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  test("if a feedback option renders on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  test("if a logout option renders on the navbar and is selectable", async () => {
    setup("DOCTOR");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("Renders the correct navbar for an patient", () => {
  test("if the correct logo renders on the navbar and is selectable", async () => {
    setup("PATIENT");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  test("if a my dashboard option renders on the navbar and is selectable", async () => {
    setup("PATIENT");
    const dashBoardOption = screen.getByText(/My Dashboard/i);

    expect(dashBoardOption).toBeInTheDocument();
    fireEvent.click(dashBoardOption);
  });

  test("if a feedback option renders on the navbar and is selectable", async () => {
    setup("PATIENT");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  test("if a logout option renders on the navbar and is selectable", async () => {
    setup("PATIENT");
    const logoutOption = screen.getByText(/Logout/i);

    expect(logoutOption).toBeInTheDocument();
    fireEvent.click(logoutOption);
  });
});

describe("Renders the correct navbar for a user who is not logged in", () => {
  test("if the correct logo renders on the navbar and is selectable", async () => {
    setup("");
    const logoOption = screen.getByTestId(/navLogo/i);

    expect(logoOption).toBeInTheDocument();
    fireEvent.click(logoOption);
  });

  test("if a home option renders on the navbar and is selectable", async () => {
    setup("");
    const homeOption = screen.getByText(/Home/i);

    expect(homeOption).toBeInTheDocument();
    fireEvent.click(homeOption);
  });

  test("if an about option renders on the navbar and is selectable", async () => {
    setup("");
    const aboutOption = screen.getByText(/About Us/i);

    expect(aboutOption).toBeInTheDocument();
    fireEvent.click(aboutOption);
  });

  test("if a feedback option renders on the navbar and is selectable", async () => {
    setup("");
    const feedbackOption = screen.getByText(/Share Feedback/i);

    expect(feedbackOption).toBeInTheDocument();
    fireEvent.click(feedbackOption);
  });

  test("if a login option renders on the navbar and is selectable", async () => {
    setup("");
    const loginOption = screen.getByText(/Login/i);

    expect(loginOption).toBeInTheDocument();
    fireEvent.click(loginOption);
  });
});
