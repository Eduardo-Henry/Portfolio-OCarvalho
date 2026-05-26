import React from 'react';
import './FooterSection.css';

export const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-column">
            <h3 className="footer-brand">EDUARDO</h3>
            <p className="footer-description">
              UX/UI Designer focused on usability, systems, and human-centered design.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-column">
            <h4 className="footer-title">NAVIGATION</h4>
            <nav className="footer-nav">
              <a href="#home" className="footer-link">
                HOME
              </a>
              <a href="#about" className="footer-link">
                ABOUT ME
              </a>
              <a href="#skills" className="footer-link">
                SKILLS
              </a>
              <a href="#works" className="footer-link">
                WORKS
              </a>
            </nav>
          </div>

          {/* Social Column */}
          <div className="footer-column">
            <h4 className="footer-title">SOCIAL</h4>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/eduardohenry/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ocarvalho.dzn/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
              <a
                href="https://www.behance.net/eduardohenry1"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="Behance"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7h-7V5.5h7V7zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.083 2.003H16.61c.088.929.719 2.887 2.727 2.887 1.16 0 1.734-.557 2.245-1.424l1.869.833c-.724 1.096-1.9 2.057-4.121 2.057-.537 0-1.046-.044-1.526-.152zm-5.596-9.11c-1.466 0-2.435.617-2.66 1.955h5.155c-.158-1.338-1.194-1.955-2.496-1.955zM3 5.5h3.5c1.38 0 2.361.92 2.361 2.02 0 1.1-.980 2.037-2.361 2.037H3V5.5zm0 6h3.256c1.797 0 2.745 1.055 2.745 2.304 0 1.289-.948 2.321-2.745 2.321H3v-4.625z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4 className="footer-title">CONTACT</h4>
            <a href="mailto:hello@eduardo.design" className="footer-email">
              hello@eduardo.design
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Eduardo. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-legal-link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
