import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import AITutor from './pages/AITutor';
import Curriculum from './pages/Curriculum';
import TopicViewer from './pages/TopicViewer';
import './index.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isFullScreen = location.pathname === '/ai-tutor';

  return (
    <>
      {!isFullScreen && <Navbar />}
      <main className={!isFullScreen ? 'main-content' : ''}>
        {children}
      </main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/learn/:classId/:subjectId/:chapterId/:topicId" element={<TopicViewer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
