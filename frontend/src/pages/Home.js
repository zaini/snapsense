import React from "react";
import QuestionBox from "../components/QuestionBox/QuestionBox";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Logo from "../components/Logo/Logo";
import ParticlesBG from '../components/Particles/Particles';
// import ImageRecognition from "../components/ImageRecognition/ImageRecognition";


const Home = () => {
  return (
    <div>
      <ParticlesBG />
      <Logo />
      <ImageUpload />
      {/* <ImageRecognition /> */}
      <QuestionBox />
    </div>
  );
};

export default Home;
