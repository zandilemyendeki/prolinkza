import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NsfasPage from './pages/nsfas/NsfasPage';
import Universities from './pages/universities/UniversitiesPage';
import OpportunitiesPage from './pages/opportunities/OpportunitiesPage';
import ToolsPage from './pages/tools/ToolsPage';
import ResumeBuilderPage from './pages/tools/builder/ResumeBuilderPage';
import AtsCheckerPage from './pages/tools/ats/AtsCheckerPage';
import KeywordOptimizerPage from './pages/tools/keywords/KeywordOptimizerPage';
import CoverLetterPage from './pages/tools/cover-letter/CoverLetterPage';
import AboutPage from './pages/about/AboutPage';
import AdvertisePage from './pages/advertise/AdveritisePage';
import PrivacyPage from './pages/privacy-policy/PrivacyPage';
import TermsPage from './pages/terms/TermsPage'; 

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nsfas" element={<NsfasPage />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/tools/builder" element={<ResumeBuilderPage />} />
          <Route path="/tools/ats" element={<AtsCheckerPage />} />
          <Route path="/tools/keywords" element={<KeywordOptimizerPage />} />
          <Route path="/tools/cover-letter" element={<CoverLetterPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}