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
import NewHospitalPage from "../pages/My/NewHospitalPage";
import { Route, MemoryRouter } from "react-router";

afterEach(cleanup);

import mocks from "./mocks/newHospitalpageMocks";

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
  it("should render without crashing", () => {
    expect(setup).toBeTruthy();
  });

  it("has a correct header", () => {
    setup();
    expect(screen.getByTestId("hospitalNewHeading")).toBeInTheDocument();
  });

  it("contains a name placeholder", () => {
    setup();
    expect(screen.getByTestId("hospitalNewFormName")).toBeInTheDocument();
  });

  it("contains an email placeholder", () => {
    setup();
    expect(screen.getByTestId("hospitalNewFormEmail")).toBeInTheDocument();
  });

  it("has a submit button", () => {
    setup();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Placeholder for name", () => {
  it("can have text written in it", () => {
    setup();
    const nameInput = screen.getByTestId("hospitalNewFormName");

    act(() => {
      fireEvent.change(nameInput, { target: { value: "Hospital" } });
    });
    expect(nameInput.value).toBe("Hospital");
  });
});

describe("Placeholder for email", () => {
  it("can have text written in it", () => {
    setup();
    const emailInput = screen.getByTestId("hospitalNewFormEmail");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "hospital@gmail.com" },
      });
    });
    expect(emailInput.value).toBe("hospital@gmail.com");
  });
});

//gql testing
describe("Submitting form with invalid input", () => {
  it("pops up a name warning and doesn't submit when the name is invalid", async () => {
    setup();

    const nameInput = screen.getByTestId("hospitalNewFormName");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "invalidName" } });
    });
    expect(nameInput.value).toBe("invalidName");

    const emailInput = screen.getByTestId("hospitalNewFormEmail");
    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "hospital1@gmail.com" },
      });
    });
    expect(emailInput.value).toBe("hospital1@gmail.com");

    const submitButton = screen.getByRole("button");
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull();
      expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull();
    });
  });

  it("pops up an email warning and doesn't submit when the email is invalid", async () => {
    setup();

    const nameInput = screen.getByTestId("hospitalNewFormName");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "Hospital One" } });
    });
    expect(nameInput.value).toBe("Hospital One");

    const emailInput = screen.getByTestId("hospitalNewFormEmail");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
    });
    expect(emailInput.value).toBe("invalidEmail");

    const submitButton = screen.getByRole("button");
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull();
      expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull();
    });
  });
});

describe("Submitting form with valid input", () => {
  it("pops up a success message", async () => {
    setup();

    const nameInput = screen.getByTestId("hospitalNewFormName");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "Hospital" } });
    });
    expect(nameInput.value).toBe("Hospital");

    const emailInput = screen.getByTestId("hospitalNewFormEmail");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "hospital@gmail.com" } });
    });
    expect(emailInput.value).toBe("hospital@gmail.com");

    const submitBtn = screen.getByTestId("submitButton");
    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByTestId("formSubmitInnerLoader")).toBeInTheDocument();
    });
  });
});
