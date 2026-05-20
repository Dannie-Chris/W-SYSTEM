import { ArrowRight, Users, Heart, Shield, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export default function HomePage({ onGetStarted }: HomePageProps) {
  const features = [
    {
      icon: Users,
      title: 'Beneficiary Management',
      description: 'Efficiently track and manage welfare program beneficiaries with comprehensive profiles and history.'
    },
    {
      icon: Heart,
      title: 'Multiple Programs',
      description: 'Support various welfare programs including food assistance, housing, healthcare, and education.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Built with data security and privacy compliance at the forefront of every feature.'
    }
  ];

  const benefits = [
    'Real-time dashboard with key metrics and insights',
    'Automated application processing workflow',
    'Budget tracking and utilization monitoring',
    'Comprehensive reporting and analytics',
    'Document management system',
    'Multi-user access with role-based permissions'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">WELFINITY MANAGEMENT SYSTEM</h1>
            </div>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Empowering Communities Through
            <span className="text-blue-600"> Efficient Welfare Management</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive platform designed to streamline welfare program administration,
            improve beneficiary services, and maximize community impact.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">200</p>
            <p className="text-gray-600">Active Beneficiaries</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">24</p>
            <p className="text-gray-600">Welfare Programs</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">Kshs 2.4M</p>
            <p className="text-gray-600">Funds Disbursed</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h3>
            <p className="text-lg text-gray-600">Everything you need to manage welfare programs effectively</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Comprehensive Welfare Administration
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Our platform provides all the tools needed to efficiently manage welfare programs,
                from application processing to fund disbursement and impact reporting.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h4>
              <div className="space-y-4">
                <button
                  onClick={onGetStarted}
                  className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left flex items-center justify-between"
                >
                  <span className="font-semibold">Administrator Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center justify-between">
                  <span className="font-semibold">Beneficiary Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center justify-between">
                  <span className="font-semibold">Staff Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Welfinity</span>
              </div>
              <p className="text-gray-400">
                Dedicated to improving lives through efficient welfare program administration.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Programs</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact Information</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@welfinity@gmail.com</li>
                <li>Phone: +254700000000</li>
                <li>Address: Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Welfinity Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
