// src/pages/user/SapFiori.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, ArrowLeft, ArrowRight } from "lucide-react";

const SapFiori = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* HERO IMAGE */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative min-h-screen flex flex-col pt-20">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center text-white z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
              SAP Fiori
            </h1>
            <p className="text-lg md:text-2xl opacity-95 max-w-3xl mx-auto drop-shadow-md">
              Modern, intuitive user experiences for SAP.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-16 px-6 md:px-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 transition-all hover:shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8" />
                </div>
              </div>

              <h2 className="text-3xl font-semibold text-center mb-8 text-slate-800">
                SAP Fiori
              </h2>

              <p className="text-lg leading-relaxed text-slate-700 mb-4">
                <span className="font-semibold text-purple-600">BrightHorizon Infotech</span> delivers
                next-generation SAP Fiori applications that transform complex SAP processes into
                simple, role-based, and mobile-first experiences.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-4">
                Using Fiori Elements, Freestyle development, and SAPUI5, we design responsive,
                intuitive interfaces that boost user adoption and productivity across devices.
              </p>

              <p className="text-lg leading-relaxed text-slate-700">
                With <span className="font-semibold text-purple-600">BrightHorizon Infotech</span>,
                your SAP users get a delightful, consumer-grade experience that drives efficiency.
              </p>
            </div>

            {/* Navigation Buttons: Prev | All Services | Next */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12 items-center">
              {/* Prev: SAP CPI */}
              <button
                onClick={() => navigate("/services/sap-cpi")}
                className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <ArrowLeft size={20} /> Prev: SAP CPI
              </button>

              {/* All Services (Center) */}
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                All Services
              </button>

              {/* Next: SAP Cloud Platform */}
              <button
                onClick={() => navigate("/services/sap-cloud-platform")}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Next: SAP Cloud Platform <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        <div className="bg-gray-100 border-t border-gray-200 py-8"></div>
      </div>
    </>
  );
};

export default SapFiori;