import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import MainNavbar from '../components/utils/MainNavbar';

test('renders without crashing', () => {
  const renderNavbar = render(<BrowserRouter><MainNavbar/></BrowserRouter>);
  expect(renderNavbar).toBeTruthy()
})

test('renders a navbar of items', () => {
  const { getByRole } = render(<BrowserRouter><MainNavbar /></BrowserRouter>);
  // const navbarOfItems = renderNavbar.getByTestId('navbarItems');
  expect(getByRole('NavbarMenuItems')).toBeTruthy();
})