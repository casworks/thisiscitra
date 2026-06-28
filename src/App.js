import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BentoGrid from './components/BentoBox';
import Profile from './components/Profile';
import ATS from './components/CVATS'
import Hi3 from './components/hi3'
import MainPortofolio from "./components/mainPortofolio";
import KuliahPage from './components/KuliahPage';
import ScrollToHashElement from './components/ScrollToHashElement';
import FloatingTimerOnly from './components/FloatingTimerOnly';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import PublicWork from './components/PublicWork';
import ExperimentDetail from './components/ExperimentDetail';
import TravelDetailPage from './components/TravelDetailPage';
import ProfessionalPage from './components/ProfessionalPage';
import AkademikPage from './components/AkademikPage';

function App() {
  return (
    <Router>
      <ScrollToHashElement />

      <Routes>
        <Route path="/" element={<BentoGrid />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ats" element={<ATS />} />
        <Route path="/hi3" element={<Hi3 />} />
        <Route path="/kuliah" element={<KuliahPage />} />
        <Route path="/portofolio" element={<MainPortofolio />} />
        <Route path="/floating" element={<FloatingTimerOnly />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/public" element={<PublicWork />} />
        <Route path="/experiments/:slug" element={<ExperimentDetail />} />
        <Route path="/wishlist/:slug" element={<TravelDetailPage />} />
        <Route path="/profesional" element={<ProfessionalPage />} />
        <Route path="/akademik" element={<AkademikPage />} />
      </Routes>
    </Router>
  );
}

export default App;
