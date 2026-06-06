import React from 'react';
import './ClientsSection.css';
import CoWorkerPhoto from '../../../assets/images/GuiPhoto.png';

interface Client {
  id: number;
  name: string;
  location: string;
  image?: string;
}

const clients: Client[] = [
  {
    id: 1,
    name: 'Mark',
    location: 'Minnesota',
    image: CoWorkerPhoto,
  },
];

export const ClientsSection: React.FC = () => {
  return (
    <section className="clients-section" id="clients">
      
      {/* 1. TOPO DA SEÇÃO (Título Principal + Menu de Navegação Lateral) */}
      <div className="clients-header-zone">
        
        {/* Contador flutuante fixado na extremidade superior esquerda */}
        <div className="clients-counter">
          <span className="counter-number">+23</span>
          <span className="counter-label">Networkings</span>
        </div>

        {/* Título Principal Atualizado */}
        <h2 className="clients-title">
          CO-WORKERS<span className="clients-mark">®</span><br />
          FEEDBACK
        </h2>
      </div>

      {/* 2. GRID INFERIOR (Foto à esquerda e Conteúdo/Botão à direita) */}
      <div className="clients-main-grid">
        
        {/* Coluna da Esquerda: Perfil e Foto do Cliente Destacado */}
        <div className="clients-profile-zone">
          {clients.length > 0 && (
            <div className="clients-featured">
              <div className="client-featured-image">
                <img src={clients[0].image} alt={clients[0].name} />
              </div>
              <h3 className="client-featured-info">
                {clients[0].name}, {clients[0].location}
              </h3>
            </div>
          )}
        </div>

        {/* Coluna da Direita: Parágrafo e o Botão Alinhados Lado a Lado */}
        <div className="clients-body-zone">
          <p className="clients-description">
            "Trabalhar com este UX Designer é ter a certeza de que o utilizador e o negócio estão
            em perfeita sintonia. A sua capacidade de transformar dados complexos de pesquisa em
            jornadas simples e interfaces intuitivas é impressionante. Destaco o seu rigor metodológico,
            que vai desde workshops de design thinking até entregas impecáveis para a engenharia. Além de técnico,
            é um colega extremamente colaborativo, empático e focado em resolver problemas reais. É o profissiona
            que qualquer equipa de produto de alta performance deseja ter."
          </p>

          {/* Botão em formato de Pílula correto */}
          <div className="clients-cta-container">
            <a href="#contact" className="clients-cta-wrapper">
              <span className="cta-text">GET IN TOUCH</span>
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
