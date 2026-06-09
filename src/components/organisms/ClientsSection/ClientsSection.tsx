import React, { useState, useEffect, useRef } from 'react';
import './ClientsSection.css';
import CoWorkerPhoto from '../../../assets/images/GuiPhoto.png'; 
import FirstClient from '../../../assets/images/Matheus.png'; 
import SecondClient from '../../../assets/images/Mariana.png'; 
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
    role: 'Video maker / Editor de Vídeo ',
    image: CoWorkerPhoto,
    feedback: "Eduardo é um designer diferenciado, criativo e extremamente habilidoso. Ele consegue captar com precisão a ideia do cliente e transformar em uma arte de alto nível. Quando recebe liberdade para criar, vai além do esperado e surpreende nos detalhes. Do básico ao mais complexo, sabe combinar elementos de forma limpa, moderna e impactante. Seu trabalho chama atenção pela qualidade, organização visual e bom gosto. Sem dúvidas, um excelente profissional, sempre entregando mais do que o esperado."
  },

  {
    id: 2,
    name: 'Matheus Terradas',
    location: 'Polônia-SP',
    role: 'Desenvolvedor Front-end',
    image: FirstClient, // Substitua pela foto real depois
    feedback: "Tive ótimas experiências com os trabalhos do Eduardo como designer. Ele sempre demonstrou criatividade, atenção aos detalhes e muito profissionalismo em cada projeto. Além de entregar trabalhos de qualidade, foi prestativo e aberto a sugestões durante todo o processo. O resultado final sempre atendeu minhas expectativas, por isso recomendo seu trabalho com confiança."
  },

  {
    id: 3,
    name: 'Mariana Terradas',
    location: 'Polônia-SP',
    role: 'Cliente',
    image: SecondClient, // Substitua pela foto real depois
    feedback: "Tive uma ótima experiência com o trabalho do Eduardo. Enviei uma ideia e um modelo de referência para o design do meu terceirão, e ele conseguiu entender exatamente o que eu queria. O resultado ficou incrível, superando minhas expectativas em todos os detalhes. Além de muito talentoso, ele é atencioso e dedicado ao que faz. Recomendo seu trabalho para qualquer pessoa que esteja procurando um designer criativo e competente."
  },

   
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
          FEEDBACKS <span className="clients-mark">®</span>
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
              <span className="cta-text">CONVERSAR</span>
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
