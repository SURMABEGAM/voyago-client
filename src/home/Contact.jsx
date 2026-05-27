import { useState } from "react";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "8801781540625";
    const text = `Hello, I am ${form.name}%0APhone: ${form.phone}%0AMessage: ${form.message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, "_blank");

    Swal.fire({
      icon: "success",
      title: "Message Ready!",
      text: "You will be redirected to WhatsApp",
    });

    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Contact With Us
        </h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          We usually reply within a few minutes on WhatsApp
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white 
        bg-gradient-to-r from-green-400 to-emerald-600 
        hover:from-emerald-500 hover:to-green-500 
        transition-all duration-300 shadow-lg"
          >
            🚀 Send via WhatsApp
          </button>
        </form>

        {/* WhatsApp direct */}
        <a
          href="https://wa.me/8801781540625"
          target="_blank"
          rel="noreferrer"
          className="block text-center mt-5 text-green-300 hover:text-green-400 transition"
        >
          💬 Or Chat Direct on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
