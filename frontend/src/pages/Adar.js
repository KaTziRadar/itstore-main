import React from "react";
import { Link } from "react-router-dom";

const Adar = () => {

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl"> Adar's feature</h2>
        <Link
          to="/"
          className="text-xl hover:text-cyan-500 duration-300 select-none"
        >
          &larr; Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Adar;
