// src/pages/LearnMore.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LearnMore = () => {
  const features = [
    {
      title: "Virtual Training",
      description: "Access professional trainers from anywhere with live video sessions",
      icon: "🎥"
    },
    {
      title: "Custom Meal Plans",
      description: "Personalized nutrition guidance tailored to your goals",
      icon: "🥗"
    },
    {
      title: "Class Scheduling",
      description: "Book and manage your fitness classes with ease",
      icon: "📅"
    },
    {
      title: "Workout Library",
      description: "Extensive collection of workout videos and routines",
      icon: "💪"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transform Your Coaching Business
          </h1>
          <p className="text-xl mb-8">
            Gain access to intuitive dashboards and effortlessly manage a strong, loyal client base.
          </p>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Everything You Need to Succeed</h2>
            <p className="text-gray-600 mb-4">
              Our platform provides trainers with everything needed to create, manage, and grow their online fitness business. With just 8% platform fee, you keep more of what you earn.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>{feature.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Platform Highlights</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="text-blue-500">📈</span>
                <span>Only 8% platform fee</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-blue-500">🌐</span>
                <span>Global reach potential</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-blue-500">💰</span>
                <span>Flexible pricing options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Feature Set</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Features from your original content */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Client Management</h3>
              <ul className="space-y-2">
                <li>Detailed client profiles</li>
                <li>Progress tracking & visualizations</li>
                <li>Automated check-ins</li>
                <li>Direct messaging tools</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Workout Management</h3>
              <ul className="space-y-2">
                <li>Custom workout builder</li>
                <li>Exercise video library</li>
                <li>Video content hosting</li>
                <li>Real-time progress tracking</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Business Tools</h3>
              <ul className="space-y-2">
                <li>Secure payment processing</li>
                <li>Class scheduling system</li>
                <li>Revenue tracking & insights</li>
                <li>Marketing & engagement tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
    <div className="container mx-auto px-6 py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
    <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Basic Tier */}
        <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-5xl font-bold text-blue-600 mb-4">$49.99</p>
            <p className="text-gray-600 mb-6">per month + 8% client fee</p>
            <ul className="text-gray-700 mb-6">
            <li className="mb-2">✔ 10 Projects</li>
            <li className="mb-2">✔ Basic Analytics</li>
            <li className="mb-2">✔ Email Support</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Choose Basic
            </button>
        </div>
        </div>

        {/* Professional Tier */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500 transform scale-105">
        <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Professional</h3>
            <p className="text-5xl font-bold text-blue-600 mb-4">$99.99</p>
            <p className="text-gray-600 mb-6">per month + 5% client fee</p>
            <ul className="text-gray-700 mb-6">
            <li className="mb-2">✔ 50 Projects</li>
            <li className="mb-2">✔ Advanced Analytics</li>
            <li className="mb-2">✔ Priority Email Support</li>
            <li className="mb-2">✔ Team Collaboration</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Choose Professional
            </button>
        </div>
        </div>

        {/* AI Premium Tier */}
        <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">AI Premium</h3>
            <p className="text-5xl font-bold text-blue-600 mb-4">$199.99</p>
            <p className="text-gray-600 mb-6">per month + 3% client fee</p>
            <ul className="text-gray-700 mb-6">
            <li className="mb-2">✔ Unlimited Projects</li>
            <li className="mb-2">✔ AI-Driven Insights</li>
            <li className="mb-2">✔ 24/7 Support</li>
            <li className="mb-2">✔ Dedicated Account Manager</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Choose AI Premium
            </button>
        </div>
        </div>
    </div>

    {/* Revenue Calculator */}
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-12">
        <h3 className="text-2xl font-bold mb-4">Revenue Calculator</h3>
        <p className="text-gray-600 mb-6">
        Estimate your potential revenue based on the number of clients you serve each month.
        </p>
        <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
            <label className="block text-gray-700 font-bold mb-2">Number of Clients</label>
            <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 50"
            />
            </div>
            <div>
            <label className="block text-gray-700 font-bold mb-2">Average Fee per Client ($)</label>
            <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 100"
            />
            </div>
        </div>
        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
            Calculate Revenue
        </button>
        </form>
    </div>
    </div>


      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg mb-8">
              Join thousands of fitness professionals who are growing their business with our platform.
            </p>
            <div className="space-x-4">
              <Link 
                to="/register" 
                className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block"
              >
                Create Account
              </Link>
              <Link 
                to="/" 
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors inline-block"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-16">
        {/* Your original FAQ content */}
      </div>
    </div>
  );
};

export default LearnMore;