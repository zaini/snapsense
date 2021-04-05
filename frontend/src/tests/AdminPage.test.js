import { React } from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import AdminPage from "../pages/My/AdminPage";
import { Route, MemoryRouter } from "react-router";

import mocks from "./mocks/adminPageMocks";

afterEach(cleanup);

//Render component
const setup = () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/admins/show/1"]}>
          <Route path="/my/admins/show/:admin_id">
            <AdminPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("Specific admin page", () => {
  it("renders without crashing", async () => {
    expect(setup).toBeTruthy();
  });

  it("loads spinner when opening a new page", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  it("renders details component", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("adminDetailContainer")).toBeInTheDocument();
    });
  });

  it("has correct header", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText(/Admin's Profile/i)).toBeInTheDocument();
    });
  });

  it("has information holders for admin's details", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("adminIDHolder")).toBeInTheDocument();
      expect(screen.getByTestId("adminFNameHolder")).toBeInTheDocument();
      expect(screen.getByTestId("adminLNameHolder")).toBeInTheDocument();
      expect(screen.getByTestId("hospitalNameHolder")).toBeInTheDocument();
      expect(screen.getByTestId("hospitalEmailHolder")).toBeInTheDocument();
    });
  });

  it("has delete admin button", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("deleteButton")).toBeInTheDocument();
    });
  });

  it("shows error message for invalid admin", () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/admins/show/2"]}>
            <Route path="/my/admins/show/:admin_id">
              <AdminPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  });

  it("has correct details displayed in information holders", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("adminIDHolder")).toBeInTheDocument();
      expect(screen.getByTestId("adminFNameHolder")).toBeInTheDocument();
      expect(screen.getByTestId("adminLNameHolder")).toBeInTheDocument();
      expect(screen.getByTestId("hospitalNameHolder")).toBeInTheDocument();
      expect(screen.getByTestId("hospitalEmailHolder")).toBeInTheDocument();

      expect(screen.getByDisplayValue("1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Admin")).toBeInTheDocument();
      expect(screen.getByDisplayValue("One")).toBeInTheDocument();
      expect(screen.getByDisplayValue("admin1@gmail.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Hospital")).toBeInTheDocument();
    });
  });
});

describe("Delete modal", () => {
  it("should get opened when the delete button is clicked", async () => {
    setup();
    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByTestId("deleteButton"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      expect(screen.getByTestId("deleteModal")).toBeInTheDocument();
    });
  });

  it("should have correct text", async () => {
    setup();
    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByTestId("deleteButton"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      expect(
        screen.getByText(
          "Are you sure you want to delete this admin? There is no going back..."
        )
      ).toBeInTheDocument();
    });
  });

  it("should submit delete form when inner delete button is clicked", async () => {
    setup();
    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByTestId("deleteButton"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      const btnSubmit = screen.getByTestId("modalSubmitButton");

      jest.spyOn(window, "alert").mockImplementation(() => {});
      act(() => {
        fireEvent.click(btnSubmit);
      });
    });
  });

  it("Has close button", async () => {
    setup();
    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByTestId("deleteButton"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      expect(screen.getByTestId("cancelButton")).toBeInTheDocument();
    });
  });
});
