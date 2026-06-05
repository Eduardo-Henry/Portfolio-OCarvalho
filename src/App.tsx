import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Splash } from './components/atoms';
import { Home } from './pages';
import { CaseStudyPage } from './pages/CaseStudyPage/CaseStudyPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Splash isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:id" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;