import { React } from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

import { Route, MemoryRouter } from "react-router";

jest.mock("../components/utils/Table", () => (params) => {
  return <div data-testid="renderedTable">{JSON.stringify(params)}</div>;
});

import HospitalsPage from "../pages/My/HospitalsPage";

afterEach(cleanup);

const {
    GET_HOSPITALS,
  } = require("../pages/My/HospitalsPage");

  const mocks = [
    {
      request: {
        query: GET_HOSPITALS,
        variables: {},
      },
      result: {
        data: {
          getHospitals: [
            {
              id: "1",
              name: "Hospital One",
              contact_email: "hospital.one@hospitals.uk",
            },
            {
              id: "2",
              name: "Hospital Two",
              contact_email: "hospital.two@hospitals.uk",
            },
          ],
        },
      },
    },
  ];

//Render component
const setup = () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/my/hospitals"]}>
            <Route path="/my/hospitals">
              <HospitalsPage />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  };

describe("Hospitals table page", () => {
    it("doesn't crash", async () => {
        expect(setup).toBeTruthy();
    });

    it("shows loading spinner on page load", async () => {
        setup();
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
      });

    it("has correct title", async () => {
        setup();
        expect(screen.getByText(/Hospitals/i)).toBeInTheDocument();
    });

    it("renders table correctly", async () => {
        setup();
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
        });
      });
    });

describe("Table component", () => {
    it("displays correct number of rows and columns", async () => {
        setup();
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
        });

        const container = screen.getByTestId("renderedTable");
        const data = JSON.parse(container.innerHTML);

        expect(data.data.length).toEqual(2);
        expect(data.cols.length).toEqual(4);
      });

      it("displays correct column headers", async () => {
        setup();
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
        });
    
        const container = screen.getByTestId("renderedTable");
        const data = JSON.parse(container.innerHTML);

        expect(data.cols.length).toEqual(4);

        expect(data.cols[0].headerName).toEqual("ID");
        expect(data.cols[1].headerName).toEqual("Hospital Name");
        expect(data.cols[2].headerName).toEqual("Contact Email");
        expect(data.cols[3].headerName).toEqual("Actions");
      });

      it("displays correct information rendered in row 1", async () => {
        setup();
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
        });
    
        const container = screen.getByTestId("renderedTable");
        const data = JSON.parse(container.innerHTML);
        expect(data.data[0].id).toEqual("1");
        expect(data.data[0].name).toEqual("Hospital One");
        expect(data.data[0].contact_email).toEqual("hospital.one@hospitals.uk");
      });

      // it("shows correct buttons in row 1", async () => {
      //   setup();
      //   expect(screen.getByText(/Loading/i)).toBeInTheDocument();
      //   await waitFor(() => {
      //     expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
      //   });
      //   const container = screen.getByTestId("renderedTable");
      //   const data = JSON.parse(container.innerHTML);
      //   within(data).getByTestId("viewButton");
      //   within(data).getByTestId("createAdminButton");
      // });
});

// test("view hospital button in row 1 leads to a correct link on click", async () => {
//   setup();
//   expect(screen.getByText(/Loading/i)).toBeInTheDocument();
//   await waitFor(() => {
//     expect(screen.getByTestId("renderedTable")).toBeInTheDocument();
//   });
      
//   const container = screen.getByTestId("renderedTable");
//   const data = JSON.parse(container.innerHTML);

//   await waitFor(() => {
//     const viewLink = screen.getByTestId("viewHospitalLink");
//     expect(viewLink).toBeInTheDocument();
//     expect(viewLink).toHaveAttribute("href", "/my/hospitals/show/1");
//   });
// });

// test("create admin button in row 1 leads to a correct link", () => {});