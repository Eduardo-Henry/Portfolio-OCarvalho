import React, { useState } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  // Guarda a proporção (largura / altura) real de cada imagem
  const [ratios, setRatios] = useState<{ [key: number]: number }>({});

  if (images.length === 0) {
    return <div className="carousel-empty">Nenhuma imagem disponível</div>;
  }

  // Lista triplicada para o efeito de esteira infinita e contínua
  const duplicatedImages = [...images, ...images, ...images];

  // Captura o tamanho nativo assim que o arquivo carrega em tela
  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    setRatios((prev) => ({ ...prev, [index]: ratio }));
  };

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {duplicatedImages.map((image, index) => {
          const currentRatio = ratios[index] || 1.5; // Proporção padrão caso ainda esteja carregando
          
          return (
            <div 
              key={index} 
              className="carousel-item"
              style={{ 
                '--proporcao': currentRatio 
              } as React.CSSProperties}
            >
              <img 
                src={image} 
                alt={`Slide ${index}`} 
                className="carousel-image" 
                onLoad={(e) => handleImageLoad(index, e)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
