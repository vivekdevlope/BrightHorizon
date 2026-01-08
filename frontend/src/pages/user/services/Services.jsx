// src/pages/user/Services.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Code,
  Wrench,
  BarChart3,
  Settings,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Database,
  FileCode,
  Cpu,
  Headphones,
  ArrowRightCircle, // New icon for SAP Migration
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // === CATEGORIZED SERVICES ===
  const serviceCategories = [
    {
      category: "SAP BTP & Cloud",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      services: [
        {
          title: "SAP BTP Development",
          desc: "Build scalable, secure, and intelligent cloud applications using SAP Business Technology Platform.",
          icon: <Cpu className="w-8 h-8" />,
          features: [
            "Extension development",
            "Custom workflows & automation",
            "Integration with SAP & non-SAP systems",
          ],
          path: "/services/sap-btp",
        },
        {
          title: "SAP CPI",
          desc: "Seamless cloud integration between SAP and third-party systems using SAP Cloud Platform Integration.",
          icon: <Database className="w-8 h-8" />,
          features: [
            "Pre-built connectors",
            "Real-time data sync",
            "API-led connectivity",
          ],
          path: "/services/sap-cpi",
        },
        {
          title: "SAP Fiori",
          desc: "Modern, role-based user experiences with responsive SAP Fiori apps for desktop and mobile.",
          icon: <Smartphone className="w-8 h-8" />,
          features: [
            "UI/UX modernization",
            "Fiori Elements & Freestyle",
            "Mobile-first design",
          ],
          path: "/services/sap-fiori",
        },
        {
          title: "SAP Cloud Platform",
          desc: "Leverage SAP’s PaaS for innovation, app development, and cloud-native extensions.",
          icon: <Cloud className="w-8 h-8" />,
          features: [
            "Cloud Foundry & Kyma",
            "Microservices architecture",
            "DevOps & CI/CD pipelines",
          ],
          path: "/services/sap-cloud-platform",
        },
        {
          title: "Product Engineering",
          desc: "End-to-end product lifecycle management from ideation to deployment using SAP tools.",
          icon: <FileCode className="w-8 h-8" />,
          features: [
            "Agile development",
            "Prototyping & MVP",
            "Quality assurance",
          ],
          path: "/services/product-engineering",
        },
        {
          title: "Mobile Development",
          desc: "Native and hybrid mobile apps integrated with SAP backend for field and remote users.",
          icon: <Smartphone className="w-8 h-8" />,
          features: [
            "SAP Mobile Services",
            "Offline capabilities",
            "Push notifications",
          ],
          path: "/services/mobile-development",
        },
      ],
    },
    {
      category: "Business Analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-600",
      services: [
        {
          title: "SAP Analytics Cloud",
          desc: "Unified analytics with planning, predictive, and BI capabilities in the cloud.",
          icon: <BarChart3 className="w-8 h-8" />,
          features: [
            "Live data connections",
            "AI-driven insights",
            "Collaborative planning",
          ],
          path: "/services/sap-analytics-cloud",
        },
        {
          title: "On-Premise Analytics",
          desc: "Powerful reporting and dashboards using SAP BW, BO, and embedded analytics.",
          icon: <Database className="w-8 h-8" />,
          features: [
            "SAP BW/4HANA",
            "Crystal Reports",
            "Lumira Designer",
          ],
          path: "/services/on-premise-analytics",
        },
        {
          title: "Cloud Analytical Services",
          desc: "Scalable cloud analytics with real-time insights and self-service BI.",
          icon: <Cloud className="w-8 h-8" />,
          features: [
            "Data warehousing in cloud",
            "Self-service dashboards",
            "Predictive analytics",
          ],
          path: "/services/cloud-analytics",
        },
      ],
    },
    {
      category: "SAP Implementation & Support Services",
      icon: <Settings className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      services: [
        {
          title: "SAP ERP (ECC & S/4HANA)",
          desc: "Core ERP implementation, migration, and optimization for finance, logistics, and operations.",
          icon: <Cpu className="w-8 h-8" />,
          features: [
            "S/4HANA greenfield & brownfield",
            "Process re-engineering",
            "Global rollouts",
          ],
          path: "/services/sap-erp",
        },
        {
          title: "SAP Migration",
          desc: "Seamless and risk-mitigated transition from SAP ECC to S/4HANA or cloud with minimal business disruption.",
          icon: <ArrowRightCircle className="w-8 h-8" />,
          features: [
            "Brownfield, Greenfield & Selective Data Transition",
            "Data cleansing & conversion",
            "Custom code remediation & optimization",
            "Post-migration hypercare support",
          ],
          path: "/services/sap-migration",
        },
        {
          title: "SAP CRM & Loyalty",
          desc: "Customer relationship management with loyalty programs and omnichannel engagement.",
          icon: <Headphones className="w-8 h-8" />,
          features: [
            "Customer 360° view",
            "Loyalty management",
            "Service & sales automation",
          ],
          path: "/services/sap-crm",
        },
      ],
    },
  ];

  // === EXISTING SERVICES (Kept as-is) ===
  const legacyServices = [
    {
      title: "Staffing Augmentation",
      desc: "Providing top SAP talent to meet your specific business requirements and ensure long-term project success.",
      icon: <Users className="w-8 h-8" />,
      features: [
        "SAP-certified consultants",
        "On-demand staffing",
        "Skilled resource allocation",
      ],
      color: "from-indigo-500 to-blue-600",
      path: "/services/staffing-augmentation",
    },
    {
      title: "Application Management & Support",
      desc: "Comprehensive SAP application maintenance and support to ensure reliability, performance, and scalability.",
      icon: <Wrench className="w-8 h-8" />,
      features: [
        "System monitoring & optimization",
        "Incident & problem management",
        "Performance tuning & upgrades",
      ],
      color: "from-green-500 to-teal-500",
      path: "/services/application-support",
    },
    {
      title: "Application Development",
      desc: "Custom SAP application development to enhance business efficiency and drive digital transformation.",
      icon: <Code className="w-8 h-8" />,
      features: [
        "Custom module development",
        "Integration with existing SAP systems",
        "End-to-end implementation support",
      ],
      color: "from-indigo-500 to-purple-500",
      path: "/services/application-development",
    },
  ];

  // Rest of the component remains exactly the same...
  return (
    <>
      {/* HERO IMAGE */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={sectionRef} className="relative min-h-screen pt-20">
        {/* HERO SECTION */}
        <section className="flex items-center justify-center px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-white z-10 max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-5 h-5" />
              Our Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-xl">
              Empowering Businesses with SAP Expertise
            </h1>
            <p className="text-xl max-w-3xl mx-auto drop-shadow-md opacity-95">
              BrightHorizon Infotech delivers end-to-end SAP solutions — from cloud innovation to functional excellence.
            </p>
          </motion.div>
        </section>

        {/* SERVICES GRID - CATEGORIZED */}
        <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* Render Categorized Services */}
            {serviceCategories.map((cat, catIdx) => (
              <div key={catIdx}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: catIdx * 0.2, duration: 0.6 }}
                  className="flex items-center gap-3 mb-10"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg`}>
                    {cat.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">{cat.category}</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.services.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: (catIdx + 1) * 0.2 + i * 0.1, duration: 0.6 }}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${cat.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {service.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                        <p className="text-slate-600 mb-6 flex-grow">{service.desc}</p>

                        <ul className="space-y-3 mb-8">
                          {service.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              {feat}
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => navigate(service.path)}
                          className="mt-auto inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                        >
                          Learn More
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Legacy Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: serviceCategories.length * 0.2, duration: 0.6 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Core Operations</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {legacyServices.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: (serviceCategories.length + 1) * 0.2 + i * 0.1, duration: 0.6 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {service.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                      <p className="text-slate-600 mb-6 flex-grow">{service.desc}</p>

                      <ul className="space-y-3 mb-8">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => navigate(service.path)}
                        className="mt-auto inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white max-w-4xl mx-auto shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform with SAP?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let’s co-create your digital future with intelligent SAP solutions.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Free Consultation
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Services;