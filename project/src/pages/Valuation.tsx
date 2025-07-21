import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { formatIndianCurrency } from '../utils/currency';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  Brain,
  MapPin,
  Building,
  IndianRupee,
  BarChart3,
  Zap
} from 'lucide-react';

const Valuation = () => {
  const { properties } = useData();
  const [selectedProperty, setSelectedProperty] = useState(properties[0]?.id || '');
  const [valuationResults, setValuationResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleValuation = () => {
    if (!selectedProperty) return;
    
    setLoading(true);
    
    // Simulate AI valuation process
    setTimeout(() => {
      const property = properties.find(p => p.id === selectedProperty);
      if (property) {
        const results = {
          currentValue: property.price,
          aiValuation: property.price * (0.95 + Math.random() * 0.1),
          marketForecast: {
            '1Year': property.price * 1.08,
            '3Year': property.price * 1.25,
            '5Year': property.price * 1.45
          },
          comparableProperties: [
            {
              name: 'Similar Commercial Space',
              location: 'Nearby Location',
              pricePerSqft: (property.price / property.area) * 0.95,
              distance: '0.8 km'
            },
            {
              name: 'Comparable Office',
              location: 'Same Area',
              pricePerSqft: (property.price / property.area) * 1.03,
              distance: '1.2 km'
            },
            {
              name: 'Similar Investment',
              location: 'Adjacent Complex',
              pricePerSqft: (property.price / property.area) * 0.98,
              distance: '0.5 km'
            }
          ],
          investmentScore: property.investmentScore,
          riskFactors: [
            { factor: 'Market Volatility', score: 'Low', impact: 'Positive' },
            { factor: 'Location Premium', score: 'High', impact: 'Positive' },
            { factor: 'Infrastructure Development', score: 'Medium', impact: 'Positive' },
            { factor: 'Regulatory Changes', score: 'Low', impact: 'Neutral' }
          ],
          negotiationStrategy: {
            recommendedOffer: property.price * 0.92,
            maxPrice: property.price * 0.98,
            keyPoints: [
              'Market conditions favor buyers',
              'Similar properties selling 5% below asking',
              'Emphasize quick closing capability',
              'Highlight infrastructure concerns'
            ]
          }
        };
        setValuationResults(results);
      }
      setLoading(false);
    }, 2000);
  };

  const selectedProp = properties.find(p => p.id === selectedProperty);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Calculator className="w-8 h-8 mr-3" />
            AI Valuation Engine
          </h1>
          <p className="text-green-100">Get instant property valuations and investment insights</p>
        </div>

        {/* Property Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Property for Valuation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Property
              </label>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a property...</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name} - {property.location}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleValuation}
                disabled={!selectedProperty || loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Zap className="w-5 h-5 animate-pulse" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Run AI Valuation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {selectedProp && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{selectedProp.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-green-600" />
                  <span>{selectedProp.area} sq.ft</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4 text-purple-600" />
                  <span>{formatIndianCurrency(selectedProp.price)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Valuation Results */}
        {valuationResults && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Value</h3>
                <p className="text-2xl font-bold text-gray-600">
                  {formatIndianCurrency(valuationResults.currentValue)}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Valuation</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatIndianCurrency(valuationResults.aiValuation)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {((valuationResults.aiValuation / valuationResults.currentValue - 1) * 100).toFixed(1)}% vs asking
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5-Year Forecast</h3>
                <p className="text-2xl font-bold text-green-600">
                  {formatIndianCurrency(valuationResults.marketForecast['5Year'])}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {((valuationResults.marketForecast['5Year'] / valuationResults.currentValue - 1) * 100).toFixed(0)}% appreciation
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Score</h3>
                <p className="text-2xl font-bold text-purple-600">{valuationResults.investmentScore}/100</p>
                <p className="text-sm text-gray-500 mt-1">AI Rating</p>
              </div>
            </div>

            {/* Market Forecast */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Market Forecast
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(valuationResults.marketForecast).map(([period, value]) => (
                  <div key={period} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{period}</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {formatIndianCurrency(value as number)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(((value as number) / valuationResults.currentValue - 1) * 100).toFixed(1)}% growth
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparable Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Comparable Properties
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Sq.ft</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {valuationResults.comparableProperties.map((comp: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {comp.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {comp.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          ₹{comp.pricePerSqft.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {comp.distance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-600" />
                Risk Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valuationResults.riskFactors.map((risk: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{risk.factor}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        risk.score === 'Low' ? 'bg-green-100 text-green-800' :
                        risk.score === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {risk.score}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      risk.impact === 'Positive' ? 'text-green-600' :
                      risk.impact === 'Negative' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      Impact: {risk.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation Strategy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                AI Negotiation Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Recommended Offers</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">Opening Offer</p>
                      <p className="text-lg font-bold text-green-800">
                        {formatIndianCurrency(valuationResults.negotiationStrategy.recommendedOffer)}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-700 font-medium">Maximum Price</p>
                      <p className="text-lg font-bold text-yellow-800">
                        {formatIndianCurrency(valuationResults.negotiationStrategy.maxPrice)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Negotiation Points</h4>
                  <ul className="space-y-2">
                    {valuationResults.negotiationStrategy.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Valuation;