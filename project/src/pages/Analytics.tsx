import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { formatIndianCurrency } from '../utils/currency';
import { 
  Upload, 
  FileText, 
  BarChart3, 
  Download, 
  Save,
  Brain,
  Zap,
  AlertCircle,
  CheckCircle,
  Plus,
  MapPin,
  Building,
  IndianRupee,
  TrendingUp,
  Target
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const { addPropertiesFromFile, properties } = useData();
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualProperty, setManualProperty] = useState({
    name: '',
    location: '',
    price: '',
    area: '',
    type: 'Commercial',
    expectedYield: '',
    riskScore: '',
    investmentScore: ''
  });
  const [showCharts, setShowCharts] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let data: any[] = [];
        
        if (file.name.endsWith('.csv')) {
          Papa.parse(e.target?.result as string, {
            header: true,
            complete: (results) => {
              data = results.data;
              processData(data);
            }
          });
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          const workbook = XLSX.read(e.target?.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          data = XLSX.utils.sheet_to_json(worksheet);
          processData(data);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        setLoading(false);
      }
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  }, []);

  const processData = (data: any[]) => {
    // Simulate AI processing
    setTimeout(() => {
      setUploadedData(data);
      
      // Generate AI analysis
      const analysis = {
        totalProperties: data.length,
        avgPrice: data.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0) / data.length,
        highestYield: Math.max(...data.map(item => parseFloat(item.expectedYield) || 0)),
        lowestRisk: Math.min(...data.map(item => parseFloat(item.riskScore) || 100)),
        recommendation: 'Strong Buy',
        confidence: 94,
        insights: [
          'Properties in Bengaluru show 23% higher appreciation potential',
          'Commercial properties outperforming retail by 15%',
          'Risk-adjusted returns favor BKC and Whitefield locations',
          'Market conditions suggest optimal entry timing'
        ]
      };
      
      setAnalysisResults(analysis);
      setLoading(false);
    }, 2000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty = {
      name: manualProperty.name,
      location: manualProperty.location,
      price: parseFloat(manualProperty.price) || 0,
      area: parseFloat(manualProperty.area) || 0,
      type: manualProperty.type,
      expectedYield: parseFloat(manualProperty.expectedYield) || 0,
      riskScore: parseFloat(manualProperty.riskScore) || 50,
      investmentScore: parseFloat(manualProperty.investmentScore) || 70
    };
    
    // Add to uploaded data for analysis
    const newData = [...uploadedData, manualProperty];
    setUploadedData(newData);
    
    // Generate AI analysis for the new property
    setLoading(true);
    setTimeout(() => {
      const analysis = {
        totalProperties: newData.length,
        avgPrice: newData.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0) / newData.length,
        highestYield: Math.max(...newData.map(item => parseFloat(item.expectedYield) || 0)),
        lowestRisk: Math.min(...newData.map(item => parseFloat(item.riskScore) || 100)),
        recommendation: 'Strong Buy',
        confidence: 94,
        insights: [
          `${manualProperty.location} shows strong appreciation potential`,
          `${manualProperty.type} properties performing well in this area`,
          'Market conditions favor this investment timing',
          'Risk-adjusted returns look favorable'
        ]
      };
      
      setAnalysisResults(analysis);
      setLoading(false);
    }, 1500);
    
    // Reset form
    setManualProperty({
      name: '',
      location: '',
      price: '',
      area: '',
      type: 'Commercial',
      expectedYield: '',
      riskScore: '',
      investmentScore: ''
    });
    
    setShowManualForm(false);
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setManualProperty({
      ...manualProperty,
      [e.target.name]: e.target.value
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  const handleSaveData = () => {
    if (uploadedData.length > 0) {
      const newProperties = uploadedData.map(item => ({
        name: item.name || 'Imported Property',
        location: item.location || 'Unknown Location',
        price: parseFloat(item.price) || 0,
        area: parseFloat(item.area) || 0,
        type: item.type || 'Commercial',
        expectedYield: parseFloat(item.expectedYield) || 0,
        riskScore: parseFloat(item.riskScore) || 50,
        investmentScore: parseFloat(item.investmentScore) || 70
      }));
      
      addPropertiesFromFile(newProperties);
      alert('Data saved successfully!');
    }
  };

  const handleExportReport = () => {
  // Create worksheet data
  const wsData = [
    // Header row
    ['Property Name', 'Location', 'Price', 'Area', 'Type', 'Expected Yield', 'Risk Score', 'Investment Score'],
    // Data rows
    ...uploadedData.map(item => [
      item.name || '',
      item.location || '',
      item.price || 0,
      item.area || 0,
      item.type || '',
      item.expectedYield || 0,
      item.riskScore || 0,
      item.investmentScore || 0
    ])
  ];

  // Add analysis summary at the bottom
  wsData.push(
    [], // Empty row for spacing
    ['Analysis Summary'],
    ['Total Properties', analysisResults.totalProperties],
    ['Average Price', analysisResults.avgPrice],
    ['Highest Yield', `${analysisResults.highestYield}%`],
    ['AI Confidence', `${analysisResults.confidence}%`],
    ['AI Recommendation', analysisResults.recommendation],
    [],
    ['AI Insights'],
    ...analysisResults.insights.map((insight: string) => [insight])
  );

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Property Analysis');

  // Generate Excel file
  XLSX.writeFile(wb, 'proppulse-analysis-report.xlsx');
};

  const handleGenerateCharts = () => {
    setShowCharts(true);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Brain className="w-8 h-8 mr-3" />
            AI Analytics Engine
          </h1>
          <p className="text-purple-100">Upload your property data and get instant AI-powered insights</p>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-600" />
            Add Property Data
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => setShowManualForm(!showManualForm)}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Property Manually</span>
            </button>
            <div className="flex items-center text-gray-500">
              <span className="text-sm">or upload CSV/Excel file below</span>
            </div>
          </div>

          {/* Manual Property Form */}
          {showManualForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Property Details</h3>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={manualProperty.name}
                        onChange={handleManualChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Commercial Complex - BKC"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="location"
                        value={manualProperty.location}
                        onChange={handleManualChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Bandra Kurla Complex, Mumbai"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        name="price"
                        value={manualProperty.price}
                        onChange={handleManualChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="15000000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sq.ft)
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={manualProperty.area}
                      onChange={handleManualChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      name="type"
                      value={manualProperty.type}
                      onChange={handleManualChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Commercial">Commercial</option>
                      <option value="Office">Office</option>
                      <option value="Retail">Retail</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Yield (%)
                    </label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        step="0.1"
                        name="expectedYield"
                        value={manualProperty.expectedYield}
                        onChange={handleManualChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8.5"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Score (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="riskScore"
                      value={manualProperty.riskScore}
                      onChange={handleManualChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Score (0-100)
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="investmentScore"
                        value={manualProperty.investmentScore}
                        onChange={handleManualChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="87"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Add Property & Analyze
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop your CSV or Excel file here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Drag and drop your CSV or Excel file here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: .csv, .xlsx, .xls
                </p>
              </div>
            )}
          </div>

          {fileName && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800">File uploaded: {fileName}</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis in Progress</h3>
            <p className="text-gray-600">Our AI is analyzing your property data...</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResults && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Properties</h3>
                <p className="text-3xl font-bold text-blue-600">{analysisResults.totalProperties}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Price</h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatIndianCurrency(analysisResults.avgPrice)}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Highest Yield</h3>
                <p className="text-3xl font-bold text-purple-600">{analysisResults.highestYield}%</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Confidence</h3>
                <p className="text-3xl font-bold text-orange-600">{analysisResults.confidence}%</p>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                AI-Generated Insights
              </h3>
              <div className="space-y-3">
                {analysisResults.insights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">
                    AI Recommendation: {analysisResults.recommendation}
                  </span>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  Uploaded Data Preview
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {uploadedData.length > 0 && Object.keys(uploadedData[0]).map((key) => (
                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {uploadedData.slice(0, 10).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.values(row).map((value: any, i) => (
                          <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleSaveData}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <Save size={20} />
                <span>Save Data</span>
              </button>
              
              <button
                onClick={handleExportReport}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={20} />
                <span>Export Report</span>
              </button>
              
              <button 
                onClick={handleGenerateCharts}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                <BarChart3 size={20} />
                <span>Generate Charts</span>
              </button>
            </div>

            {/* Charts Section */}
            {showCharts && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Analysis Charts</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Property Type Distribution */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Property Type Distribution</h4>
                      <PieChart width={400} height={300}>
                        <Pie
                          data={Object.entries(
                            uploadedData.reduce((acc: Record<string, number>, curr) => {
                              acc[curr.type] = (acc[curr.type] || 0) + 1;
                              return acc;
                            }, {})
                          ).map(([name, value]) => ({ name, value }))}
                          cx={200}
                          cy={150}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                        >
                          {uploadedData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </div>

                    {/* Price Distribution */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Price Distribution by Location</h4>
                      <BarChart
                        width={500}
                        height={300}
                        data={Object.entries(
                          uploadedData.reduce((acc: Record<string, number>, curr) => {
                            acc[curr.location] = (acc[curr.location] || 0) + Number(curr.price);
                            return acc;
                          }, {})
                        ).map(([location, price]) => ({ location, price }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="location" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatIndianCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="price" fill="#8884d8" name="Total Price" />
                      </BarChart>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sample Data Template */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Data Format</h3>
          <p className="text-gray-600 mb-4">
            Your CSV/Excel file should contain columns similar to this format:
          </p>
          <div className="overflow-x-auto bg-gray-50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4">name</th>
                  <th className="text-left py-2 px-4">location</th>
                  <th className="text-left py-2 px-4">price</th>
                  <th className="text-left py-2 px-4">area</th>
                  <th className="text-left py-2 px-4">type</th>
                  <th className="text-left py-2 px-4">expectedYield</th>
                  <th className="text-left py-2 px-4">riskScore</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4">Commercial Complex</td>
                  <td className="py-2 px-4">Mumbai</td>
                  <td className="py-2 px-4">15000000</td>
                  <td className="py-2 px-4">2500</td>
                  <td className="py-2 px-4">Commercial</td>
                  <td className="py-2 px-4">8.5</td>
                  <td className="py-2 px-4">25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;