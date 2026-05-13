import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">QurbaniHat</h3>
          <p className="text-sm mb-4">Connecting you with the best livestock for your sacred sacrifice. Reliable, transparent, and easy.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><FaTwitter size={20} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
            <li><a href="/faq" className="hover:text-orange-500">Qurbani Tips</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <div className="flex items-center gap-2 text-sm mb-2">
            <FaEnvelope /> <span>support@qurbanihat.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhone /> <span>+880 1XXX-XXXXXX</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
        © {new Date().getFullYear()} QurbaniHat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;