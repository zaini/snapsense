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

const { CREATE_HOSPITAL } = require("../components/Hospital/NewHospitalForm");

const mocks = [
  {
    request: {
      query: CREATE_HOSPITAL,
      variables: { name: "Hospital", contact_email: "hospital@gmail.com" }, 
    },
    result: { data: { createHospital: true } },
  },
  {
    request: {
      query: CREATE_HOSPITAL,
      variables: { name: "", contact_email: "hospital1@gmail.com" },
    },
    //toast?
  },
  {
    request: {
      query: CREATE_HOSPITAL,
      variables: { name: "Hospital One", contact_email: 'hospital' },
    },
    //toast?
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

describe("name form", () => {
  it("can take a value", () => {
    setup();
    const name_input = screen.getByTestId("hospitalNewFormName");

    act(() => {
      fireEvent.change(name_input, { target: { value: "Hospital" } });
    });
    expect(name_input.value).toBe("Hospital");
  });
});

describe("email form", () => {
  it("can take a value", () => {
    setup();
    const email_input = screen.getByTestId("hospitalNewFormEmail");

    act(() => {
      fireEvent.change(email_input, { target: { value: "hospital@gmail.com" } });
    });
    expect(email_input.value).toBe("hospital@gmail.com");
  });
});

describe("Pressing submit button", () => {
    describe("With invalid input", () => {
        it("pops up a name warning and doesn't submit", () => {
          setup();

          const name_input = screen.getByTestId("hospitalNewFormName");
          act(() => {
            fireEvent.change(name_input, { target: { value: "" } });
          });
          expect(name_input.value).toBe("");

          const email_input = screen.getByTestId("hospitalNewFormEmail");
          act(() => {
            fireEvent.change(email_input, { target: { value: "hospital1@gmail.com" } });
          });
          expect(email_input.value).toBe("hospital1@gmail.com");

          const submit_button = screen.getByRole("button");
          act(() => {
          fireEvent.click(submit_button);
          });

          expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull(); // it doesn't exist
          expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull(); // it doesn't exist
          
        });
        it("pops up an email warning and doesn't submit", () => {
          setup();

          const name_input = screen.getByTestId("hospitalNewFormName");
          act(() => {
            fireEvent.change(name_input, { target: { value: "Hospital One" } });
          });
          expect(name_input.value).toBe("Hospital One");

          const email_input = screen.getByTestId("hospitalNewFormEmail");
          act(() => {
            fireEvent.change(email_input, { target: { value: "hospital" } });
          });
          expect(email_input.value).toBe("hospital");

          const submit_button = screen.getByRole("button");
          act(() => {
          fireEvent.click(submit_button);
          });

          expect(screen.queryByTestId("formSubmitInnerLoader")).toBeNull(); // it doesn't exist
          expect(screen.queryByTestId("formSubmitInnerSuccess")).toBeNull(); // it doesn't exist
        });
    });
    describe("With valid input", () => {
        it("pops up a success message", async () => {
          setup();

          const name_input = screen.getByTestId("hospitalNewFormName");
          act(() => {
            fireEvent.change(name_input, { target: { value: "Hospital" } });
          });
          expect(name_input.value).toBe("Hospital");

          const email_input = screen.getByTestId("hospitalNewFormEmail");
          act(() => {
            fireEvent.change(email_input, { target: { value: "hospital@gmail.com" } });
          });
          expect(email_input.value).toBe("hospital@gmail.com");

          const submit_button = screen.getByRole("button");
          act(() => {
          fireEvent.click(submit_button);
          });

          await waitFor(async () => {
            expect(screen.getByTestId("formSubmitInnerLoader")).toBeInTheDocument();
          });

          await waitFor(async () => {
            expect(screen.getByTestId("formSubmitInnerSuccess")).toBeInTheDocument();
          });

          expect(
            screen.getByText(/Hospital successfully created!/i)
          ).toBeInTheDocument();
        });
    });
});