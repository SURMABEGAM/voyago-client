import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

const Success = () => {
  const query = new URLSearchParams(useLocation().search);
  const sessionId = query.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axios.post("http://localhost:5000/save-transaction", {
        sessionId,
      });
    }
  }, [sessionId]);
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-4">Session ID: {sessionId}</p>
    </div>
  );
};

export default Success;
