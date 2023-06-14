import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <Carousel>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1534643960519-11ad79bc19df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt="Language School"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold max-w-lg tracking-[3px]">
            Unlock the power of language and open doors to endless
            possibilities.
          </h1>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1565665643598-b888bfb550c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold max-w-lg tracking-[3px]">
            Expand your horizons through the beauty of language.
          </h1>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1588075592405-d3d4f0846961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold max-w-lg tracking-[3px]">
            Embrace diversity, embrace language.
          </h1>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold max-w-lg tracking-[3px]">
            Discover the world through the lens of language.
          </h1>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold max-w-lg tracking-[3px]">
            Language is the key that unlocks the treasure chest of culture.
          </h1>
        </div>
      </div>
    </Carousel>
  );
};

export default Hero;
