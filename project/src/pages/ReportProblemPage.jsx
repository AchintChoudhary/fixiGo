import React, { useState } from 'react';
import { MapPin, Camera, Upload, CheckCircle, X, Map } from 'lucide-react';

const ReportProblemPage = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    photos: [],
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567'
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    { id: 'road', label: 'Road & Infrastructure', icon: '🛣️' },
    { id: 'lighting', label: 'Street Lighting', icon: '💡' },
    { id: 'waste', label: 'Waste Management', icon: '🗑️' },
    { id: 'parks', label: 'Parks & Recreation', icon: '🌳' },
    { id: 'utilities', label: 'Utilities', icon: '⚡' },
    { id: 'safety', label: 'Public Safety', icon: '🚨' },
    { id: 'signage', label: 'Traffic & Signage', icon: '🚦' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handleFileUpload = (files) => {
    const newPhotos = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      navigateTo('feed');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reporting this issue. We've received your report and will review it shortly.
            You'll receive updates on the progress via email.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Report ID:</strong> #RPT-{Date.now()}
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigateTo('feed')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View All Reports
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Go to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Report a Problem</h1>
          <p className="text-gray-600 mt-2">Help improve your community by reporting issues in your area.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Problem Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Problem Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Brief description of the problem"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInputChange('category', category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.category === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{category.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter address or location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <Map className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">Interactive map would appear here</p>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Use Current Location
                </button>
              </div>
            </div>
          </div>

          {/* Problem Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Problem Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Provide detailed description of the problem..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Photos (Optional)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Drag and drop photos here, or{' '}
                <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                  browse files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
            </div>

            {/* Photo Preview */}
            {formData.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.photos.map(photo => (
                  <div key={photo.id} className="relative">
                    <img
                      src={photo.url}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Contact Information
            </label>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.contactInfo.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Report
            </button>
            <button
              type="button"
              onClick={() => navigateTo('feed')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportProblemPage;