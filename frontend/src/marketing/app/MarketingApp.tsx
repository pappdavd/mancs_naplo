
import MarketingLayout from '../layouts/MarketingLayout';
import HomePage from '../features/home/HomePage';
// A ThemeProvider innen törölve lett, mert a main.tsx kezeli!

function MarketingApp() {
  return (
    <MarketingLayout>
      <HomePage />
    </MarketingLayout>
  );
}

export default MarketingApp;