import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { MdOutlineSmartToy } from "react-icons/md";
import { FaWhatsapp, FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import Chatbot from "../common/Chatbot"; // ✅ make sure the path is correct (adjust if needed)
import logo2 from "../../assets/logo/Bh_logo.png"; // Adjust path if needed


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Clients", href: "/our-clients" },
      { label: "Mission", href: "/mission" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Technologies", href: "/technologies" },
      { label: "Staffing Augmentation", href: "/services/staffing-augmentation" },
      { label: "Application Management", href: "/services/application-support" },
      { label: "Application Development", href: "/services/application-development" },
    ],
    resources: [
      { label: "Blogs", href: "/blogs" },
      { label: "Case Studies", href: "/" },
      { label: "Whitepapers", href: "/" },
      { label: "Webinars", href: "/" },
    ],
    contact: [
      { icon: <Mail className="w-4 h-4" />, text: " info@BrightHorizon.co.in" },
      { icon: <Phone className="w-4 h-4" />, text: "+918179401321" },
      { icon: <MapPin className="w-4 h-4" />, text: "1-98/5/2A, Spacion Business Center, Madhapur, Hitech city Lingampalli, Hyderabad, Telangana, India" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-gray-300 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & Tagline */}
        <div className="lg:col-span-2">
  {/* Logo */}
  <div className="mb-0">
    <img 
      src={logo2}  // Make sure you import logo at the top of your Footer file
      alt="BrightHorizon Infotech"
      className="h-40 w-auto object-contain md:h-28 lg:h-44 transition-transform"
    />
  </div>

  {/* Description */}
  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
    Empowering enterprises with innovative IT solutions, strategic guidance, and measurable results.
  </p>

  {/* Social Media Icons */}
  <div className="flex gap-4 mt-6">
    <a
      href="https://www.facebook.com/brighthorizon-infotech"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
    >
      <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
    </a>
    {/* <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
    >
      <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
    </a> */}
    <a
      href="https://www.linkedin.com/company/brighthorizon-infotech"  // Update with your real LinkedIn if available
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
    >
      <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
    </a>
    <a
      href="https://www.instagram.com/brighthorizon-infotech"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
    >
      <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
    </a>
  </div>
</div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mt-8 mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-blue-500">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {currentYear}{" "}
            <span className="text-white font-medium">BrightHoRIZon</span>. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Floating Chatbot & Chat Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button
          onClick={() => setChatbotOpen((v) => !v)}
          className="p-3 rounded-full bg-blue-700 text-white shadow-lg hover:scale-110 transition-all"
          aria-label="Chatbot"
        >
          <MdOutlineSmartToy className="text-xl" />
        </button>

        <a
          href="https://wa.me/918179401321"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-green-600 text-white shadow-lg hover:scale-110 transition-all"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="text-xl" />
        </a>

        <Link
          to="/contact"
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition-all"
          aria-label="Message"
        >
          <FaCommentDots className="text-xl" />
        </Link>
      </div>

      {/* Chatbot Modal */}
      <Chatbot open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </footer>
  );
};

export default Footer;
