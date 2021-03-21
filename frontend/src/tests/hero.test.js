import React from 'react';
import { render, screen, queryByAttribute, getByTestId, getByAltText } from "@testing-library/react";
import LandingPage from '../pages/Home/LandingPage';
import Hero from "../components/utils/Hero";


const props = {}

const { getByText } = render(
    <LandingPage><Hero {...props} /></LandingPage>,
)

test('renders without crashing', () => {
  expect(getByText('Snapsense, welcomes you to the future')).toBeInTheDocument()
})
