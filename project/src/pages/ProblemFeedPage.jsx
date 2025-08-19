import React, { useState } from 'react';
import { Search, Filter, Map, List, MapPin, ThumbsUp, MessageSquare, Calendar, User } from 'lucide-react';

const ProblemFeedPage = ({ navigateTo }) => {
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const problems = [
    {
      id: 1,
      title: 'Broken Streetlight on Main Street',
      category: 'Lighting',
      status: 'in-progress',
      location: 'Main St & 5th Ave',
      description: 'The streetlight has been flickering for several weeks and now completely dark.',
      reportedBy: 'John D.',
      reportedDate: '2024-01-20',
      upvotes: 12,
      comments: 3,
      photo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Large Pothole on Highway 101',
      category: 'Road',
      status: 'open',
      location: 'Highway 101, Mile 15',
      description: 'Deep pothole causing damage to vehicles and creating traffic hazards.',
      reportedBy: 'Sarah M.',
      reportedDate: '2024-01-18',
      upvotes: 28,
      comments: 8,
      photo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Overflowing Trash Bins in Central Park',
      category: 'Waste',
      status: 'resolved',
      location: 'Central Park, Near Main Entrance',
      description: 'Multiple trash bins are overflowing and attracting pests.',
      reportedBy: 'Mike R.',
      reportedDate: '2024-01-15',
      upvotes: 5,
      comments: 2,
      photo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Broken Playground Equipment',
      category: 'Parks',
      status: 'open',
      location: 'Riverside Park',
      description: 'Swing set chains are broken and pose safety risk to children.',
      reportedBy: 'Lisa K.',
      reportedDate: '2024-01-22',
      upvotes: 15,
      comments: 6,
      photo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Graffiti on Public Building',
      category: 'Safety',
      status: 'open',
      location: 'City Hall',
      description: 'Vandalism on the east wall of the city hall building.',
      reportedBy: 'Tom W.',
      reportedDate: '2024-01-21',
      upvotes: 3,
      comments: 1,
      photo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'Missing Stop Sign',
      category: 'Signage',
      status: 'in-progress',
      location: 'Oak St & Pine Ave',
      description: 'Stop sign was damaged in recent storm and needs replacement.',
      reportedBy: 'Emma L.',
      reportedDate: '2024-01-19',
      upvotes: 22,
      comments: 9,
      photo: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'road', label: 'Road' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'waste', label: 'Waste' },
    { id: 'parks', label: 'Parks' },
    { id: 'safety', label: 'Safety' },
    { id: 'signage', label: 'Signage' }
  ];

  const statusOptions = [
    { id: 'all', label: 'All Status' },
    { id: 'open', label: 'Open' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'open': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || problem.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || problem.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Problems</h1>
        <p className="text-gray-600">Browse and track issues reported by community members</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.label}</option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProblems.length} of {problems.length} problems
        </p>
      </div>

      {/* Content Area */}
      {viewMode === 'map' ? (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-600">Map view with problem locations would appear here</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProblems.map(problem => (
            <div key={problem.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                  {/* Problem Image */}
                  <div className="flex-shrink-0 mb-4 lg:mb-0">
                    <img
                      src={problem.photo}
                      alt={problem.title}
                      className="w-full lg:w-48 h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Problem Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{problem.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{problem.reportedDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{problem.reportedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {problem.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(problem.status)}`}>
                          {problem.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{problem.description}</p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-5 h-5" />
                          <span>{problem.upvotes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageSquare className="w-5 h-5" />
                          <span>{problem.comments}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => navigateTo('detail', problem)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => navigateTo('report')}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProblemFeedPage;