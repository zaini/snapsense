import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom'; 
import HomeLayout from '../pages/Home/HomeLayout';

// const ActualHomeLayout = jest.requireActual(HomeLayout);
// jest.mock(HomeLayout, () =>
//   <div data-testid="homeLayout">
//     <HomeLayout />
//   </div>
// );

test('renders without crashing', () => {
  const renderPage = render(<BrowserRouter><HomeLayout /></BrowserRouter>);
  expect(renderPage).toBeTruthy()
})
