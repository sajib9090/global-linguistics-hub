import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  return (
    <div>
      <div className="hero-sec h-[100vh] mt-24 mb-24">
        <div className="flex items-center justify-center h-[100vh]">
          <div className="h-[60vh] md:h-[100vh] w-[85%] md:w-[50%] mx-auto md:mx-0 bg-[#3AB6E3] bg-opacity-75 md:ml-auto">
            <div
              className="mx-auto md:max-w-md px-6 md:px-0 pt-[30%] md:pt-[15%]"
              data-aos="zoom-in-down"
              data-aos-duration="1000"
            >
              <h5 className="font-medium text-[1rem] md:text-[1.6rem] tracking-[12px] text-white">
                ACADEMICS
              </h5>
              <h1 className="font-bold text-[1.8rem] md:text-[3.6rem] leading-[1em] my-6 text-white">
                OPENING UP A WORLD OF EDUCATION
              </h1>
              <p className="text-[16px] font-light text-white">
                We believe that there is nothing more important than skillful
                education. Doing the right thing, at the right time.
              </p>
              <Link to="/about">
                <button className="border-2 font-semibold mt-4 hover:bg-white hover:bg-opacity-40 border-white px-6 py-2 text-white">
                  About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
<div className="hero-sec h-[100vh]">
  <div className="flex items-center justify-center h-[100vh]">
    <div className="h-[60vh] md:h-[100vh] w-[85%] md:w-[50%] mx-auto md:mx-0 bg-[#3AB6E3] bg-opacity-75 md:ml-auto">
      <div
        className="mx-auto md:max-w-md px-6 md:px-0 pt-[30%] md:pt-[15%]"
        data-aos="zoom-in-down"
        data-aos-duration="1000"
      >
        <h5 className="font-medium text-[1rem] md:text-[1.6rem] tracking-[12px] text-white">
          ACADEMICS
        </h5>
        <h1 className="font-bold text-[1.8rem] md:text-[3.6rem] leading-[1em] my-6 text-white">
          OPENING UP A WORLD OF EDUCATION
        </h1>
        <p className="text-[16px] font-light text-white">
          We believe that there is nothing more important than skillful
          education. Doing the right thing, at the right time.
        </p>
        <Link to="/about">
          <button className="border-2 font-semibold mt-4 hover:bg-white hover:bg-opacity-40 border-white px-6 py-2 text-white">
            About Us
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>;
