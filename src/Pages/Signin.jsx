
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateLogin();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Login submitted:', loginData);
      alert('Login successful!');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 border border-green-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 border border-green-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 border border-green-600 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-green-500 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-green-800/5"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Form Container */}
        <div className="bg-gray-900/90 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-green-500/10 rounded-full mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">H</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sign in to access your<br />
              <span className="text-green-400 font-semibold">P2P GPU marketplace</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="group">
              <label className="block text-sm font-medium mb-2 text-gray-300 group-focus-within:text-green-400 transition-colors">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={`w-full px-4 py-3 bg-gray-800/80 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:bg-gray-800 placeholder-gray-500 ${
                  errors.email ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-700 hover:border-green-500/50'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-medium mb-2 text-gray-300 group-focus-within:text-green-400 transition-colors">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={`w-full px-4 py-3 bg-gray-800/80 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:bg-gray-800 placeholder-gray-500 ${
                  errors.password ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-700 hover:border-green-500/50'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                  className="mt-1 w-5 h-5 text-green-500 bg-gray-800 border-gray-600 rounded-md focus:ring-green-500 focus:ring-2 transition-all"
                />
                <label className="text-sm text-gray-300 leading-relaxed">
                  Remember me for 30 days
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98]"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-2">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup"
                  className="text-green-400 hover:text-green-300 font-semibold transition-colors hover:underline underline-offset-2"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <span className="text-green-400 hover:text-green-300 text-sm cursor-pointer transition-colors hover:underline underline-offset-2">
                Forgot your password?
              </span>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur border border-green-500/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-400 text-sm">
              Join <span className="text-green-400 font-semibold">10,000+</span> developers already using our P2P GPU network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;