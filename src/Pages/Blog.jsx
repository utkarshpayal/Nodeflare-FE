import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "The Future of Decentralized GPU Computing",
    excerpt: "How peer-to-peer GPU networks are revolutionizing AI and machine learning workloads across the globe.",
    author: "Alex Chen",
    date: "May 25, 2025",
    readTime: "8 min read"
  };

  const blogPosts = [/* same as before */];
  const categories = ["All", "Tutorial", "Analysis", "Security", "Guide", "Use Case", "Benchmark"];

  return (
    <div className="min-h-screen bg-black text-white">
     

      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-green-400">Blog</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Latest insights, tutorials, and updates from the HyperCompute team</p>
        </div>

        <div className="bg-gray-900 border border-gray-700 mb-16 rounded-lg overflow-hidden md:flex">
          <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <TrendingUp className="w-24 h-24 text-black opacity-20" />
          </div>
          <div className="md:w-1/2 p-8">
            <span className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-semibold">Featured</span>
            <h2 className="text-2xl font-bold mt-4 hover:text-green-400 cursor-pointer">{featuredPost.title}</h2>
            <p className="text-gray-300 mt-4 mb-6">{featuredPost.excerpt}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{featuredPost.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featuredPost.date}</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded inline-flex items-center">
              Read More <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <button key={category} className={`px-4 py-2 rounded ${category === "All" ? "bg-green-500 text-black" : "border border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 hover:border-green-500 rounded-lg p-6 transition-all group">
              <span className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">{post.category}</span>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-green-400 cursor-pointer">{post.title}</h3>
              <p className="text-gray-300 mt-2 mb-4">{post.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <button className="w-full mt-4 text-green-400 hover:text-black hover:bg-green-500 px-4 py-2 rounded transition-colors inline-flex items-center justify-center">
                Read Article <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-lg p-8 mt-16 text-center border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with <span className="text-green-400">HyperCompute</span></h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Get the latest updates on P2P GPU computing, new features, and industry insights delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-green-500" />
            <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-2 rounded">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
