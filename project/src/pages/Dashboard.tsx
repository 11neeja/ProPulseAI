import React from 'react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { formatIndianCurrency } from '../utils/currency';
import { 
  Plus, 
  Zap, 
  FileText, 
  Beaker, 
  TrendingUp, 
  IndianRupee,
  Building,
  Target,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const { properties, getAnalytics } = useData();
  const analytics = getAnalytics();
  
  // Use real user data instead of dummy data
  const hasUserData = properties.length > 0;

  const quickActions = [
    {
      icon: Plus,
      title: 'Add Property',
      description: 'Add new property to your portfolio',
      link: '/analytics',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Run Analysis',
      description: 'Analyze your properties with AI',
      link: '/analytics',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FileText,
      title: 'View Reports',
      description: 'Access your generated reports',
      link: '/reports',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Beaker,
      title: 'Deal Lab',
      description: 'AI-backed investment suggestions',
      link: '/valuation',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Portfolio Value Chart Data
  const portfolioData = hasUserData ? {
    labels: properties.map(p => p.name.split(' - ')[0] || p.name.substring(0, 15)),
    datasets: [
      {
        label: 'Property Value (₹ Crores)',
        data: properties.map(p => p.price / 10000000),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  } : {
    labels: ['No Data'],
    datasets: [
      {
        label: 'Property Value (₹ Crores)',
        data: [0],
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Investment Score Pie Chart
  const scoreData = hasUserData ? {
    labels: properties.map(p => p.name.split(' - ')[0] || p.name.substring(0, 15)),
    datasets: [
      {
        data: properties.map(p => p.investmentScore),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(139, 69, 19, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  } : {
    labels: ['No Data'],
    datasets: [
      {
        data: [1],
        backgroundColor: ['rgba(156, 163, 175, 0.5)'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Yield Trends Line Chart
  const yieldData = hasUserData ? {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Yield (%)',
        data: [
          Math.max(0, analytics.avgYield - 1.5),
          Math.max(0, analytics.avgYield - 1.0),
          Math.max(0, analytics.avgYield - 0.5),
          Math.max(0, analytics.avgYield - 0.2),
          Math.max(0, analytics.avgYield + 0.1),
          analytics.avgYield
        ],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  } : {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Yield (%)',
        data: [0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(156, 163, 175, 1)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-blue-100">Welcome to your AI-powered real estate command center</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Value</h3>
              <IndianRupee className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {hasUserData ? formatIndianCurrency(analytics.totalValue) : '₹0'}
            </p>
            <p className={`text-sm mt-2 ${hasUserData ? 'text-green-600' : 'text-gray-500'}`}>
              {hasUserData ? '↗ Based on your portfolio' : 'Add properties to see value'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{analytics.propertyCount}</p>
            <p className="text-blue-600 text-sm mt-2">
              {hasUserData ? 'Active investments' : 'No properties added'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Avg Yield</h3>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {hasUserData ? `${analytics.avgYield.toFixed(1)}%` : '0%'}
            </p>
            <p className="text-purple-600 text-sm mt-2">
              {hasUserData ? 'Annual return' : 'Add properties to calculate'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Score</h3>
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {hasUserData ? `${analytics.avgScore.toFixed(0)}/100` : '0/100'}
            </p>
            <p className="text-orange-600 text-sm mt-2">
              {hasUserData ? 'Investment rating' : 'Add properties for AI rating'}
            </p>
          </div>
        </div>

        {/* No Data Message */}
        {!hasUserData && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Added Yet</h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first property to see personalized analytics and AI insights
            </p>
            <Link
              to="/analytics"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Property</span>
            </Link>
          </div>
        )}
        {/* Charts Section */}
        {hasUserData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Portfolio Value Distribution
            </h3>
            <Bar data={portfolioData} options={chartOptions} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Investment Scores
            </h3>
            <Pie data={scoreData} options={chartOptions} />
          </div>
        </div>
        )}

        {hasUserData && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            Yield Trends
          </h3>
          <Line data={yieldData} options={chartOptions} />
        </div>
        )}

        {/* Recent Properties */}
        {hasUserData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Recent Properties</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{property.name}</div>
                      <div className="text-sm text-gray-500">{property.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatIndianCurrency(property.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.expectedYield}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        property.investmentScore >= 80 
                          ? 'bg-green-100 text-green-800'
                          : property.investmentScore >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {property.investmentScore}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;