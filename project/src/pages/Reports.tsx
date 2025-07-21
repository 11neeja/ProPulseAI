import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { formatIndianCurrency } from '../utils/currency';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3,
  TrendingUp,
  Filter,
  Eye,
  Share,
  X,
  Copy,
  Check
} from 'lucide-react';

const Reports = () => {
  const { properties, getAnalytics } = useData();
  const analytics = getAnalytics();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [previewReport, setPreviewReport] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const reports = [
    {
      id: 1,
      name: 'Portfolio Performance Report',
      type: 'Performance',
      date: '2025-01-15',
      status: 'Ready',
      description: 'Comprehensive analysis of your property portfolio performance and ROI metrics.',
      insights: 15,
      pages: 12
    },
    {
      id: 2,
      name: 'Market Analysis - Mumbai',
      type: 'Market',
      date: '2025-01-14',
      status: 'Ready',
      description: 'Detailed market trends and forecasts for Mumbai commercial real estate.',
      insights: 22,
      pages: 18
    },
    {
      id: 3,
      name: 'Risk Assessment Report',
      type: 'Risk',
      date: '2025-01-13',
      status: 'Ready',
      description: 'Comprehensive risk analysis including flood zones and market volatility.',
      insights: 11,
      pages: 8
    },
    {
      id: 4,
      name: 'Investment Opportunities',
      type: 'Investment',
      date: '2025-01-12',
      status: 'Ready',
      description: 'AI-identified high-potential investment opportunities in your target markets.',
      insights: 18,
      pages: 15
    },
    {
      id: 5,
      name: 'Valuation Summary - Q1 2025',
      type: 'Valuation',
      date: '2025-01-10',
      status: 'Ready',
      description: 'Latest AI valuations and market comparisons for all properties.',
      insights: 8,
      pages: 6
    }
  ];

  const handlePreviewReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const previewData = {
        ...report,
        content: {
          summary: `This ${report.type.toLowerCase()} report provides comprehensive analysis of your real estate portfolio.`,
          keyMetrics: {
            totalProperties: properties.length,
            portfolioValue: analytics.totalValue,
            avgYield: analytics.avgYield,
            riskScore: analytics.avgRisk
          },
          recommendations: [
            'Consider diversifying portfolio across different property types',
            'Monitor market trends in high-growth areas',
            'Evaluate properties with investment scores above 80',
            'Review risk factors for coastal properties'
          ],
          properties: properties.slice(0, 3)
        }
      };
      setPreviewReport(previewData);
    }
  };

  const handleShareReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const link = `${window.location.origin}/shared-report/${reportId}?token=${Date.now()}`;
      setShareableLink(link);
      setShowShareModal(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };
  const handleDownloadReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      // Simulate report generation and download
      const reportData = {
        reportName: report.name,
        generatedAt: new Date().toLocaleString(),
        portfolio: properties,
        analytics: analytics,
        summary: `This ${report.type.toLowerCase()} report contains ${report.insights} AI-generated insights across ${report.pages} pages.`
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report.name.replace(/\s+/g, '-').toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleGenerateNewReport = () => {
    alert('New report generation started! You will be notified when it\'s ready.');
  };

  const filteredReports = reports.filter(report => {
    if (selectedType !== 'all' && report.type !== selectedType) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
            <FileText className="w-8 h-8 mr-3" />
            Reports & Analytics
          </h1>
          <p className="text-purple-100">Download and share your AI-generated property reports</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2">Total Reports</h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{reports.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2">Portfolio Value</h3>
            <p className="text-xl md:text-2xl font-bold text-green-600">{formatIndianCurrency(analytics.totalValue)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
            <p className="text-2xl md:text-3xl font-bold text-purple-600">
              {reports.reduce((sum, report) => sum + report.insights, 0)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2">Avg Score</h3>
            <p className="text-2xl md:text-3xl font-bold text-orange-600">{analytics.avgScore.toFixed(0)}/100</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full lg:w-auto">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="Performance">Performance</option>
                  <option value="Market">Market</option>
                  <option value="Risk">Risk</option>
                  <option value="Investment">Investment</option>
                  <option value="Valuation">Valuation</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleGenerateNewReport}
              className="w-full lg:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Generate New Report</span>
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{report.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      report.type === 'Performance' ? 'bg-blue-100 text-blue-800' :
                      report.type === 'Market' ? 'bg-green-100 text-green-800' :
                      report.type === 'Risk' ? 'bg-red-100 text-red-800' :
                      report.type === 'Investment' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {report.type}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{report.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{report.insights} insights</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{report.pages} pages</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 xl:mt-0 w-full xl:w-auto">
                  <button 
                    onClick={() => handlePreviewReport(report.id)}
                    className="flex items-center space-x-2 px-3 md:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  
                  <button 
                    onClick={() => handleShareReport(report.id)}
                    className="flex items-center space-x-2 px-3 md:px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Preview Modal */}
        {previewReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">{previewReport.name}</h2>
                <button
                  onClick={() => setPreviewReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Executive Summary</h3>
                  <p className="text-gray-700">{previewReport.content.summary}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Properties</p>
                      <p className="text-xl font-bold text-blue-600">{previewReport.content.keyMetrics.totalProperties}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Portfolio Value</p>
                      <p className="text-xl font-bold text-green-600">{formatIndianCurrency(previewReport.content.keyMetrics.portfolioValue)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Avg Yield</p>
                      <p className="text-xl font-bold text-purple-600">{previewReport.content.keyMetrics.avgYield.toFixed(1)}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Risk Score</p>
                      <p className="text-xl font-bold text-orange-600">{previewReport.content.keyMetrics.riskScore.toFixed(0)}/100</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Recommendations</h3>
                  <ul className="space-y-2">
                    {previewReport.content.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Overview</h3>
                  <div className="space-y-3">
                    {previewReport.content.properties.map((property: any) => (
                      <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{property.name}</h4>
                            <p className="text-sm text-gray-600">{property.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{formatIndianCurrency(property.price)}</p>
                            <p className="text-sm text-gray-600">{property.expectedYield}% yield</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Share Report</h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">Share this report with others using the link below:</p>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareableLink}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                
                {linkCopied && (
                  <p className="text-green-600 text-sm">Link copied to clipboard!</p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Report Templates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Report Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Portfolio Analysis</h4>
              <p className="text-sm text-gray-600">Comprehensive portfolio performance and optimization recommendations</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Market Trends</h4>
              <p className="text-sm text-gray-600">Latest market trends and forecasts for your target regions</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Custom Report</h4>
              <p className="text-sm text-gray-600">Create a custom report with specific metrics and analysis</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;