//page doesnt crash
//elements render - heading for correct name/fname; ID hospital name email; create admin button,n delete button
//clicking buttons leadas to correct url / opens up correct modal
//elements display correct info
//invalid hospital gives error message

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
import HospitalPage from "../pages/My/HospitalPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

const { GET_HOSPITAL } = require("../pages/My/HospitalPage");

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
          id: "1",
          name: "Hospital One",
          contact_email: "hospital.one@gmail.com",
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
];

//Render component
const setup = () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/hospitals/show/1"]}>
          <Route path="/my/hospitals/show/:hospital_id">
            <HospitalPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("Specific hospital page", () => {
  it("renders without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("renders details component", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("hospitalDetailContainer")).toBeInTheDocument();
    });
  });

  it("loads spinner when opening a new page", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("has correct header", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText(/Hospital One/i)).toBeInTheDocument();
    });
  });

  it("has text holders", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("hospitaIDHolder")).toBeInTheDocument();
      expect(screen.getByTestId("hospitalNameHolder")).toBeInTheDocument();
      expect(screen.getByTestId("hospitalEmailHolder")).toBeInTheDocument();
    });
  });

  it("has delete hospital button", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("deleteHospitalButton")).toBeInTheDocument();
    });
  });

  it("has create admin for this hospital button", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("createAdminButton")).toBeInTheDocument();
    });
  });

  it("shows error message for invalid hospital", () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/hospitals/show/2"]}>
            <Route path="/my/hospitals/show/:hospital_id">
              <HospitalPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  });
});

test("Text holders have correct info displayed", async () => {
  setup();
  await waitFor(() => {
    expect(screen.getByTestId("hospitaIDHolder")).toBeInTheDocument();
    expect(screen.getByTestId("hospitalNameHolder")).toBeInTheDocument();
    expect(screen.getByTestId("hospitalEmailHolder")).toBeInTheDocument();

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Hospital One")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("hospital.one@gmail.com")
    ).toBeInTheDocument();
  });
});

describe("Buttons", () => {
  it("create admin button leads to a correct url on click", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const createLink = screen.getByTestId("createAdminButton");
      expect(createLink).toBeInTheDocument();
      expect(createLink).toHaveAttribute("href", "/my/hospitals/1/admins/new");
    });
  });

  it("delete hospital button opens a modal on click", async () => {
    setup();
    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByTestId("deleteHospitalButton"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      expect(screen.getByTestId("deleteModal")).toBeInTheDocument();
    });
  });

  it("should be able to submit delete form", async () => {
    setup();
    await waitFor(() => {
      act(() => {
        fireEvent(
          screen.getByTestId("deleteHospitalButton"),
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
});
