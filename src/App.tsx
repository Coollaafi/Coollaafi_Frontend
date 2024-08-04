import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/login';
import MainPage from 'pages/main';
import CommunityPage from 'pages/community';
import UploadImagePage from 'pages/upload-image';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/upload" element={<UploadImagePage />} />
    </Routes>
  );
}

export default App;
