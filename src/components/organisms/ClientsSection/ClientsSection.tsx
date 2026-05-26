import React from 'react';
import './ClientsSection.css';
import MyPhotoImg from '../../../assets/images/MyPhoto.png';

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
    image: MyPhotoImg,
  },
];

export const ClientsSection: React.FC = () => {
  return (
    <section className="clients-section" id="clients">
      <div className="clients-container">
        {/* Header */}
        <div className="clients-header">
          <h2 className="clients-title">
            NUMBERS<br />
            DON'T LIE<span className="clients-mark">®</span>
          </h2>
          <div className="clients-counter">+23 CLIENTS</div>
        </div>

        {/* Client Info */}
        <div className="clients-content">
          <p className="clients-description">
            Designing intuitive digital experiences where clarity meets purpose. I am UX/UI Designer focused on usability, systems, and human-centered design
          </p>

          {clients.length > 0 && (
            <div className="clients-featured">
              <div className="client-featured-image">
                <img src={clients[0].image} alt={clients[0].name} />
              </div>
              <div className="client-featured-info">
                <h3 className="client-featured-name">{clients[0].name}</h3>
                <p className="client-featured-location">{clients[0].location}</p>
              </div>
            </div>
          )}

          <a href="#contact" className="clients-cta">
            <span>GET IN TOUCH</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
