import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import HomeLayout from "../pages/Home/HomeLayout";

test("renders without crashing", () => {
  const renderPage = render(
    <BrowserRouter>
      <HomeLayout />
    </BrowserRouter>
  );
  expect(renderPage).toBeTruthy();
});

test("Home layout renders the main navbar", async () => {
  const wrapper = render(
    <BrowserRouter>
      <HomeLayout />
    </BrowserRouter>
  );
  expect(wrapper.getByTestId("MainNavbarID")).toBeInTheDocument();
});
