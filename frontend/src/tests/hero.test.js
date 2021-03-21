import React from 'react';
import { render, screen, queryByAttribute, getByTestId, getByAltText, toBeInTheDocument} from "@testing-library/react";
import LandingPage from '../pages/Home/LandingPage';
import Hero from "../components/utils/Hero";

const props = {}

const { getByText } = render(
    <LandingPage><Hero {...props} /></LandingPage>,
)

test('hero contains correct title', () => {
  expect(getByText('Snapsense, welcomes you to the future')).toBeInTheDocument();
})


