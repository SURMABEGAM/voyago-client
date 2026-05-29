import { Link } from "react-router";
import {
  FaFacebook,
  FaEnvelope,
  FaPhoneAlt,
  FaBus,
  FaCreditCard,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <FaBus className="text-blue-500" />
            Voyago
          </h2>

          <p className="text-sm mt-4 leading-relaxed text-slate-400">
            Book bus tickets easily with Voyago. Fast, secure and reliable
            travel booking platform in Bangladesh.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link className="hover:text-white" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/tickets">
                Tickets
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-bold text-white mb-4">Contact</h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <FaEnvelope className="text-blue-400" />
              support@ticketbari.com
            </li>

            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <FaPhoneAlt className="text-green-400" />
              +880 1234-567890
            </li>

            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <FaFacebook className="text-blue-500" />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                TicketBari Page
              </a>
            </li>
          </ul>
        </div>

        {/* Payment */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-bold text-white mb-4">Payment Methods</h3>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <FaCreditCard className="text-purple-400" />
              Stripe
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <FaCreditCard className="text-pink-400" />
              bKash (Coming Soon)
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 text-center py-5 text-sm text-slate-400">
        © 2026 <span className="text-white font-semibold">Voyago</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
