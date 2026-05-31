import React, { useEffect, useState } from 'react';
import './Splash.css';
import Image3D from '../../../assets/images/Image3D.png'; // Ajuste o caminho conforme as pastas do seu projeto

interface SplashProps {
  isLoading: boolean;
}

export const Splash: React.FC<SplashProps> = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Sincroniza o tempo de remoção do DOM com o fade-out do CSS (500ms)
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); 
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
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
            HENRY CARVALHO<span className="splash-mark">®</span>
          </h1>
        </div>

      </div>
    </div>
  );
};
