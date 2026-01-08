// src/pages/user/Technologies.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Cpu, 
  Code2, 
  Database, 
  Cloud, 
  Wrench, 
  Package, 
  Headphones, 
  DollarSign, 
  ShoppingCart, 
  ArrowRightCircle,
  Factory,              // SAP PP (Production Planning)
  Users,                // SAP HCM/HR
  Award,                // SAP SuccessFactors (talent/recognition)
  ClipboardCheck,       // SAP QM (Quality Management)
  Truck,                // SAP EWM (Extended Warehouse Management)
  ArrowRight 
} from "lucide-react";

const Technologies = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const techs = [
    {
      name: "SAP ECC",
      icon: <Database className="w-10 h-10" />,
      desc: "Proven enterprise resource planning solution for integrated business processes and efficient operations.",
    },
    {
      name: "SAP S/4HANA",
      icon: <Cpu className="w-10 h-10" />,
      desc: "Next-generation ERP suite powered by in-memory computing, offering real-time analytics and scalability.",
    },
    {
      name: "SAP Migration",
      icon: <ArrowRightCircle className="w-10 h-10" />,
      desc: "Expert-led migration services from legacy systems (ECC) to modern SAP S/4HANA with minimal disruption and maximum value realization.",
    },
    {
      name: "SAP Ariba",
      icon: <Cloud className="w-10 h-10" />,
      desc: "Comprehensive procurement and supply chain collaboration platform for enhanced business efficiency.",
    },
    {
      name: "SAP ABAP",
      icon: <Code2 className="w-10 h-10" />,
      desc: "Advanced Business Application Programming – SAP's proprietary language for custom development and extensions.",
    },
    {
      name: "SAP Plant Maintenance (PM)",
      icon: <Wrench className="w-10 h-10" />,
      desc: "Streamlines asset maintenance, preventive planning, and work order management for operational reliability.",
    },
    {
      name: "SAP MM",
      icon: <Package className="w-10 h-10" />,
      desc: "Materials Management module optimizing procurement, inventory control, and material flow across the supply chain.",
    },
    {
      name: "SAP PP",
      icon: <Factory className="w-10 h-10" />,
      desc: "Production Planning and Control module for efficient manufacturing planning, scheduling, and execution.",
    },
    {
      name: "SAP QM",
      icon: <ClipboardCheck className="w-10 h-10" />,
      desc: "Quality Management module ensuring product quality through inspection planning, defect management, and compliance.",
    },
    {
      name: "SAP EWM",
      icon: <Truck className="w-10 h-10" />,
      desc: "Extended Warehouse Management for advanced warehouse operations, inventory tracking, and logistics optimization.",
    },
    {
      name: "SAP HCM / HR",
      icon: <Users className="w-10 h-10" />,
      desc: "Human Capital Management for payroll, personnel administration, time management, and organizational management.",
    },
    {
      name: "SAP SuccessFactors",
      icon: <Award className="w-10 h-10" />,
      desc: "Cloud-based HCM suite for talent management, employee engagement, performance, and learning & development.",
    },
    {
      name: "Service Management",
      icon: <Headphones className="w-10 h-10" />,
      desc: "Customer Service module enabling efficient service operations, warranty management, and field support.",
    },
    {
      name: "SAP FICO",
      icon: <DollarSign className="w-10 h-10" />,
      desc: "Core financial accounting (FI) and controlling (CO) module for real-time financial reporting and compliance.",
    },
    {
      name: "SAP SD",
      icon: <ShoppingCart className="w-10 h-10" />,
      desc: "Sales and Distribution module managing order-to-cash processes, pricing, shipping, and billing.",
    },
  ];

  return (
    <>
      {/* HERO IMAGE (BEHIND NAVBAR) */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* MAIN CONTENT (STARTS BELOW NAVBAR) */}
      <div className="relative min-h-screen flex flex-col pt-20">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 md:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center text-white z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
              Technologies We Excel In
            </h1>
            <p className="text-lg md:text-2xl opacity-95 max-w-3xl mx-auto drop-shadow-md">
              Empowering enterprises with leading-edge SAP platforms and tools.
            </p>
          </div>
        </section>

        {/* Technology Cards */}
        <section className="bg-white py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {techs.map((tech, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-6">
                      {tech.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{tech.name}</h3>
                    <p className="text-slate-600 text-base">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="bg-gray-100 border-t border-gray-200 py-8 text-center">
          <button
            onClick={() => navigate("/our-clients")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Next: Our Clients <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Technologies;