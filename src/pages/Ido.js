import React, { useState } from "react";
import { Link } from "react-router-dom";

const Ido = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
        console.log("The rating was successfully received", rating);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl"> Ido feature</h2>
                <div>
                    <p>Rate this site:</p>
                    <div className="flex gap-2">
                        <button onClick={() => handleRating(1)}>1</button>
                        <button onClick={() => handleRating(2)}>2</button>
                        <button onClick={() => handleRating(3)}>3</button>
                        <button onClick={() => handleRating(4)}>4</button>
                        <button onClick={() => handleRating(5)}>5</button>
                    </div>
                </div>
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

export default Ido;
