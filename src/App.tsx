import { useEffect, useState } from 'react';
import { Splash } from './components/atoms';
import { Home } from './pages';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Splash isLoading={isLoading} />
      <Home />
    </>
  );
}

export default App;
