import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Bell, 
  BarChart3, 
  Shield,
  Clock,
  Smartphone
} from 'lucide-react';
import Card from '../components/Common/Card';

const Home: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive role-based access control for administrators, professors, and students'
    },
    {
      icon: Calendar,
      title: 'Schedule Management',
      description: 'Easy-to-use scheduling system for classes, events, and room bookings'
    },
    {
      icon: MapPin,
      title: 'Real-time Occupancy',
      description: 'Live tracking of classroom occupancy with visual indicators and capacity management'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Instant alerts for room changes, cancellations, and important announcements'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Detailed reports on room utilization, attendance patterns, and campus efficiency'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Enterprise-grade security with encrypted data and secure authentication'
    }
  ];

  const stats = [
    { value: '500+', label: 'Active Users' },
    { value: '50+', label: 'Classrooms' },
    { value: '1000+', label: 'Classes/Week' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              CMS-Campus Management System
              <span className="block text-blue-200">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Streamline your campus operations with our comprehensive management system. 
              Track occupancy, manage schedules, and enhance the educational experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/occupancy"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                View Occupancy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage your campus
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools necessary for efficient campus management,
            from real-time occupancy tracking to advanced analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why choose our Campus Management System?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-time Updates</h3>
                    <p className="text-gray-600">Get instant updates on room occupancy, schedule changes, and campus events.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mobile Responsive</h3>
                    <p className="text-gray-600">Access your campus information from any device, anywhere, anytime.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Analytics</h3>
                    <p className="text-gray-600">Make data-driven decisions with comprehensive reports and insights.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pl-8">
              <img
                src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Campus Management Dashboard"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your campus management?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of educational institutions that trust our platform for their campus management needs.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;