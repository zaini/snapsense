import { React } from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  CREATE_HOSPITAL,
  NewHospitalForm,
} from "../components/Hospital/NewHospitalForm";
import userEvent from "@testing-library/user-event";
import { Route, MemoryRouter } from "react-router";

const mocks = [
  {
    request: {
      query: CREATE_HOSPITAL,
    },
  },
];

//Render component
const component = async () =>
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewHospitalForm />
      </MockedProvider>
    );
  });

//TODO
// Write tests
