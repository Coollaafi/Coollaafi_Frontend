import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from 'pages/login/login';
import LoginSuccessPage from 'pages/login/loginSuccess';
import JoinPage from 'pages/join';
import HomePage from 'pages/home';
import CommunityPage from 'pages/community';
import CommunityDetailPage from 'pages/community-detail';
import UploadImagePage from 'pages/upload-image';
import RecommendPage from 'pages/recommend';
import ScrollToTop from 'ScrollToTop';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login/success" element={<LoginSuccessPage />} />
          <Route path="/home/:memberId" element={<HomePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:postId" element={<CommunityDetailPage />} />
          <Route path="/upload" element={<UploadImagePage />} />
          <Route path="/ai" element={<RecommendPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
