import React from "react";

import Hero from "../../components/utils/Hero";
import LandingLayout from "../../components/utils/LandingLayout";

const Landing = () => {
  return (
    <LandingLayout>
      <Hero
        title="Snapsense, welcomes you to the future"
        subtitle="Medical aid at the click of a button. Tele-medicine at its finest."
        image="https://source.unsplash.com/collection/1079213/800x600"
        data-testid="landingHero"
      />
    </LandingLayout>
  );
};

export default Landing;
