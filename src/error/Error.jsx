import React from "react";
import img from "../../src/assets/404.png";
const Error = () => {
  return (
    <div
      style={{
        backgroundColor: "#7587e0", // light red background
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img
        src={img}
        alt="error"
        style={{
          maxWidth: "600px",
          width: "100%",
          marginBottom: "20px",
        }}
      />
      <h1 style={{ color: "#721c24", fontSize: "2rem", marginBottom: "10px" }}>
        Oops! Page not found
      </h1>
      <p style={{ color: "#721c24", fontSize: "1.2rem" }}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
    </div>
  );
};

export default Error;
