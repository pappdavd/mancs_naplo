import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarketingLayout from '../layouts/MarketingLayout';
import HomePage from '../features/home/HomePage';
// ÚJ IMPORTOK
import PrivacyPage from '../features/legal/PrivacyPage';
import TermsPage from '../features/legal/TermsPage';

const MarketingApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingLayout />}>
          
          <Route index element={<HomePage />} />
          
          {/* ÚJ ÚTVONALAK */}
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MarketingApp;