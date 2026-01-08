import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Introduction = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ======== HERO IMAGE (BEHIND NAVBAR, FULL HEIGHT) ======== */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* ======== MAIN CONTENT (STARTS BELOW NAVBAR) ======== */}
      <div className="relative min-h-screen flex flex-col pt-20">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center text-white z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
              Introduction
            </h1>
            <p className="text-lg md:text-2xl opacity-95 max-w-3xl mx-auto drop-shadow-md">
              Empowering Businesses Through Innovation and Technology
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-16 px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-gray-800 leading-relaxed space-y-8">
            {/* Intro Paragraphs */}
            <p className="text-lg animate-fadeIn">
              <span className="font-semibold text-blue-600">
                At BrightHorizon Infotech,
              </span>{" "}
              we are driven by passion and a strong desire to make a positive
              impact in the world of technology.
            </p>

            <p className="text-lg animate-fadeIn animation-delay-200">
              We are dedicated to providing cutting-edge solutions that enable
              businesses to streamline processes, enhance productivity, and drive
              growth.
            </p>

            <p className="text-lg animate-fadeIn animation-delay-400">
              We understand the challenges faced by businesses today, and we
              strive to provide customized solutions that cater to their specific
              needs.
            </p>

            {/* Company Summary */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-100">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-5">
                Company Summary
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                BrightHorizon Infotech is a consulting firm providing SAP services
                to businesses across various industries. With extensive experience
                in SAP implementation, custom development, support services, and
                corporate trainings, we help our clients streamline their business
                operations, reduce costs, and enhance productivity.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team of certified SAP professionals is committed to delivering
                high-quality solutions tailored to meet the specific needs of our
                clients, ensuring long-term success and sustainable growth.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="bg-gray-100 border-t border-gray-200 py-8 text-center">
          <button
            onClick={() => navigate("/vision")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Next: Vision <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Introduction;