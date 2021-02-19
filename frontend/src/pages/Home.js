import React from "react";
import QuestionBox from "../components/QuestionBox/QuestionBox";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Logo from "../components/Logo/Logo";
import ParticlesBG from '../components/Particles/Particles';


const Home = () => {
  return (
    <div>
      <ParticlesBG />
      <Logo />
      <ImageUpload />      
      <QuestionBox />
    </div>
  );
};

export default Home;
