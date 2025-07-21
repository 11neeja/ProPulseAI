import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  AlertTriangle, 
  Droplets, 
  Mountain, 
  Zap,
  Shield,
  TrendingDown,
  MapPin,
  Info
} from 'lucide-react';

const RiskMap = () => {
  const [selectedRisk, setSelectedRisk] = useState('flood');
  const [selectedCity, setSelectedCity] = useState('mumbai');
  const [customCity, setCustomCity] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [cities, setCities] = useState([
    { id: 'mumbai', name: 'Mumbai', coordinates: { lat: 19.0760, lng: 72.8777 } },
    { id: 'bangalore', name: 'Bangalore', coordinates: { lat: 12.9716, lng: 77.5946 } },
    { id: 'delhi', name: 'Delhi', coordinates: { lat: 28.7041, lng: 77.1025 } },
    { id: 'pune', name: 'Pune', coordinates: { lat: 18.5204, lng: 73.8567 } },
    { id: 'hyderabad', name: 'Hyderabad', coordinates: { lat: 17.3850, lng: 78.4867 } }
  ]);

  const [riskData, setRiskData] = useState({
    mumbai: {
      flood: { level: 'High', score: 75, description: 'Monsoon flooding and coastal proximity increase flood risk' },
      earthquake: { level: 'Medium', score: 45, description: 'Moderate seismic activity in surrounding regions' },
      cyclone: { level: 'High', score: 70, description: 'Arabian Sea cyclones affect coastal areas' },
      market: { level: 'Low', score: 25, description: 'Strong market fundamentals and demand' }
    },
    bangalore: {
      flood: { level: 'Medium', score: 50, description: 'Urban flooding during heavy rainfall' },
      earthquake: { level: 'Low', score: 20, description: 'Stable geological conditions' },
      cyclone: { level: 'Low', score: 15, description: 'Inland location provides protection' },
      market: { level: 'Low', score: 30, description: 'IT sector drives consistent demand' }
    },
    delhi: {
      flood: { level: 'Medium', score: 55, description: 'Yamuna river flooding during monsoons' },
      earthquake: { level: 'High', score: 80, description: 'Located in active seismic zone' },
      cyclone: { level: 'Low', score: 10, description: 'Inland location with minimal cyclone impact' },
      market: { level: 'Medium', score: 40, description: 'Political and economic center with stable demand' }
    },
    pune: {
      flood: { level: 'Medium', score: 45, description: 'River flooding and urban drainage issues' },
      earthquake: { level: 'Medium', score: 40, description: 'Some seismic activity in Western Ghats' },
      cyclone: { level: 'Low', score: 20, description: 'Protected by Western Ghats' },
      market: { level: 'Low', score: 35, description: 'Growing IT and manufacturing hub' }
    },
    hyderabad: {
      flood: { level: 'Low', score: 30, description: 'Limited flood risk due to elevated terrain' },
      earthquake: { level: 'Low', score: 25, description: 'Stable geological conditions' },
      cyclone: { level: 'Medium', score: 50, description: 'Occasional impact from Bay of Bengal cyclones' },
      market: { level: 'Low', score: 25, description: 'HITEC City drives strong real estate demand' }
    }
  });

  const riskTypes = [
    { id: 'flood', name: 'Flood Risk', icon: Droplets, color: 'blue' },
    { id: 'earthquake', name: 'Seismic Risk', icon: Mountain, color: 'orange' },
    { id: 'cyclone', name: 'Cyclone Risk', icon: Zap, color: 'purple' },
    { id: 'market', name: 'Market Risk', icon: TrendingDown, color: 'red' }
  ];

  const handleCustomCitySubmit = () => {
    if (customCity.trim()) {
      const cityId = customCity.toLowerCase().replace(/\s+/g, '');
      
      // Create new city object
      const newCity = {
        id: cityId,
        name: customCity,
        coordinates: { lat: 20 + Math.random() * 15, lng: 70 + Math.random() * 15 }
      };
      
      // Generate risk data for custom city
      const customRiskData = {
        flood: { level: 'Medium', score: 45, description: `Moderate flood risk in ${customCity} based on geographical analysis` },
        earthquake: { level: 'Low', score: 30, description: `Low seismic activity reported in ${customCity} region` },
        cyclone: { level: 'Low', score: 25, description: `${customCity} has minimal cyclone exposure` },
        market: { level: 'Medium', score: 40, description: `Market conditions in ${customCity} show moderate volatility` }
      };
      
      // Update cities and risk data state
      setCities(prevCities => [...prevCities, newCity]);
      setRiskData(prevRiskData => ({
        ...prevRiskData,
        [cityId]: customRiskData
      }));
      
      setSelectedCity(newCity.id);
      setShowCustomInput(false);
      setCustomCity('');
    }
  };

  const getCurrentRiskData = () => {
    const cityData = riskData[selectedCity as keyof typeof riskData];
    if (!cityData) {
      return { level: 'Unknown', score: 0, description: 'No data available for this city' };
    }
    return cityData[selectedRisk as keyof typeof cityData] || { level: 'Unknown', score: 0, description: 'No data available for this risk type' };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMapRegions = () => {
    return cities.map(city => {
      const cityData = riskData[city.id as keyof typeof riskData];
      const cityRisk = cityData ? cityData[selectedRisk as keyof typeof cityData] : { level: 'Unknown', score: 0, description: 'No data available' };
      return {
        ...city,
        risk: cityRisk
      };
    });
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3" />
            Risk Assessment Map
          </h1>
          <p className="text-red-100">Analyze property risks across Indian cities with AI-powered insights</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Type Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Risk Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {riskTypes.map((risk) => {
                  const Icon = risk.icon;
                  return (
                    <button
                      key={risk.id}
                      onClick={() => setSelectedRisk(risk.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedRisk === risk.id
                          ? `border-${risk.color}-500 bg-${risk.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${
                        selectedRisk === risk.id ? `text-${risk.color}-600` : 'text-gray-400'
                      }`} />
                      <p className={`text-sm font-medium ${
                        selectedRisk === risk.id ? `text-${risk.color}-800` : 'text-gray-600'
                      }`}>
                        {risk.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* City Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select City</h3>
              <div className="mb-4">
                <button
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-2"
                >
                  + Add Custom City
                </button>
              </div>
              
              {showCustomInput && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter City Name
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter any Indian city..."
                    />
                    <button
                      onClick={handleCustomCitySubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.id)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      selectedCity === city.id
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className={`w-4 h-4 ${
                        selectedCity === city.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{city.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Risk Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk Analysis</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {getCurrentRiskData().score}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {cities.find(c => c.id === selectedCity)?.name}
                </h4>
                <p className="text-gray-600">
                  {riskTypes.find(r => r.id === selectedRisk)?.name}
                </p>
              </div>

              <div className="text-center">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  getRiskColor(getCurrentRiskData().level)
                }`}>
                  {getCurrentRiskData().level} Risk
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    {getCurrentRiskData().description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Comparison */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">City Risk Comparison</h3>
            
            <div className="space-y-4">
              {getMapRegions().map((region) => (
                <div key={region.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">{region.name}</h4>
                      <p className="text-sm text-gray-500">
                        {riskTypes.find(r => r.id === selectedRisk)?.name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        Score: {region.risk.score}/100
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        getRiskColor(region.risk.level)
                      }`}>
                        {region.risk.level}
                      </span>
                    </div>
                    
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          region.risk.level === 'Low' ? 'bg-green-500' :
                          region.risk.level === 'Medium' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${region.risk.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Mitigation Strategies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Risk Mitigation Strategies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Insurance Coverage</h4>
              <p className="text-sm text-blue-700">
                Comprehensive property insurance including natural disaster coverage
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Structural Measures</h4>
              <p className="text-sm text-green-700">
                Earthquake-resistant construction and flood-resistant building materials
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Location Diversification</h4>
              <p className="text-sm text-yellow-700">
                Spread investments across different geographic areas to reduce risk
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Emergency Planning</h4>
              <p className="text-sm text-purple-700">
                Develop evacuation plans and emergency response procedures
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Map Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Interactive Risk Map</h3>
          
          <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h4>
              <p className="text-gray-600 max-w-md">
                Interactive map showing risk zones, property locations, and detailed risk analysis for each area.
                Click on any region to see detailed risk assessment.
              </p>
            </div>
            
            {/* Simulated map pins */}
            <div className="absolute top-8 left-12 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-16 right-20 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-16 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-12 right-12 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RiskMap;