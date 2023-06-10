import React from "react";
import Hero from "./Hero";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";

const Home = () => {
  return (
    <div>
      <Hero />
      <PopularClasses />
      <PopularInstructors />
    </div>
  );
};

export default Home;
