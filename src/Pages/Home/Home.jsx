import React from "react";
import Hero from "./Hero";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import Banner from "./Banner";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Global | Home</title>
      </Helmet>
      <Hero />
      <PopularClasses />
      <PopularInstructors />
      <Banner />
    </div>
  );
};

export default Home;
