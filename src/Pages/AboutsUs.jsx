import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaHeadset } from "react-icons/fa";

const AboutsUs = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-orange-400 via-orange-300 to-blue-600 text-white rounded-lg py-16">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-lg">
            <FaHeadset className="text-4xl mb-4 text-yellow-300" />

            <h2 className="text-3xl font-bold">Got Questions?</h2>
            <h3 className="text-2xl font-bold text-yellow-300 mt-2">
              We’ve Got Answers
            </h3>

            <p className="mt-4 text-white/80">
              We’re always here to help you with booking, payment and travel
              support.
            </p>

            <nav className="mt-6">
              <a
                href="/contact"
                className="inline-block mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow hover:bg-white/15 transition"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h4 className="text-lg font-semibold">{faq.question}</h4>

                <span className="text-yellow-300 text-lg">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-3 text-white/80">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutsUs;
