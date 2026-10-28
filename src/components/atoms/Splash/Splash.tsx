import React, { useEffect, useState } from 'react';
import './Splash.css';
import Image3D from '../../../assets/images/Image3D.png'; // Ajuste o caminho conforme as pastas do seu projeto

interface SplashProps {
  isLoading: boolean;
}

export const Splash: React.FC<SplashProps> = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className={`splash ${!isLoading ? 'splash-exit' : ''}`}>
      <div className="splash-content">
        
        {/* Lado Esquerdo: Bloco da imagem 3D com animação elástica */}
        <div className="splash-image-container">
          <img src={Image3D} alt="Logo 3D" className="splash-image-asset" />
        </div>

        {/* Lado Direito: Tipografia massiva idêntica ao print */}
        <div className="splash-text-container">
          <h1 className="splash-title">
            EDUARDO<br />
            HENRY CARVALHO
          </h1>
        </div>

      </div>
    </div>
  );
};