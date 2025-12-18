import React from "react";
import appImg from "../assets/app-v2.jpg";
import { FaApple, FaGooglePlay, FaWhatsapp } from "react-icons/fa";

const MobileApp = () => {
  return (
    <section className="py-16 bg-[#f3fdf8]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items- rounded-4xl gap-10">
        {/* LEFT IMAGE */}
        <div className="lg:w-1/2">
          <img
            src={appImg}
            alt="Voyago Mobile App"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:w-1/2 max-w-[520px]">
          <h2 className="text-2xl lg:text-4xl font-semibold text-blue-950 mb-5">
            Get More Out of Voyago with our{" "}
            <span className="text-orange-400">mobile app</span>
          </h2>

          {/* FEATURES */}
          <div className="flex flex-wrap justify-between">
            {[
              "Faster and easier booking",
              "Get alerts before every departure",
              "Easy access to your tickets",
              "Onboard with digital tickets",
            ].map((item, index) => (
              <div
                key={index}
                className="w-[95%] sm:w-[48%] flex items-start mb-3"
              >
                <span className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center mr-2">
                  <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M13.5 11L9.96 14.53 8.78 13.36 11.14 11 8.78 8.64 9.96 7.46 13.5 11Z"
                      fill="#16D378"
                    />
                  </svg>
                </span>
                <p className="text-sm text-gray-800">{item}</p>
              </div>
            ))}
          </div>

          {/* STORE BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            {/* Google Play */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black text-white hover:bg-blue-950 transition"
            >
              <FaGooglePlay className="text-2xl text-orange-400" />
              <div className="leading-tight">
                <p className="text-xs opacity-80">GET IT ON</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </a>

            {/* Apple Store */}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
              <FaApple className="text-2xl" />
              <div className="leading-tight">
                <p className="text-xs opacity-80">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=8801781540625"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black text-white hover:bg-gray-700 transition"
            >
              <FaWhatsapp className="text-2xl" />
              <div className="leading-tight">
                <p className="text-xs opacity-90">Book on</p>
                <p className="text-sm font-semibold">WhatsApp</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
