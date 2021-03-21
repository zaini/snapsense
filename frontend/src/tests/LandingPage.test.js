import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import LandingPage from '../pages/Home/LandingPage';

test('renders without crashing', () => {
  const renderLandingPage = render(<LandingPage/>);
  expect(renderLandingPage).toBeTruthy()
})

//Check to see if it contains more tests
describe('Landing page renders banner of information', () => {
  const wrapper = render(<LandingPage/>)

  test('Landing page has a banner', () => {
    const banner = wrapper.findByRole('Hero')
    expect(banner).toBeTruthy()
  })
  
})