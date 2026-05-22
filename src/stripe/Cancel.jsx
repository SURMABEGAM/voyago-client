import React from "react";

const Cancel = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-red-500 mt-20">
        Payment Cancelled
      </h1>
      <p className="text-center mt-4 text-gray-600">
        Your payment was cancelled. Please try again.
      </p>
    </div>
  );
};

export default Cancel;
