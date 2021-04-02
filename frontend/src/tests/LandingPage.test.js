import React from "react";
import { render } from "@testing-library/react";
import LandingPage from "../pages/Home/LandingPage";

describe("Test landing page", () => {
  test("renders without crashing", () => {
    const renderLandingPage = render(<LandingPage />);
    expect(renderLandingPage).toBeTruthy();
  });

  test("Landing page renders hero of information", () => {
    const landingPage = render(<LandingPage />);
    const foundHero = landingPage.getByTestId("landingHero");
    expect(foundHero).toBeTruthy();
  });
});
