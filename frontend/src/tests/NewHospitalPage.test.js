import { React } from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
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
const component = async () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/my/hospitals/new"]}>
          <Route path="/my/hospitals/new">
            <NewHospitalForm />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
  });
};

describe("New Hospital page", () => {
  it("renders without crashing", () => {
    expect(component).toBeTruthy();
    screen.debug();
  });

  it("has a header", () => {
    expect(screen.getByText("Create a Hospital")).toBeInTheDocument();
    screen.debug();
  });

  it("contains a name textholder", () => {
    const newForm = component.findByTestId("name-form");
    expect(newForm).toBeTruthy();
  });

  it("contains an email textholder", () => {
    const newForm = component.findByTestId("email-form");
    expect(newForm).toBeTruthy();
  });

  it("has a submit button", () => {
    const submit_button = component.findByRole("button");
    expect(submit_button).toBeTruthy();
  });
});

it("shows loading spinner when opening the page", async () => {
    component();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

describe("Pressing submit button", () => {
    describe("With invalid input", () => {
        it("pops up a name warning", () => {});
        it("pops up an email warning", () => {});
    });
    describe("With valid input", () => {
        it("pops up a success message", () => {});
    });
});