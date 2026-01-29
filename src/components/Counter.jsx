import React, { useState } from "react";

const Counter = () => {
  const [number, setNumber] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">React Counter</h1>

        <div className="text-5xl font-extrabold text-blue-600 mb-6">
          {number}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => {
              if (number <= 0) {
                0;
              } else {
                setNumber((elem) => elem - 1);
              }
            }}
            className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Decrement
          </button>

          <button
            onClick={() => {
              if (number >= 10) {
                10;
              } else {
                setNumber((elem) => elem + 1);
              }
            }}
            className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
