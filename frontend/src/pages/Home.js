import React from "react";
import Questionnaire from "../components/Questionnaire/Questionnaire";
import ImageUpload from "../components/ImageUpload/ImageUpload";
// import Logo from "../components/Logo/Logo";
import ParticlesBG from '../components/Particles/Particles';


const Home = () => {
  return (
    <div>
      <ParticlesBG />
      {/* <Logo /> */}
      <ImageUpload />      
      <Questionnaire />
    </div>
  );
};

export default Home;
