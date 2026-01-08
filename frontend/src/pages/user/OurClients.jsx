// src/pages/user/OurClients.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe2, ArrowRight } from "lucide-react";

import wLogo from "../../assets/logo/bosch.png";
import aLogo from "../../assets/logo/EGA.png";
import bLogo from "../../assets/logo/genetech.png";
import cLogo from "../../assets/logo/interst.png";
import dLogo from "../../assets/logo/john dere.jpg";
import eLogo from "../../assets/logo/morgan.jpg";
import fLogo from "../../assets/logo/newell.png";
import gLogo from "../../assets/logo/saudia ceramics.jpg";
import hLogo from "../../assets/logo/ssmc.jpg";
import iLogo from "../../assets/logo/stanley.png";
import jLogo from "../../assets/logo/vista.png";

const OurClients = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clients = [
    // { name: "JOHN DEERE", country: "USA", logo: dLogo },
    { name: "EMIRATES GLOBAL ALUMINIUM", country: "DUBAI", logo: aLogo },
    { name: "BOSCH", country: "GERMANY", logo: wLogo },
    { name: "MORGAN FOODS", country: "USA", logo: eLogo },
    // { name: "SAUDI CERAMICS", country: "SAUDI ARABIA", logo: gLogo },
    { name: "NEWELL RUBBERMAID", country: "USA", logo: fLogo },
    // { name: "SYSTEMS SILICON MANUFACTURING", country: "SINGAPORE", logo: hLogo },
    // { name: "INTERSTATE BATTERIES", country: "USA", logo: cLogo },
    { name: "GENENTECH", country: "USA", logo: bLogo },
    { name: "STANLEY BLACK & DECKER", country: "USA", logo: iLogo },
    { name: "VISTA PRINT", country: "USA", logo: jLogo },
  ];

  return (
    <>
      {/* HERO IMAGE (BEHIND NAVBAR) */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1678917191085-048e25c687fd?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* MAIN CONTENT (STARTS BELOW NAVBAR) */}
      <div className="relative min-h-screen flex flex-col pt-20">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center text-white z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Globe2 className="w-5 h-5" />
              Our Global Clients
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
              Trusted by Industry Leaders Worldwide
            </h1>
            <p className="text-lg md:text-2xl opacity-95 max-w-3xl mx-auto drop-shadow-md">
              Partnering with renowned brands across multiple sectors and regions.
            </p>
          </div>
        </section>

        {/* CLIENT GRID */}
        <section className="bg-white py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {clients.map((client, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="object-contain w-full h-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML =
                          '<span class="text-gray-400 text-sm">Logo</span>';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{client.name}</h3>
                  <p className="text-blue-600 font-medium">{client.country}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="bg-gray-100 border-t border-gray-200 py-8 text-center">
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Next: Contact Us <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default OurClients;