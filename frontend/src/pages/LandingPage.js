import React from "react";

import Hero from "../components/Hero";
import LandingLayout from "../components/LandingLayout";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="Snapsense, welcomes you to the future"
        subtitle="Medical aid at the click of a button. Tele-medicine at its finest."
        image="https://source.unsplash.com/collection/404339/800x600"
      />
    </LandingLayout>
  );
}
