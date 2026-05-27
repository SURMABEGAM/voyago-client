import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-dots loading-xs"></span>
      <span className="loading loading-dots loading-sm"></span>
      <span className="loading loading-dots loading-md"></span>
      <span className="loading loading-dots loading-lg"></span>
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
};

export default Loader;
