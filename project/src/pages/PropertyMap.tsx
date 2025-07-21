import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { formatIndianCurrency } from '../utils/currency';
import { 
  Map, 
  MapPin, 
  Filter, 
  Search,
  Building,
  IndianRupee,
  TrendingUp,
  Eye
} from 'lucide-react';

const PropertyMap = () => {
  const { properties } = useData();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    yieldRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const propertyTypes = ['all', 'Commercial', 'Office', 'Retail', 'Industrial'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under ₹50 Lakhs' },
    { value: '50-100', label: '₹50L - ₹1 Crore' },
    { value: '100-500', label: '₹1 - ₹5 Crores' },
    { value: '500+', label: 'Above ₹5 Crores' }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesType = filters.type === 'all' || property.type === filters.type;
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (filters.priceRange !== 'all') {
      const priceInLakhs = property.price / 100000;
      const [min, max] = filters.priceRange.split('-');
      if (max === '+') {
        matchesPrice = priceInLakhs >= parseInt(min);
      } else {
        matchesPrice = priceInLakhs >= parseInt(min) && priceInLakhs <= parseInt(max);
      }
    }

    return matchesType && matchesSearch && matchesPrice;
  });

  const selectedProp = selectedProperty ? properties.find(p => p.id === selectedProperty) : null;

  // Simulated map coordinates for cities
  const cityCoordinates = {
    'Mumbai': { x: 25, y: 60 },
    'Bengaluru': { x: 60, y: 75 },
    'Gurgaon': { x: 35, y: 25 },
    'Pune': { x: 45, y: 65 },
    'Hyderabad': { x: 65, y: 50 }
  };

  const getPropertyCoordinates = (location: string) => {
    const city = location.split(',')[1]?.trim() || location.split(' ')[location.split(' ').length - 1];
    return cityCoordinates[city as keyof typeof cityCoordinates] || { x: 50, y: 50 };
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Map className="w-8 h-8 mr-3" />
            Interactive Property Map
          </h1>
          <p className="text-blue-100">Explore properties across India with location-based analytics</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Filter size={16} />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Locations</h3>
            
            <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
              {/* India Map Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl text-gray-300 opacity-50">🇮🇳</div>
              </div>

              {/* Property Pins */}
              {filteredProperties.map((property) => {
                const coords = getPropertyCoordinates(property.location);
                return (
                  <button
                    key={property.id}
                    onClick={() => setSelectedProperty(property.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                      selectedProperty === property.id
                        ? 'scale-125 z-10'
                        : 'hover:scale-110'
                    }`}
                    style={{
                      left: `${coords.x}%`,
                      top: `${coords.y}%`
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                      property.investmentScore >= 80 ? 'bg-green-500' :
                      property.investmentScore >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                    </div>
                    
                    {selectedProperty === property.id && (
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg p-3 shadow-lg min-w-48 z-20">
                        <h4 className="font-semibold text-gray-900 text-sm">{property.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                        <p className="text-sm font-bold text-blue-600">{formatIndianCurrency(property.price)}</p>
                        <p className="text-xs text-green-600">Yield: {property.expectedYield}%</p>
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">Investment Score</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>High (80+)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium (60-79)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Low (&lt;60)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Properties ({filteredProperties.length})
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => setSelectedProperty(property.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedProperty === property.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{property.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      property.investmentScore >= 80 ? 'bg-green-100 text-green-800' :
                      property.investmentScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {property.investmentScore}/100
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-3 h-3 text-green-600" />
                      <span className="font-medium">{formatIndianCurrency(property.price)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-blue-600" />
                      <span>{property.expectedYield}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                    <div className="flex items-center space-x-1">
                      <Building className="w-3 h-3 text-purple-600" />
                      <span>{property.type}</span>
                    </div>
                    <div className="text-gray-500">
                      {property.area} sq.ft
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Property Details */}
        {selectedProp && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-600" />
              Property Details: {selectedProp.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedProp.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{selectedProp.area} sq.ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedProp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Financial Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-green-600">{formatIndianCurrency(selectedProp.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Yield:</span>
                      <span className="font-medium text-blue-600">{selectedProp.expectedYield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price/sq.ft:</span>
                      <span className="font-medium">₹{(selectedProp.price / selectedProp.area).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Score:</span>
                      <span className={`font-medium ${
                        selectedProp.investmentScore >= 80 ? 'text-green-600' :
                        selectedProp.investmentScore >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedProp.investmentScore}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Score:</span>
                      <span className={`font-medium ${
                        selectedProp.riskScore <= 30 ? 'text-green-600' :
                        selectedProp.riskScore <= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedProp.riskScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PropertyMap;