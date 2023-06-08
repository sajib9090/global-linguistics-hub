import React, { useEffect, useState } from "react";
import PopularClassesCard from "./PopularClassesCard";

const PopularClasses = () => {
  const [popularClasses, setPopularClasses] = useState([]);
  useEffect(() => {
    fetch(`popularClasses.json`)
      .then((res) => res.json())
      .then((data) => {
        setPopularClasses(data);
      });
  }, []);

  console.log(popularClasses);
  return (
    <div className="mt-[150px]">
      <div className="text-center">
        <h1 className="text-[40px] font-bold mb-4 tracking-[10px]">
          Popular Top Classes
        </h1>
        <p className="text-base font-extralight ">
          Based on students enrollment
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {popularClasses.map((pc, index) => (
          <PopularClassesCard key={index} pc={pc} />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
