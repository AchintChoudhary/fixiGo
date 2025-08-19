import React, { useState } from 'react';
import Header from './components/Header';
import ProfilePage from './pages/ProfilePage';
import ReportProblemPage from './pages/ReportProblemPage';
import ProblemFeedPage from './pages/ProblemFeedPage';
import ProblemDetailPage from './pages/ProblemDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState('feed');
  const [selectedProblem, setSelectedProblem] = useState(null);

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      setSelectedProblem(data);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage navigateTo={navigateTo} />;
      case 'report':
        return <ReportProblemPage navigateTo={navigateTo} />;
      case 'feed':
        return <ProblemFeedPage navigateTo={navigateTo} />;
      case 'detail':
        return <ProblemDetailPage problem={selectedProblem} navigateTo={navigateTo} />;
      default:
        return <ProblemFeedPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;