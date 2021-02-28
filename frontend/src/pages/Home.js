import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Logo from "../components/Logo/Logo";
import Questionnaire from '../components/Questionnaire/questions';


const Home = () => {
  return (
    <div>
      <Logo />
      <ImageUpload />      
      <br/>
      <Questionnaire />
    </div>
  );
};

export default Home;
