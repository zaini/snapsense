import { React } from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import gql from "graphql-tag";

import NewHospitalPage from "../pages/My/NewHospitalPage";
import { Route, MemoryRouter } from "react-router";

const CREATE_HOSPITAL = gql`
  mutation createHospital($name: String!, $contact_email: String!) {
    createHospital(name: $name, contact_email: $contact_email) {
      name
      contact_email
    }
  }
`;