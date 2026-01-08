// src/pages/user/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  Code,
  Cloud,
  Shield,
  Zap,
  Globe,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Quote,
  Calendar,
  User,
} from "lucide-react";

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

const Home = () => {
  const navigate = useNavigate();
  const missionRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const blogsRef = useRef(null);

  const [typedText, setTypedText] = useState("");
  const [isMissionVisible, setIsMissionVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const [isBlogsVisible, setIsBlogsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [blogs, setBlogs] = useState([]);

  // Carousel states
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.pexels.com/photos/6476261/pexels-photo-6476261.jpeg",
      title: "Transform Your Business",
      subtitle: "With A Trusted Technology Partner",
      text: "We deliver innovative IT solutions with deep industry expertise, helping enterprises scale, secure, and lead in the digital age.",
      buttonText: "Explore Services",
      buttonAction: () => navigate("/services"),
    },
    {
      image: "https://images.pexels.com/photos/110469/pexels-photo-110469.jpeg",
      title: "Empower Your Enterprise",
      subtitle: "With SAP Excellence",
      text: "BrightHorizon Infotech provides tailored SAP consulting to drive efficiency and innovation in your business operations.",
      buttonText: "Contact Us",
      buttonAction: () => navigate("/contact"),
    },
    {
      image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
      title: "Innovate and Thrive",
      subtitle: "In the Digital Era",
      text: "Our expert team helps you navigate complex IT challenges with cutting-edge solutions and unwavering support.",
      buttonText: "Explore Services",
      buttonAction: () => navigate("/services"),
    },
  ];

  // === FETCH BLOGS FROM BACKEND ===
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();

        console.log("Fetched blogs:", data);

        if (Array.isArray(data)) {
          setBlogs(data.slice(0, 3));
        } else if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs.slice(0, 3));
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const fullText = `At BrightHorizon Infotech, our mission is to 
provide high-quality SAP consulting services that 
empower businesses to achieve their goals. 
We strive to be a trusted partner that delivers 
innovative and effective solutions tailored to 
each client's unique needs and requirements. 
We are committed to building strong and lasting 
relationships with our clients, and we believe in 
delivering exceptional value and service every 
step of the way. 
Our ultimate goal is to help our clients succeed 
by providing them with the expertise, 
technology, and support they need to thrive in 
today's fast-paced and ever-changing business 
landscape.`;

  // === INTERSECTION OBSERVER ===
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === missionRef.current && entry.isIntersecting)
            setIsMissionVisible(true);
          if (entry.target === servicesRef.current && entry.isIntersecting)
            setIsServicesVisible(true);
          if (entry.target === testimonialsRef.current && entry.isIntersecting)
            setIsTestimonialsVisible(true);
          if (entry.target === blogsRef.current && entry.isIntersecting)
            setIsBlogsVisible(true);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    [missionRef, servicesRef, testimonialsRef, blogsRef].forEach(
      (ref) => ref.current && observer.observe(ref.current)
    );
    return () => observer.disconnect();
  }, []);

  // === TYPEWRITER EFFECT ===
  useEffect(() => {
    if (isMissionVisible) {
      let i = 0;
      const type = () => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
          setTimeout(type, 20);
        }
      };
      setTimeout(type, 300);
    }
  }, [isMissionVisible]);

  // === CAROUSEL AUTO SLIDE ===
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // === STATIC DATA ===
  const services = [
    {
      title: "Custom Software Development",
      desc: "Tailored web & mobile applications built with React, Node.js, Python, and modern frameworks.",
      icon: <Code className="w-7 h-7" />,
    },
    {
      title: "Cloud Solutions & DevOps",
      desc: "Scalable, secure, and cost-optimized infrastructure with AWS, Azure, Docker, and CI/CD pipelines.",
      icon: <Cloud className="w-7 h-7" />,
    },
    {
      title: "Cybersecurity & Compliance",
      desc: "Penetration testing, encryption, GDPR, SOC 2 — protect your data and reputation.",
      icon: <Shield className="w-7 h-7" />,
    },
    {
      title: "AI & Automation",
      desc: "Machine learning, predictive analytics, and intelligent automation to drive efficiency.",
      icon: <Zap className="w-7 h-7" />,
    },
    {
      title: "Digital Transformation",
      desc: "Legacy system modernization, API integration, and microservices architecture.",
      icon: <Globe className="w-7 h-7" />,
    },
    {
      title: "Data Analytics & BI",
      desc: "Power BI, Tableau, real-time dashboards — turn data into actionable insights.",
      icon: <BarChart3 className="w-7 h-7" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CEO, TechFlow",
      text: "BrightHorizon transformed our legacy system into a modern, scalable platform. Their expertise and dedication are unmatched.",
      avatar: "S",
    },
    {
      name: "James Carter",
      role: "CTO, InnovateX",
      text: "We reduced deployment time by 70% with their DevOps pipeline. True partners in innovation.",
      avatar: "J",
    },
    {
      name: "Priya Singh",
      role: "Director, GlobalBank",
      text: "Their AI-driven fraud detection saved us millions. Professional, proactive, and brilliant.",
      avatar: "P",
    },
  ];

  // === AUTO TESTIMONIALS ROTATE ===
  useEffect(() => {
    if (!isTestimonialsVisible) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isTestimonialsVisible]);

  return (
    // FIXED: Added dark fallback background
    <div className="font-sans antialiased bg-slate-900">
      
      {/* === HERO CAROUSEL SECTION === */}
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 pt-16">
  {/* Background Image with Dark Overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
    style={{
      backgroundImage: `linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.01)), url(${slides[currentSlide].image})`,
      backgroundAttachment: "fixed",
    }}
  />

  {/* Text Content Directly on Image */}
  <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
      {slides[currentSlide].title}
      <br />
      <span className="text-3xl md:text-5xl font-light text-gray-200">
        {slides[currentSlide].subtitle}
      </span>
    </h1>
    <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
      {slides[currentSlide].text}
    </p>
    <div className="mt-10">
      <button
        onClick={slides[currentSlide].buttonAction}
        className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        {slides[currentSlide].buttonText}
        <ArrowDown className="w-5 h-5" />
      </button>
    </div>
  </div>

  {/* Navigation Arrows */}
  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors z-20"
  >
    <ChevronLeft className="w-10 h-10" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-colors z-20"
  >
    <ChevronRight className="w-10 h-10" />
  </button>

  {/* === CAROUSEL DOTS (NEW) === */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
</section>
      {/* === MISSION SECTION === */}
      <section ref={missionRef} className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-2xl p-10 md:p-14 shadow-lg transition-all duration-1000 ease-out ${
              isMissionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-slate-700 text-center leading-relaxed min-h-[120px]">
              {typedText}
              <span
                className={`inline-block w-0.5 h-7 bg-blue-600 ml-1 ${
                  isMissionVisible ? "animate-pulse" : ""
                }`}
              ></span>
            </p>
          </div>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section ref={servicesRef} className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "SAP ECC Implementation",
                desc: "Comprehensive SAP ECC deployment tailored to your business needs — from planning and configuration to integration and support.",
                icon: <Code className="w-7 h-7" />,
              },
              {
                title: "SAP S/4HANA Migration & Support",
                desc: "Upgrade from legacy systems to SAP S/4HANA with minimal disruption. We ensure a seamless transition, real-time analytics, and faster performance.",
                icon: <Globe className="w-7 h-7" />,
              },
              {
                title: "SAP Ariba Integration",
                desc: "Empower your procurement process with SAP Ariba for better supplier collaboration, sourcing, and spend management.",
                icon: <Cloud className="w-7 h-7" />,
              },
              {
                title: "SAP Consulting & Optimization",
                desc: "End-to-end consulting to enhance SAP performance, streamline workflows, and maximize ROI through best practices.",
                icon: <BarChart3 className="w-7 h-7" />,
              },
              {
                title: "Managed SAP Services",
                desc: "Round-the-clock support, monitoring, and maintenance for your SAP landscape — ensuring stability, security, and compliance.",
                icon: <Shield className="w-7 h-7" />,
              },
              {
                title: "Custom SAP Development",
                desc: "Tailor SAP modules and extensions to fit your enterprise workflows and unique business processes perfectly.",
                icon: <Zap className="w-7 h-7" />,
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-500 transform ${
                  isServicesVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-slate-800 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              View All Services
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* === OUR CLIENTS SECTION === */}
      <section ref={testimonialsRef} className="py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">
            Our Clients
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
            Trusted by leading global enterprises and innovative businesses who rely on us for SAP solutions and technology excellence.
          </p>

          <div className="relative w-full overflow-hidden">
            <div className="flex animate-slide">
              {[...Array(2)].map((_, loopIndex) => (
                <div key={loopIndex} className="flex gap-16 px-4">
                  {[
                    wLogo, aLogo, bLogo, cLogo, dLogo,
                    eLogo, fLogo, gLogo, hLogo, iLogo, jLogo,
                  ].map((logo, i) => (
                    <div key={i} className="flex items-center justify-center w-40 h-24 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-700">
                      <img
                        src={logo}
                        alt={`Client logo ${i + 1}`}
                        className="max-h-12 mx-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-slide {
            width: calc(200%);
            animation: slide 30s linear infinite;
          }
        `}</style>
      </section>

    </div>
  );
};

export default Home;