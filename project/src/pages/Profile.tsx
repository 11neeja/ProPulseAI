import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Save,
  Camera,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  Upload,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    bio: 'Experienced real estate investor focused on commercial properties in Mumbai and Bangalore.',
    location: 'Mumbai, Maharashtra',
    website: 'https://www.mycompany.com'
  });
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    marketUpdates: true,
    reportReady: true
  });

  const [saved, setSaved] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem('profileImage') || null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfileImage = () => {
    if (imagePreview) {
      setProfileImage(imagePreview);
      localStorage.setItem('profileImage', imagePreview);
      setImagePreview(null);
      setShowImageUpload(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const cancelImageUpload = () => {
    setImagePreview(null);
    setShowImageUpload(false);
  };

  const handleSave = () => {
    // Simulate saving
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'security':
        navigate('/profile?section=security');
        break;
      case 'billing':
        navigate('/profile?section=billing');
        break;
      case 'help':
        navigate('/profile?section=help');
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
            <User className="w-8 h-8 mr-3" />
            Profile Settings
          </h1>
          <p className="text-indigo-100">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="xl:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about yourself and your investment focus..."
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </h2>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {key === 'emailAlerts' && 'Email Alerts'}
                        {key === 'smsAlerts' && 'SMS Alerts'}
                        {key === 'marketUpdates' && 'Market Updates'}
                        {key === 'reportReady' && 'Report Ready Notifications'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {key === 'emailAlerts' && 'Receive important updates via email'}
                        {key === 'smsAlerts' && 'Get urgent notifications via SMS'}
                        {key === 'marketUpdates' && 'Weekly market trend updates'}
                        {key === 'reportReady' && 'Get notified when reports are ready'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  {profileImage || imagePreview ? (
                    <img
                      src={imagePreview || profileImage || ''}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                {!showImageUpload && !imagePreview && (
                  <button 
                    onClick={() => setShowImageUpload(true)}
                    className="flex items-center space-x-2 mx-auto text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Camera size={16} />
                    <span>Change Photo</span>
                  </button>
                )}
                
                {showImageUpload && !imagePreview && (
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 mx-auto text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                      <Upload size={16} />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <button 
                      onClick={cancelImageUpload}
                      className="flex items-center space-x-2 mx-auto text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
                
                {imagePreview && (
                  <div className="space-y-3">
                    <button 
                      onClick={saveProfileImage}
                      className="flex items-center space-x-2 mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                      <Save size={16} />
                      <span>Save Photo</span>
                    </button>
                    <button 
                      onClick={cancelImageUpload}
                      className="flex items-center space-x-2 mx-auto text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => handleQuickAction('security')}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Security Settings</span>
                </button>
                
                <button 
                  onClick={() => handleQuickAction('billing')}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Billing & Subscription</span>
                </button>
                
                <button 
                  onClick={() => handleQuickAction('help')}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Help & Support</span>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>

            {saved && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-green-800 text-sm font-medium">
                  Profile updated successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;