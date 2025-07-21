import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Brain, 
  BarChart3, 
  Shield, 
  Zap, 
  FileText,
  ArrowRight,
  CheckCircle,
  Star,
  Upload,
  Target,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Clock,
  Calculator,
  Building,
  DollarSign,
  Lock,
  Database,
  Award,
  TrendingDown,
  Eye,
  Download
} from 'lucide-react';

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentMetric, setCurrentMetric] = useState(0);

  const workflowSteps = [
    {
      step: '01',
      title: 'Upload Documents',
      description: 'Upload rent roll, T12, OM, or other CRE documents',
      icon: Upload,
      details: 'Supports PDF, Excel, CSV formats'
    },
    {
      step: '02',
      title: 'AI Analyzes Financials',
      description: 'AI extracts data and analyzes market comps instantly',
      icon: Brain,
      details: 'OCR + NLP powered analysis'
    },
    {
      step: '03',
      title: 'Get Underwriting Metrics',
      description: 'Instant NOI, IRR, Cap Rate, DSCR, and valuation',
      icon: Calculator,
      details: 'Professional-grade reports in 30 seconds'
    }
  ];

  const trustFeatures = [
    {
      icon: Lock,
      title: 'Bank-Grade Encryption',
      description: 'Your documents are encrypted and secure'
    },
    {
      icon: Database,
      title: 'No Data Stored',
      description: 'Files processed and deleted immediately'
    },
    {
      icon: Zap,
      title: 'Built with OpenAI',
      description: 'Powered by GPT-4 and advanced AI models'
    },
    {
      icon: Users,
      title: 'CRE Professional Ready',
      description: 'Used by analysts and investment firms'
    }
  ];

  const testimonials = [
    {
      name: 'Jane Davidson',
      role: 'Acquisitions Analyst, Capital Partners',
      text: 'Saved us 2 hours per deal – our analysts now focus only on top opportunities. The accuracy is incredible.',
      rating: 5,
      avatar: 'JD'
    },
    {
      name: 'Michael Chen',
      role: 'VP Investments, Metro Real Estate',
      text: 'PropPulse AI transformed our underwriting process. We can now analyze 3x more deals with the same team.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Principal, Urban Development Fund',
      text: 'The 30-second turnaround is game-changing. We make faster, more informed investment decisions.',
      rating: 5,
      avatar: 'SR'
    }
  ];

  const metrics = [
    { value: '1,200+', label: 'Deals Processed' },
    { value: '30,000+', label: 'Analyst Hours Saved' },
    { value: '$500M+', label: 'Underwritten Value' }
  ];

  const sampleReportData = {
    propertyName: 'Metro Office Complex',
    location: 'Downtown Mumbai',
    totalValue: '₹45.2 Crores',
    capRate: '7.8%',
    irr: '12.4%',
    dscr: '1.35',
    noi: '₹3.52 Crores',
    recommendation: 'Strong Buy'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [metrics.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-900 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-green-600 bg-clip-text text-transparent">
                PropPulse AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-900 to-green-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Underwrite CRE Deals in
              <br />
              <span className="bg-gradient-to-r from-blue-900 to-green-600 bg-clip-text text-transparent">
                30 Seconds
              </span>
              <br />
              — Powered by AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Upload your rent roll and T12. Instantly get IRR, cap rate, DSCR, and valuation insights
              <br />
              — no analyst needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/analytics"
                className="group bg-gradient-to-r from-blue-900 to-green-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105"
              >
                <Upload size={20} />
                <span>Upload Your Deal</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 font-medium transition-colors border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-2xl">
                <FileText size={20} />
                <span>Try with Sample Files</span>
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-green-600" />
                <span>30-second analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-blue-600" />
                <span>Bank-grade security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>No signup required to try</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Professional CRE underwriting in three simple steps
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 to-green-600 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative text-center">
                    <div className="relative z-10 mx-auto w-20 h-20 bg-gradient-to-r from-blue-900 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-blue-900 flex items-center justify-center z-20">
                      <span className="text-xs font-bold text-blue-900">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {step.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {step.details}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Report Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sample AI-Generated Report
            </h2>
            <p className="text-xl text-gray-600">
              See what our AI delivers in 30 seconds
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-green-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{sampleReportData.propertyName}</h3>
                    <p className="text-blue-100">{sampleReportData.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{sampleReportData.totalValue}</div>
                    <div className="text-blue-100">Total Value</div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{sampleReportData.capRate}</div>
                    <div className="text-gray-600">Cap Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{sampleReportData.irr}</div>
                    <div className="text-gray-600">IRR</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{sampleReportData.dscr}</div>
                    <div className="text-gray-600">DSCR</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{sampleReportData.noi}</div>
                    <div className="text-gray-600">NOI</div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center">
                    <Award className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <div className="font-semibold text-green-800">AI Recommendation: {sampleReportData.recommendation}</div>
                      <div className="text-green-700 text-sm">Based on market analysis and financial metrics</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button className="bg-gradient-to-r from-blue-900 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto">
                    <Download size={20} />
                    <span>View Sample Report (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Security and Speed
            </h2>
            <p className="text-xl text-gray-600">
              Enterprise-grade security meets lightning-fast analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Metrics Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by CRE Professionals
            </h2>
            <p className="text-xl text-blue-100">
              Real impact, real results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {metric.value}
                </div>
                <div className="text-xl text-blue-100">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What CRE Professionals Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from real estate professionals
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? 'bg-blue-900'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. All plans include our core AI underwriting features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 relative hover:border-blue-300 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">₹0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Basic access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Upload reports via Excel</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Limited dashboard access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Basic AI insights</span>
                </li>
              </ul>
              
              <Link
                to="/signup"
                className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center block"
              >
                Get Started Free
              </Link>
            </div>

            {/* Starter Plan */}
            <div className="bg-white border-2 border-blue-500 rounded-3xl p-8 relative transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-900 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">₹299</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">For growing CRE professionals</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Manual + Excel upload</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Full dashboard & risk mapping</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Email reports & sharing</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Advanced AI underwriting</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">IRR, Cap Rate, DSCR analysis</span>
                </li>
              </ul>
              
              <Link
                to="/signup"
                className="w-full bg-gradient-to-r from-blue-900 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center block"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 relative hover:border-purple-300 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">₹799</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">For CRE investment firms</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Everything in Starter</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Custom AI insights</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Advanced market comps</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">White-label reports</span>
                </li>
              </ul>
              
              <Link
                to="/signup"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors text-center block"
              >
                Go Pro
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include 14-day free trial • No credit card required</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>24/7 support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Data security guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-green-600"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to Underwrite Deals
            <br />
            in 30 Seconds?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join CRE professionals using AI to analyze deals faster and make better investment decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/analytics"
              className="inline-flex items-center space-x-3 bg-white text-blue-900 px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            >
              <Upload size={20} />
              <span>Upload Your Deal Now</span>
            </Link>
            <button className="inline-flex items-center space-x-3 border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-200">
              <FileText size={20} />
              <span>Try Sample Files</span>
            </button>
          </div>
          <div className="mt-8 text-blue-100">
            <p>Start your free analysis • No signup required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-900 to-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">PropPulse AI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                AI-powered CRE underwriting platform that analyzes deals in 30 seconds. 
                Trusted by investment professionals across India.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Users size={20} />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <MapPin size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/analytics" className="hover:text-white transition-colors">AI Underwriting</Link></li>
                <li><Link to="/valuation" className="hover:text-white transition-colors">Valuation Tools</Link></li>
                <li><Link to="/reports" className="hover:text-white transition-colors">Reports</Link></li>
                <li><Link to="/map" className="hover:text-white transition-colors">Market Analysis</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 PropPulse AI. Revolutionizing CRE underwriting with AI.
            </div>
            <div className="text-gray-400">
              Built for CRE professionals in India
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;