import React from "react";
import { render, waitFor } from "@testing-library/react";
import LandingPage from "../pages/Home/LandingPage";

test("the correct hero is rendered", () => {
  const landingPage = render(<LandingPage />);
  const foundHero = landingPage.getByTestId("landingHero");
  expect(foundHero).toBeTruthy();
});

describe("hero displays correct information", () => {
  test("hero contains correct title", () => {
    const landingPage = render(<LandingPage />);
    const heroTitle = landingPage.getByTestId("heroTitle");
    expect(heroTitle.textContent).toBe("Snapsense, welcomes you to the future");
  });

  test("hero contains correct subtitle", () => {
    const landingPage = render(<LandingPage />);
    const heroSubtitle = landingPage.getByTestId("heroSubtitle");
    expect(heroSubtitle.textContent).toBe(
      "Medical aid at the click of a button. Tele-medicine at its finest."
    );
  });

  test("hero contains correct image", async () => {
    const landingPage = render(<LandingPage />);
    await waitFor(() => {
      const heroImage = landingPage.queryByTestId("heroImage");
      expect(heroImage).toBeTruthy();
    });
  });
});
