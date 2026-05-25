import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../Context/Authcontext";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBus,
  FaClock,
  FaCalendarAlt,
  FaWifi,
  FaSnowflake,
} from "react-icons/fa";

const AddTicket = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const ticketInfo = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      vendorName: user?.displayName,
      vendorEmail: user?.email,
    };

    const res = await axiosSecure.post("/api/tickets", ticketInfo);

    if (res.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Ticket added successfully & pending for approval",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      reset();
    }
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-10 py-8 text-white">
        <h2 className="text-5xl font-bold">Add New Ticket</h2>

        <p className="mt-3 text-blue-100 text-lg">
          Create your transport ticket with modern details
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-8 p-10"
      >
        {/* Ticket Title */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">
            Ticket Title
          </label>

          <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 bg-slate-50 focus-within:ring-2 ring-blue-500">
            <FaBus className="text-blue-600 text-xl" />

            <input
              {...register("title")}
              type="text"
              placeholder="Dhaka to Sylhet AC Bus"
              className="w-full py-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* From */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">From</label>

          <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 bg-slate-50 focus-within:ring-2 ring-red-400">
            <FaMapMarkerAlt className="text-red-500 text-xl" />

            <input
              {...register("from")}
              type="text"
              placeholder="Departure Location"
              className="w-full py-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* To */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">To</label>

          <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 bg-slate-50 focus-within:ring-2 ring-green-400">
            <FaMapMarkerAlt className="text-green-500 text-xl" />

            <input
              {...register("to")}
              type="text"
              placeholder="Destination"
              className="w-full py-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">Price</label>

          <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 bg-slate-50 focus-within:ring-2 ring-yellow-400">
            <FaMoneyBillWave className="text-yellow-500 text-xl" />

            <input
              {...register("price")}
              type="number"
              placeholder="Price per ticket"
              className="w-full py-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">
            Ticket Quantity
          </label>

          <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 bg-slate-50 focus-within:ring-2 ring-indigo-400">
            <FaBus className="text-indigo-500 text-xl" />

            <input
              {...register("quantity")}
              type="number"
              placeholder="Available Seats"
              className="w-full py-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">
            Departure Date
          </label>

          <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 bg-slate-50 focus-within:ring-2 ring-pink-400">
            <FaCalendarAlt className="text-pink-500 text-xl" />

            <input
              {...register("departureDate")}
              type="date"
              className="w-full py-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">
            Departure Time
          </label>

          <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 bg-slate-50 focus-within:ring-2 ring-cyan-400">
            <FaClock className="text-cyan-500 text-xl" />

            <input
              {...register("departureTime")}
              type="time"
              placeholder="Select departure time"
              className="w-full py-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Vendor Email */}
        <div>
          <label className="block text-slate-800 font-bold mb-3">
            Vendor Email
          </label>

          <input
            type="text"
            value={user?.email || ""}
            readOnly
            className="w-full py-4 px-4 border border-slate-200 rounded-2xl bg-slate-100 text-slate-600"
          />
        </div>

        {/* Perks */}
        <div className="md:col-span-2">
          <label className="block text-slate-800 font-bold mb-4 text-xl">
            Ticket Perks
          </label>

          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-blue-50 border hover:to-black">
              <input
                type="checkbox"
                {...register("perks")}
                value="AC"
                className="checkbox checkbox-primary"
              />

              <FaSnowflake className="text-blue-600" />

              <span className="font-semibold text-slate-700">AC</span>
            </label>

            <label className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-green-50 border hover:shadow-lg transition">
              <input
                type="checkbox"
                {...register("perks")}
                value="WiFi"
                className="checkbox checkbox-success"
              />

              <FaWifi className="text-green-500" />

              <span className="font-semibold text-slate-700">WiFi</span>
            </label>

            <label className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-orange-50 border hover:shadow-lg transition">
              <input
                type="checkbox"
                {...register("perks")}
                value="Snacks"
                className="checkbox checkbox-warning"
              />

              <span className="text-xl">🍔</span>

              <span className="font-semibold text-slate-700">Snacks</span>
            </label>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="md:col-span-2 py-5 rounded-2xl text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:scale-[1.02] transition-all duration-300 shadow-xl"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
