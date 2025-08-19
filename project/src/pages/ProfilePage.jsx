import React, { useState } from 'react';
import { User, Mail, MapPin, Bell, Settings, LogOut, Edit3, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react';

const ProfilePage = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345'
  });

  const reportedProblems = [
    {
      id: 1,
      title: 'Broken Streetlight',
      category: 'Lighting',
      status: 'resolved',
      date: '2024-01-15',
      location: 'Main St & 5th Ave',
      description: 'Streetlight has been flickering for weeks'
    },
    {
      id: 2,
      title: 'Pothole on Highway',
      category: 'Road',
      status: 'in-progress',
      date: '2024-01-20',
      location: 'Highway 101, Mile 15',
      description: 'Large pothole causing traffic issues'
    },
    {
      id: 3,
      title: 'Overflowing Trash Bin',
      category: 'Waste',
      status: 'open',
      date: '2024-01-22',
      location: 'Central Park Entrance',
      description: 'Trash bin overflowing, attracting pests'
    }
  ];

  const savedLocations = [
    { id: 1, name: 'Home', address: '123 Main St, City, State 12345', type: 'home' },
    { id: 2, name: 'Work', address: '456 Business Ave, City, State 12345', type: 'work' },
    { id: 3, name: 'Mom\'s House', address: '789 Family Rd, City, State 12345', type: 'custom' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'open': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'open': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-600">{userInfo.email}</p>
              <p className="text-sm text-gray-500">Member since January 2024</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'reports', label: 'My Reports' },
              { id: 'locations', label: 'Saved Locations' },
              { id: 'settings', label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Total Reports</h3>
                  <p className="text-3xl font-bold text-blue-600">{reportedProblems.length}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-green-900 mb-2">Resolved</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {reportedProblems.filter(p => p.status === 'resolved').length}
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h3 className="font-semibold text-yellow-900 mb-2">In Progress</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    {reportedProblems.filter(p => p.status === 'in-progress').length}
                  </p>
                </div>
              </div>

              {/* User Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={userInfo.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{userInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{userInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-900">{userInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{userInfo.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">My Reports</h3>
                <button
                  onClick={() => navigateTo('report')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>New Report</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {reportedProblems.map(problem => (
                  <div key={problem.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{problem.title}</h4>
                          <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(problem.status)}`}>
                            {getStatusIcon(problem.status)}
                            <span className="capitalize">{problem.status.replace('-', ' ')}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{problem.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{problem.category}</span>
                          <span>•</span>
                          <span>{problem.location}</span>
                          <span>•</span>
                          <span>{problem.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigateTo('detail', problem)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Saved Locations</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Add Location</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {savedLocations.map(location => (
                  <div key={location.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{location.name}</h4>
                          <p className="text-sm text-gray-600">{location.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about your reports via email</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-600">Get instant notifications on your device</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Receive text messages for urgent updates</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Public Profile</h4>
                      <p className="text-sm text-gray-600">Allow others to see your profile and reports</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Location Sharing</h4>
                      <p className="text-sm text-gray-600">Share your location for better problem reporting</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;