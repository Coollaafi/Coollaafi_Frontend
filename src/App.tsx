import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from 'pages/login';
import MainPage from 'pages/main';
import CommunityPage from 'pages/community';
import UploadImagePage from 'pages/upload-image';
import RecommendPage from 'pages/recommend';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/upload" element={<UploadImagePage />} />
        <Route path="/ai" element={<RecommendPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
