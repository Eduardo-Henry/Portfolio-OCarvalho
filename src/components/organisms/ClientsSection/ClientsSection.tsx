import React, { useState, useEffect, useRef } from 'react';
import './ClientsSection.css';
import CoWorkerPhoto from '../../../assets/images/GuiPhoto.jpeg';

// 1. Definição da Interface Atualizada
interface Client {
  id: number;
  name: string;
  location: string;
  role: string; // Campo para a descrição abaixo do nome
  image?: string;
  feedback: string;
}

// 2. Mock de dados com múltiplos clientes para o carrossel
const clients: Client[] = [
  {
    id: 1,
    name: 'Guilherme Lira',
    location: 'Urupês-SP',
    role: 'Co-worker / Fullstack Developer',
    image: CoWorkerPhoto,
    feedback: "Eduardo Henry é um designer diferenciado, criativo e extremamente habilidoso. Ele consegue captar com precisão a ideia do cliente e transformar em uma arte de alto nível. Quando recebe liberdade para criar, vai além do esperado e surpreende nos detalhes. Do básico ao mais complexo, sabe combinar elementos de forma limpa, moderna e impactante. Seu trabalho chama atenção pela qualidade, organização visual e bom gosto. Sem dúvidas, um excelente profissional, sempre entregando mais do que o esperado."
  },
  {
    id: 2,
    name: 'Ana Silva',
    location: 'São Paulo-SP',
    role: 'Product Manager',
    image: CoWorkerPhoto, // Substitua pela foto real depois
    feedback: "Trabalhar com o Eduardo foi uma experiência incrível. Ele tem uma visão estética apurada e consegue simplificar fluxos complexos em interfaces totalmente intuitivas e limpas. Entrega rápida e comunicação impecável durante todo o processo do projeto."
  }
];

export const ClientsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const currentClient = clients[currentIndex];

  // 3. Intersection Observer: Detecta se o usuário está visualizando a seção
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.3 } // Ativa quando 30% da seção estiver na tela
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 4. Lógica do Carrossel: Roda a cada 7s APENAS se a seção estiver visível
  useEffect(() => {
    if (!isSectionVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isSectionVisible]);

  // 5. Efeito de Texto se Escrevendo (Gradual de Cor)
  const renderAnimatedText = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      // Calcula o delay proporcional para terminar tudo em aproximadamente 3 segundos
      const delay = (index / words.length) * 3;
      
      return (
        <span
          key={index}
          className={`animated-word ${isSectionVisible ? 'animate' : ''}`}
          style={{ animationDelay: `${delay}s` }}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <section className="clients-section" id="clients" ref={sectionRef}>
      
      {/* TOPO DA SEÇÃO */}
      <div className="clients-header-zone">
        <div className="clients-counter">
          <span className="counter-number">+23</span>
          <span className="counter-label">Networkings</span>
        </div>

        <h2 className="clients-title">
          CO-WORKERS AND CLIENTS<span className="clients-mark">®</span><br />
          FEEDBACK
        </h2>
      </div>

      {/* GRID INFERIOR */}
      <div className="clients-main-grid">
        
        {/* Coluna da Esquerda: Perfil, Foto e Nova Descrição */}
        <div className="clients-profile-zone">
          {clients.length > 0 && (
            <div className="clients-featured">
              <div className="client-featured-image">
                <img src={currentClient.image} alt={currentClient.name} />
              </div>
              <div className="client-meta-container">
                <h3 className="client-featured-info">
                  {currentClient.name}, {currentClient.location}
                </h3>
                {/* Nova descrição abaixo do nome */}
                <p className="client-role">{currentClient.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Coluna da Direita: Parágrafo com Animação e Botão */}
        <div className="clients-body-zone">
          {/* A key garante que a animação reinicie quando o cliente mudar no carrossel */}
          <p className="clients-description" key={currentIndex}>
            "{renderAnimatedText(currentClient.feedback)}"
          </p>

          <div className="clients-cta-container">
            <a href="#contact" className="clients-cta-wrapper">
              <span className="cta-text">ENTRAR EM CONTATO</span>
              <div className="cta-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
