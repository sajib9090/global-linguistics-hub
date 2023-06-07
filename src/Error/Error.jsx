import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../../public/errorAnimation.json";

const Error = () => {
  return (
    <div id="error-page">
      <div className="text-center pt-6">
        <Link to="/">
          <button className="bg-[#007CFF] text-white px-4 py-2 rounded-md hover:bg-slate-700 duration-500">
            Go to home page
          </button>
        </Link>
      </div>
      <div className="">
        <Lottie
          className="w-[100%] h-[90vh]"
          animationData={errorAnimation}
          loop={true}
        ></Lottie>
      </div>
    </div>
  );
};

export default Error;
