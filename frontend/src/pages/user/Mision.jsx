import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Mission = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ======== HERO IMAGE (BEHIND NAVBAR, FULL HEIGHT) ======== */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521790361543-f645cf042ec4?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Dark gradient overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* ======== MAIN CONTENT (STARTS BELOW NAVBAR) ======== */}
      <div className="relative min-h-screen flex flex-col pt-20">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center text-white z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
              Our Mission
            </h1>
            <p className="text-lg md:text-2xl opacity-95 max-w-3xl mx-auto drop-shadow-md">
              Empowering Businesses with Tailored SAP Solutions
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-16 px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-gray-800 leading-relaxed space-y-8">
            <p className="text-lg animate-fadeIn">
              At{" "}
              <span className="font-semibold text-blue-600">
                BrightHorizon Infotech
              </span>
              , our mission is to provide high-quality SAP consulting services
              that empower businesses to achieve their goals.
            </p>

            <p className="text-lg animate-fadeIn animation-delay-200">
              We strive to be a trusted partner that delivers innovative and
              effective solutions tailored to each client's unique needs and
              requirements.
            </p>

            <p className="text-lg animate-fadeIn animation-delay-400">
              We are committed to building strong and lasting relationships with
              our clients, and we believe in delivering exceptional value and
              service every step of the way.
            </p>

            <p className="text-lg animate-fadeIn animation-delay-600">
              Our ultimate goal is to help our clients succeed by providing them
              with the expertise, technology, and support they need to thrive in
              today's fast-paced and ever-changing business landscape.
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="bg-gray-100 border-t border-gray-200 py-8 text-center">
          <button
            onClick={() => navigate("/about")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Next: About Us <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Mission;