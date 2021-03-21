import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import LandingPage from '../pages/Home/LandingPage';

test('renders without crashing', () => {
  const renderLandingPage = render(<LandingPage/>);
  expect(renderLandingPage).toBeTruthy()
})