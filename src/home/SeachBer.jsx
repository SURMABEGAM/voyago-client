import React, { useState } from "react";
import { FaBus, FaCalendarAlt, FaExchangeAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

const cities = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Rangpur",
];

const SearchBar = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please select From, To and Date");
      return;
    }

    if (from === to) {
      alert("From and To cannot be same");
      return;
    }

    navigate(`/search?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="h-[80vh] flex items-center justify-center bg-blue-200">
      <div className="bg-blue-950 p-6 md:p-10 rounded-3xl shadow-xl w-full max-w-4xl flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 text-center">
          Book Your <span className="text-orange-400">Bus Ticket</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          {/* FROM */}
          <div className="flex items-center gap-3 flex-1 bg-gray-800 px-4 py-3 rounded-xl border border-gray-600">
            <FaBus className="text-orange-400 text-2xl" />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-gray-800 text-white outline-none"
            >
              <option value="">From</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="bg-orange-400 p-3 rounded-xl text-gray-800 hover:bg-yellow-500 transition self-center"
          >
            <FaExchangeAlt />
          </button>

          {/* TO */}
          <div className="flex items-center gap-3 flex-1 bg-gray-800 px-4 py-3 rounded-xl border border-gray-600">
            <FaBus className="text-orange-400 text-2xl rotate-180" />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-gray-800 text-white outline-none"
            >
              <option value="">To</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl border border-gray-600">
          <FaCalendarAlt className="text-orange-400 text-2xl" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-800 text-white outline-none"
          />
        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="bg-orange-400 text-gray-800 font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition text-lg"
        >
          <FaSearch />
          Search Bus
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
