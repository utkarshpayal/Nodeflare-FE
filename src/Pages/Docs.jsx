import { Link } from "react-router-dom";
import { Search, Book, Code, Zap, Server, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
const Docs = () => {
  const sections = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Start",
      description: "Get up and running with HyperCompute in minutes",
      links: ["Installation", "First GPU Rental", "API Authentication"]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API Reference",
      description: "Complete API documentation and examples",
      links: ["REST API", "GraphQL", "WebSocket Events"]
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "GPU Management",
      description: "Learn how to provision and manage GPU instances",
      links: ["Instance Types", "Scaling", "Monitoring"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security",
      description: "Best practices for secure GPU computing",
      links: ["Authentication", "Encryption", "Access Control"]
    }
  ];
const [showSpinner, setShowSpinner] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (showSpinner) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
    
      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-green-600">Documentation</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Everything you need to build with HyperCompute's P2P GPU network</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search documentation..." className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 hover:border-green-500 rounded-lg p-6 transition-all group">
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-green-400 group-hover:scale-110 transition-transform">{section.icon}</div>
                <h3 className="text-white text-lg font-semibold group-hover:text-green-400">{section.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-gray-300 hover:text-green-400 flex items-center">
                      <Book className="w-4 h-4 mr-2" /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured <span className="text-green-400">Guides</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Getting Started", "ML Workloads", "Cost Optimization"].map((title, i) => (
              <div key={i} className="bg-black rounded-lg p-6 border border-gray-700 hover:border-green-500">
                <h3 className="text-xl font-semibold mb-3 text-green-400">{title}</h3>
                <p className="text-gray-300 mb-4">
                  {i === 0 && "Complete guide to setting up your first GPU instance and running your first workload."}
                  {i === 1 && "Optimize your machine learning workflows with distributed GPU computing."}
                  {i === 2 && "Best practices for minimizing costs while maximizing performance."}
                </p>
                <a href="#" className="text-green-400 hover:underline">Read more →</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
