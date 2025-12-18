import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

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
    <section className="bg-[#00150e] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-bold mb-2">Got Questions?</h2>
          <h3 className="text-3xl font-bold text-[#4ade80]">
            We’ve Got Answers
          </h3>
          <p className="mt-4 text-white/80">
            Voyago is always here to help you. Contact us anytime for support.
          </p>

          <a
            href="/contact"
            className="inline-flex mt-8 bg-[#12522a] text-black px-6 py-4 rounded-xl font-semibold hover:bg-green-400 transition"
          >
            Contact Voyago
          </a>
        </div>

        {/* RIGHT SIDE (FAQ) */}
        <div className="lg:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border-b border-white/20 pb-3">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left py-3"
              >
                <h4 className="text-lg lg:text-xl font-semibold">
                  {faq.question}
                </h4>
                <span className="text-[#4ade80]">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {openIndex === index && (
                <p className="text-white/80 text-sm lg:text-base mt-2">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutsUs;
