import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">TicketBari</h2>
          <p className="text-sm leading-relaxed">
            Book bus, train, launch & flight tickets easily with TicketBari.
            Safe, fast & reliable ticket booking platform.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tickets" className="hover:text-white">
                All Tickets
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Info
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@ticketbari.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>
              Facebook:{" "}
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:text-white"
              >
                TicketBari Page
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Payment Methods
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm">Stripe</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2025 <span className="font-semibold text-white">TicketBari</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
