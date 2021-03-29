import React from "react";
import { render } from "@testing-library/react";
import LandingPage from "../pages/Home/LandingPage";

test("renders without crashing", () => {
  const renderLandingPage = render(<LandingPage />);
  expect(renderLandingPage).toBeTruthy();
});

describe("Landing page renders hero of information", () => {
  const wrapper = render(<LandingPage />);

  test("Landing page has a hero", () => {
    const hero = wrapper.findByRole("Hero");
    expect(hero).toBeTruthy();
  });
});
