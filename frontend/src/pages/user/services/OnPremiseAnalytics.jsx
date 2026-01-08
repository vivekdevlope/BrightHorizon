// src/pages/user/OnPremiseAnalytics.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Database, ArrowLeft, ArrowRight } from "lucide-react";

const OnPremiseAnalytics = () => {
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
            "url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80')",
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
              On-Premise Analytics
            </h1>
            <p className="text-lg md:text-2xl opacity-95 max-w-3xl mx-auto drop-shadow-md">
              Powerful reporting and dashboards on your infrastructure.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-16 px-6 md:px-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 transition-all hover:shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8" />
                </div>
              </div>

              <h2 className="text-3xl font-semibold text-center mb-8 text-slate-800">
                On-Premise Analytics
              </h2>

              <p className="text-lg leading-relaxed text-slate-700 mb-4">
                <span className="font-semibold text-indigo-600">BrightHorizon Infotech</span> delivers
                robust on-premise analytics solutions using SAP BW/4HANA, BusinessObjects,
                and embedded analytics.
              </p>

              <p className="text-lg leading-relaxed text-slate-700 mb-4">
                Build enterprise-grade data warehouses, design interactive Crystal Reports,
                and deploy self-service dashboards with Lumira — all hosted securely on your
                infrastructure with full control and compliance.
              </p>

              <p className="text-lg leading-relaxed text-slate-700">
                With <span className="font-semibold text-indigo-600">BrightHorizon Infotech</span>,
                unlock deep insights from your SAP data without moving to the cloud.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12 items-center">
              {/* Prev */}
              <button
                onClick={() => navigate("/services/sap-analytics-cloud")}
                className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <ArrowLeft size={20} /> Prev: SAP Analytics Cloud
              </button>

              {/* Back to Services (Center) */}
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Back to All Services
              </button>

              {/* Next */}
              <button
                onClick={() => navigate("/services/cloud-analytical-services")}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Next: Cloud Analytical Services <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        <div className="bg-gray-100 border-t border-gray-200 py-8"></div>
      </div>
    </>
  );
};

export default OnPremiseAnalytics;