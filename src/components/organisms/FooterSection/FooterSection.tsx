import React from 'react';
import './FooterSection.css';

export const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section-col">
            <h3 className="footer-title">EDUARDO</h3>
            <p className="footer-description">UX/UI Designer focused on usability, systems, and human-centered design.</p>
          </div>

          <div className="footer-section-col">
            <h4 className="footer-subtitle">NAVIGATION</h4>
            <nav className="footer-nav">
              <a href="#home" className="footer-link">HOME</a>
              <a href="#about" className="footer-link">ABOUT ME</a>
              <a href="#skills" className="footer-link">SKILLS</a>
              <a href="#works" className="footer-link">WORKS</a>
            </nav>
          </div>

          <div className="footer-section-col">
            <h4 className="footer-subtitle">SOCIAL</h4>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.331.012 7.052.07 2.696.278.278 2.579.07 7.052.012 8.331 0 8.756 0 12s.012 3.669.07 4.948c.208 4.473 2.626 6.874 7.099 7.082 1.279.058 1.704.07 4.948.07 3.245 0 3.669-.012 4.948-.07 4.473-.208 6.874-2.626 7.083-7.099.058-1.279.07-1.704.07-4.948 0-3.245-.012-3.669-.07-4.948-.208-4.473-2.626-6.875-7.1-7.083C15.668.012 15.244 0 12 0z" />
                </svg>
              </a>
              <a href="#" aria-label="Behance" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-4.675 0-2.947 2.49-4.675 5.564-4.675 2.071 0 3.989 1.075 4.947 2.784l-2.559 1.584c-.571-.937-1.554-1.554-2.388-1.554-1.663 0-2.929 1.231-2.929 2.861 0 1.63 1.266 2.861 2.929 2.861 1.758 0 2.767-.968 3.05-1.555h-3.050v-2h5.701v.995z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section-col">
            <h4 className="footer-subtitle">CONTACT</h4>
            <a href="mailto:hello@eduardo.design" className="footer-link footer-email">hello@eduardo.design</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} Eduardo. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
