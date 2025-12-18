import React, { useEffect, useState } from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";

const CostomerService = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("/busFeedback.json")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);
  return (
    <section className="py-16 px-4 md:px-10 bg-[#f3fdf8] rounded-2xl">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-blue-950">
        Customer <span className="text-orange-400">Feedback</span>
      </h2>

      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-marquee hover:pause-marquee">
          {[...feedbacks, ...feedbacks].map((fb, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 md:w-72 lg:w-80 p-6 bg-white rounded-4xl shadow-md text-center"
            >
              <FaUserCircle className="text-blue-950 text-6xl mx-auto mb-3" />

              <h3 className="text-lg font-semibold mb-2 text-orange-400">
                {fb.name}
              </h3>

              <div className="flex justify-center mb-2">
                {[...Array(fb.rating)].map((_, i) => (
                  <FaStar key={i} className="text-orange-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm">{fb.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* marquee animation */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default CostomerService;
