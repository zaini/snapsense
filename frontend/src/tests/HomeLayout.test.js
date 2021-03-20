import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom'; 
import HomeLayout from '../pages/Home/HomeLayout';
import MainNavbar from "../components/utils/MainNavbar";

test('renders without crashing', () => {
  const renderPage = render(<BrowserRouter><HomeLayout /></BrowserRouter>);
  expect(renderPage).toBeTruthy()
})

// test('Home layout renders the main navbar', () => {
//   const { getByTestId } = render(<HomeLayout />);
//   expect(within(HomeLayout).getByTestId('mainNavbar')).toBeTruthy();
// });

test('Home layout renders the main navbar', () => {
  const wrapper = render(<BrowserRouter><HomeLayout /></BrowserRouter>)
  expect(wrapper.findAllByRole('MainNavbar')).toBeTruthy()
})
