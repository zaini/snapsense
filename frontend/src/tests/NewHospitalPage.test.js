import { React } from "react";
import { fireEvent, render, screen, cleanup,act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  CREATE_HOSPITAL,
  NewHospitalForm,
} from "../components/Hospital/NewHospitalForm";
import NewHospitalPage from "../pages/My/NewHospitalPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: CREATE_HOSPITAL,
    },
  },
];

//Render component
const setup = () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/hospitals/new"]}>
          <Route path="/my/hospitals/new">
            <NewHospitalPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("New Hospital page", () => {
  
  it("renders without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("has a header", () => {
    setup();
    expect(screen.getByTestId("hospitalNewHeading")).toBeInTheDocument();
  });

  it("contains a new text input", () => {
    setup();
    expect(screen.getByTestId("hospitalNewFormName")).toBeInTheDocument();
  });

  it("contains an email text input", () => {
    setup();
    expect(screen.getByTestId("hospitalNewFormEmail")).toBeInTheDocument();
  });

  it("has a submit button", () => {
    setup();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

// it("shows loading spinner when opening the page", async () => {
//     component();
//     expect(screen.getByText(/Loading/i)).toBeInTheDocument();
// });

// describe("Pressing submit button", () => {
//     describe("With invalid input", () => {
//         it("pops up a name warning", () => {});
//         it("pops up an email warning", () => {});
//     });
//     describe("With valid input", () => {
//         it("pops up a success message", () => {});
//     });
// });