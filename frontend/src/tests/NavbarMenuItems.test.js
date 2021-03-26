import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import NavbarMenuItems from '../components/utils/NavbarMenuItems';

test('renders without crashing', () => {
  const renderNavbarItems = render(<BrowserRouter><NavbarMenuItems/></BrowserRouter>);
  expect(renderNavbarItems).toBeTruthy()
})