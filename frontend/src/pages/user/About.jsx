import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Target, Zap, Globe, Award, TrendingUp } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Elena Martinez",
    role: "Chief Digital Officer",
    bio: "15+ years leading digital transformation at Fortune 500 companies.",
    avatar: "EM",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "James Chen",
    role: "Principal Architect",
    bio: "Designed cloud systems at Google & AWS. Expert in scalable infrastructure.",
    avatar: "JC",
    color: "from-slate-600 to-slate-800",
  },
  {
    name: "Sarah Kim",
    role: "Head of Cybersecurity",
    bio: "Former security lead at a top financial institution. AI-driven threat detection pioneer.",
    avatar: "SK",
    color: "from-blue-600 to-indigo-700",
  },
  {
    name: "Michael Roberts",
    role: "Chief Data Officer",
    bio: "Built data platforms for 3 unicorn startups. Passionate about data culture.",
    avatar: "MR",
    color: "from-slate-500 to-gray-700",
  },
];

const stats = [
  { label: "Clients Served", value: 150, suffix: "+" },
  { label: "Projects Delivered", value: 300, suffix: "+" },
  { label: "Years of Excellence", value: 12, suffix: "" },
  { label: "Team Members", value: 45, suffix: "+" },
];

const CountUp = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const duration = 2000;
  const steps = 60;

  useEffect(() => {
    let start = 0;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <span className="text-4xl md:text-5xl font-bold text-blue-600">
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-900 pt-32 pb-24 overflow-hidden -mt-16">
        <div className="absolute inset-0 bg-black/20 -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-16 ">
            We Turn Vision Into <span className="text-blue-400">Reality</span>
          </h1>
          <p className="text-xl mt-14 md:text-2xl mb-8 max-w-4xl mx-auto text-blue-100">
            BrightHoRIZon is a strategic IT partner for enterprises ready to lead in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-9 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-4 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center md:text-left animate-fadeIn">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 text-center">About Us</h2>
          <div className="text-lg text-slate-700 leading-relaxed space-y-6">
            <p>I am writing to introduce our company : <span className="font-semibold text-blue-600">BrightHorizon Infotech Private Limited </span> is a consulting firm providing SAP services to business across various industries. 
We provide following SAP services, let us know if you have any such requirements from the below:

              
            </p>
            <p>
              <span className="font-semibold text-blue-600">We provide following SAP services</span>, let us know if you have any such requirements from the below:
            </p>
            <p className="ml-12">
              <ol>
                <li>1.	Staffing - All SAP Functional & Technical resources / On-site & Offshore.</li>
                <li>2.	SAP Rise or Grow projects sub-contract - End to End implementation.</li>
                <li>3.	Project management for SAP Projects</li>
                <li>4.	CR Tickets</li>
                <li>5.	AMS on Sub-Contract on Man-days or Hourly basis</li>
                <li>6.	Application Development</li>
                <li>7.	SAP Support, Upgradation & Migration</li>
              </ol>
            </p>
            <p>
              Please find a snapshot about <span className="font-semibold text-blue-600">BrightHorizon Infotech Private Limited </span>
            </p>
            <ul className="ml-12">
              <li>•	Growing SAP Local company in India</li>
<li>•	Executed multiple SAP projects
</li>
<li>•	We sell and implement SAP projects and services.</li>
<li>•	We support some of the prestigious clients like Newell Rubber maid, Genentech, Bosch, Morgan foods, Vista prints,<br/> John deere, Emirates Global Aluminium, Stanley Blackdecker, Saudi Ceramics, Interstate batteries, Systems Silicon Manufacturing Etc.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-10 rounded-2xl border border-blue-100">
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-700 leading-relaxed">
              To empower enterprises with innovative technology solutions that drive measurable business outcomes —
              from cost reduction to market leadership.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-10 rounded-2xl border border-slate-200">
            <Globe className="w-12 h-12 text-slate-700 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-700 leading-relaxed">
              A world where every organization operates at the intersection of strategy, technology, and human potential.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="group">
                <div className="mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      {/* <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Story</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Founded in 2013, BrightHoRIZon began with a simple belief: technology should serve strategy, not the other way around.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2013–2016</h3>
              <p className="text-slate-600">Started as a boutique cloud consulting firm helping startups migrate to AWS.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2017–2020</h3>
              <p className="text-slate-600">Expanded into enterprise transformation, security, and AI strategy.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2021–Today</h3>
              <p className="text-slate-600">Recognized as a leader in digital strategy. Serving Fortune 500 and beyond.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Team */}
      {/* <section className="py-20 bg-slate-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-slate-600">Experts who’ve been in your shoes — and know the path forward.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div
                  className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-2xl font-bold`}
                >
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Client First</h3>
              <p className="text-slate-600">Your success is our success. We measure ourselves by your outcomes.</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Strategic Precision</h3>
              <p className="text-slate-600">No fluff. Every recommendation is data-backed and ROI-focused.</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Relentless Execution</h3>
              <p className="text-slate-600">We don’t just advise — we deliver, iterate, and scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-slate-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let’s build the future together. Schedule a free strategy session today.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            Get Started
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
