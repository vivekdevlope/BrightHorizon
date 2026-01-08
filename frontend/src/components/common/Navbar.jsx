import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import logo from "../../assets/logo/Bhi_logo.png"; // adjust path if needed

const Navbar = ({ textColorWhenTransparent = "text-white" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "SAP BTP Development", path: "/services/sap-btp-development" },
    { name: "SAP CPI", path: "/services/sap-cpi" },
    { name: "SAP Fiori", path: "/services/sap-fiori" },
    { name: "SAP Cloud Platform", path: "/services/sap-cloud-platform" },
    { name: "Product Engineering", path: "/services/product-engineering" },
    { name: "Mobile Development", path: "/services/mobile-development" },
    { name: "SAP Analytics Cloud", path: "/services/sap-analytics-cloud" },
    { name: "On-Premise Analytics", path: "/services/on-premise-analytics" },
    { name: "Cloud Analytical Services", path: "/services/cloud-analytical-services" },
    { name: "SAP ERP (ECC & S/4HANA)", path: "/services/sap-erp" },
    { name: "SAP CRM & Loyalty", path: "/services/sap-crm" },
    { name: "SAP Basis", path: "/services/sap-basis" },
    { name: "Staffing Augmentation", path: "/services/staffing-augmentation" },
    { name: "Application Management & Support", path: "/services/application-support" },
    { name: "Application Development", path: "/services/application-development" },
  ];

  return (
    <nav
      className={`
        text-white 
        transition-all duration-300 ease-in-out
        ${isScrolled ? "fixed" : "sticky"} top-0 inset-x-0 z-50
        ${isScrolled || isHovered ? "bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"}
        pointer-events-auto
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="top-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand - FIXED LOGO */}
          <Link to="/" onClick={closeMenu} className="flex w-[16%] items-center flex-shrink-0">
            <img
              src={logo}
              alt="BrightHorizon Infotech"
              className="h-24 w-auto object-contain sm:h-11 md:h-56 mt-5 md:w-full transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex ml-auto items-center space-x-6">

            <Link to="/" onClick={closeMenu} className="text-lg font-medium hover:text-blue-400">
              Home
            </Link>

            {/* About Us */}
            <div className="relative group">
              <button className="flex items-center text-lg font-medium hover:text-blue-400">
                About Us <ChevronDown className="ml-2 w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/introduction" onClick={closeMenu} className="block px-4 py-2 text-sm hover:bg-gray-700">Introduction</Link>
                <Link to="/vision" onClick={closeMenu} className="block px-4 py-2 text-sm hover:bg-gray-700">Vision</Link>
                <Link to="/mission" onClick={closeMenu} className="block px-4 py-2 text-sm hover:bg-gray-700">Mission</Link>
                <Link to="/about" onClick={closeMenu} className="block px-4 py-2 text-sm hover:bg-gray-700">About Us</Link>
              </div>
            </div>

            {/* Services */}
            <div className="relative group">
              <button className="flex items-center text-lg font-medium hover:text-blue-400">
                Services <ChevronDown className="ml-2 w-4 h-4" />
              </button>

              <div className="absolute left-0 top-full mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                <div className="relative group/item">
                  <button className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold hover:bg-gray-700 text-blue-300">
                    Our Services <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="absolute right-full top-0 mr-1 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all max-h-96 overflow-y-auto">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={closeMenu}
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/services" onClick={closeMenu} className="block px-4 py-2 text-sm hover:bg-gray-700">All services</Link>
                <Link to="/technologies" onClick={closeMenu} className="block px-4 py-2 text-sm hover:bg-gray-700">Technologies</Link>
                <Link to="/our-clients" onClick={closeMenu} className="block px-4 py-2 text-sm hover:bg-gray-700">Our Clients</Link>
              </div>
            </div>

            <Link to="/blogs" onClick={closeMenu} className="text-lg font-medium hover:text-blue-400">
              Blogs
            </Link>

            <Link to="/contact" onClick={closeMenu} className="text-lg font-medium hover:text-blue-400">
              Contact Us
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden ml-auto text-white hover:text-blue-400"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[1200px]" : "max-h-0"}`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-800 border-t border-gray-700">
          <Link to="/" onClick={closeMenu} className="block py-2 text-lg hover:text-blue-400">Home</Link>
          <Link to="/blogs" onClick={closeMenu} className="block py-2 text-lg hover:text-blue-400">Blogs</Link>
          <Link to="/contact" onClick={closeMenu} className="block py-2 text-lg hover:text-blue-400">Contact Us</Link>
     {/* About Us */}
          <details className="group">
            <summary className="py-2 text-lg font-medium cursor-pointer hover:text-blue-400">About Us</summary>
            <div className="pl-4 space-y-1 mt-1">
              <Link to="/introduction" onClick={closeMenu} className="block hover:text-blue-400">Introduction</Link>
              <Link to="/vision" onClick={closeMenu} className="block hover:text-blue-400">Vision</Link>
              <Link to="/mission" onClick={closeMenu} className="block hover:text-blue-400">Mission</Link>
              <Link to="/about" onClick={closeMenu} className="block hover:text-blue-400">About Us</Link>
            </div>
          </details>

          {/* Services */}
          <Link to="/services" onClick={closeMenu} className="block py-2 text-lg font-medium hover:text-blue-400 transition-colors">
            All services
          </Link>
          <details className="group">
            <summary className="py-2 text-lg font-medium cursor-pointer hover:text-blue-400">Services</summary>
            <div className="pl-4 mt-2 space-y-2">
              {/* Our Services Submenu */}
              <details>
                <summary className="cursor-pointer py-1 font-medium text-blue-300">Our Services</summary>
                <div className="pl-4 mt-1 space-y-1 max-h-64 overflow-y-auto">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={closeMenu}
                      className="block py-1 hover:text-blue-400 text-sm"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </details>

              <Link to="/technologies" onClick={closeMenu} className="block hover:text-blue-400">Technologies</Link>
              <Link to="/our-clients" onClick={closeMenu} className="block hover:text-blue-400">Our Clients</Link>
            </div>
          </details>

          <Link to="/blogs" onClick={closeMenu} className="block py-2 text-lg font-medium hover:text-blue-400 transition-colors">
            Blogs
          </Link>
          <Link to="/contact" onClick={closeMenu} className="block py-2 text-lg font-medium hover:text-blue-400 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
