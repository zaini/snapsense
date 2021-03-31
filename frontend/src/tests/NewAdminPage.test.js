import { React } from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

import NewAdminPage from "../pages/My/NewAdminPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

const {
  CREATE_ADMIN,
  GET_ADMINS,
} = require("../components/Admin/NewAdminForm");
const { GET_HOSPITAL } = require("../pages/My/NewAdminPage");

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
          id: 1,
          name: "Hospital",
          contact_email: "hospital@gmail.com",
        },
      },
    },
  },
  {
    request: {
      query: GET_HOSPITAL,
      variables: {
        patient_id: "2",
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
  {
    request: {
      query: CREATE_ADMIN,
      variables: {
        fname: "Admin",
        lname: "One",
        email: "admin1@gmail.com",
        password: "Password123",
        hospital_id: "1",
      },
    },
    result: { data: { createAdmin: true } },
  },
];

//render component
const setup = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/hospitals/1/admins/new"]}>
          <Route path="/my/hospitals/:hospital_id/admins/new">
            <NewAdminPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("New admin page", () => {
  it("renders without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("shows loading spinner when opens", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("has a correct title", () => {
    setup();
    expect(screen.getByText("Create an Admin")).toBeInTheDocument();
  });

  it("has correct text placeholders", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId("adminNameInput")).toBeInTheDocument();
      expect(screen.getByTestId("adminLNameInput")).toBeInTheDocument();
      expect(screen.getByTestId("adminEmailInput")).toBeInTheDocument();
      expect(screen.getByTestId("adminPasswordInput")).toBeInTheDocument();
    });
  });

  it("has a submit button", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  //   it("shows warning text if hospital doesn't exist", async () => {
  //     act(() => {
  //       render(
  //         <MockedProvider mocks={mocks} addTypename={false}>
  //           <MemoryRouter initialEntries={["/my/hospitals/2/admins/new"]}>
  //             <Route path="/my/hospitals/:hospital_id/admins/new">
  //               <NewAdminPage />
  //             </Route>
  //           </MemoryRouter>
  //         </MockedProvider>
  //       );
  //     });
  
  //     expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  //     await waitFor(() => {
  //       expect(screen.getByText(/Hospital does not exist/i)).toBeInTheDocument();
  //     });
  //   });
});

// describe("Placeholders can have text written in it", () => {
//   it("name placeholder", () => {
//     setup();
//     const nameInput = screen.getByTestId("adminNameInput");

//     act(() => {
//       fireEvent.change(nameInput, { target: { value: "Admin" } });
//     });
//     expect(nameInput.value).toBe("Admin");
//   });

//   it("family name placeholder", () => {
//     setup();
//     const fnameInput = screen.getByTestId("adminLNameInput");

//     act(() => {
//       fireEvent.change(fnameInput, { target: { value: "One" } });
//     });
//     expect(fnameInput.value).toBe("One");
//   });

//   it("email placeholder", () => {
//     setup();
//     const emailInput = screen.getByTestId("adminEmailInput");

//     act(() => {
//       fireEvent.change(emailInput, { target: { value: "admin1@gmail.com" } });
//     });
//     expect(emailInput.value).toBe("admin1@gmail.com");
//   });

//   it("password placeholder", () => {
//     setup();
//     const passwordInput = screen.getByTestId("adminPasswordInput");

//     act(() => {
//       fireEvent.change(passwordInput, { target: { value: "Password123" } });
//     });
//     expect(passwordInput.value).toBe("Password123");
//   });
// });
