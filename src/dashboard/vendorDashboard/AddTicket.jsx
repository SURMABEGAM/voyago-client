import { useForm } from "react-hook-form";

import { useContext } from "react";

import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../Context/Authcontext";

const AddTicket = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    // এখানে ইমেজ আপলোড লজিক (ImgBB) হবে, আপাতত ডাটা সরাসরি পাঠানো হচ্ছে
    const ticketInfo = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      vendorName: user?.displayName,
      vendorEmail: user?.email,
    };

    const res = await axiosSecure.post("/api/tickets", ticketInfo);
    if (res.data.insertedId) {
      Swal.fire("Success", "Ticket added and pending for approval", "success");
      reset();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-5">Add New Ticket</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow"
      >
        <input
          {...register("title")}
          placeholder="Ticket Title"
          className="input border-gray-300 p-2 border"
          required
        />
        <input
          {...register("from")}
          placeholder="From (Location)"
          className="input border-gray-300 p-2 border"
          required
        />
        <input
          {...register("to")}
          placeholder="To (Location)"
          className="input border-gray-300 p-2 border"
          required
        />
        <input
          {...register("price")}
          type="number"
          placeholder="Price per unit"
          className="input border-gray-300 p-2 border"
          required
        />
        <input
          {...register("quantity")}
          type="number"
          placeholder="Ticket Quantity"
          className="input border-gray-300 p-2 border"
          required
        />
        <input
          {...register("departureDate")}
          type="date"
          className="input border-gray-300 p-2 border"
          required
        />
        <input
          {...register("departureTime")}
          type="time"
          className="input border-gray-300 p-2 border"
          required
        />

        {/* Perks Checkboxes */}
        <div className="col-span-2">
          <p className="font-semibold">Perks:</p>
          <label className="mr-4">
            <input type="checkbox" {...register("perks")} value="AC" /> AC
          </label>
          <label className="mr-4">
            <input type="checkbox" {...register("perks")} value="WiFi" /> WiFi
          </label>
          <label>
            <input type="checkbox" {...register("perks")} value="Snacks" />{" "}
            Snacks
          </label>
        </div>

        <button
          type="submit"
          className="btn bg-blue-600 text-white p-2 rounded col-span-2"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
