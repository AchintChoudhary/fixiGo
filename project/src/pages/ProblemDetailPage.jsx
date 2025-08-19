import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, User, ThumbsUp, MessageSquare, Flag, Share2, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ProblemDetailPage = ({ problem, navigateTo }) => {
  const [newComment, setNewComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);

  if (!problem) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem not found</h2>
          <button
            onClick={() => navigateTo('feed')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  const statusTimeline = [
    { status: 'reported', label: 'Reported', date: '2024-01-20', completed: true },
    { status: 'in-review', label: 'In Review', date: '2024-01-21', completed: true },
    { status: 'assigned', label: 'Assigned', date: '2024-01-22', completed: problem.status !== 'open' },
    { status: 'in-progress', label: 'In Progress', date: '2024-01-23', completed: problem.status === 'resolved' || problem.status === 'in-progress' },
    { status: 'resolved', label: 'Resolved', date: problem.status === 'resolved' ? '2024-01-25' : '', completed: problem.status === 'resolved' }
  ];

  const comments = [
    {
      id: 1,
      author: 'City Admin',
      date: '2024-01-21',
      message: 'Thank you for reporting this issue. We have received your report and are reviewing it.',
      isOfficial: true
    },
    {
      id: 2,
      author: 'Sarah M.',
      date: '2024-01-22',
      message: 'I drive by this area daily and can confirm this is a serious safety hazard.',
      isOfficial: false
    },
    {
      id: 3,
      author: 'Mike R.',
      date: '2024-01-23',
      message: 'When will this be fixed? It\'s been getting worse.',
      isOfficial: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'open': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleUpvote = () => {
    setHasUpvoted(!hasUpvoted);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigateTo('feed')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Problems</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{problem.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Problem Image */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src={problem.photo}
              alt={problem.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Problem Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {problem.category}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(problem.status)}`}>
                  {problem.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{problem.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Reported on {problem.reportedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>By {problem.reportedBy}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{problem.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleUpvote}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    hasUpvoted
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${hasUpvoted ? 'fill-current' : ''}`} />
                  <span>{problem.upvotes + (hasUpvoted ? 1 : 0)}</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageSquare className="w-5 h-5" />
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Comments</h3>
            
            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    comment.isOfficial ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <User className={`w-5 h-5 ${comment.isOfficial ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      {comment.isOfficial && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Official
                        </span>
                      )}
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h3>
            <div className="space-y-4">
              {statusTimeline.map((item, index) => (
                <div key={item.status} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {item.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {item.label}
                    </div>
                    {item.date && (
                      <div className="text-sm text-gray-500">{item.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Interactive map would show exact location</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{problem.location}</p>
          </div>

          {/* Similar Problems */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Problems</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">Broken Traffic Light</h4>
                <p className="text-xs text-gray-600">Oak St & Main Ave</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">Flickering Street Lamp</h4>
                <p className="text-xs text-gray-600">Pine St & 2nd Ave</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;