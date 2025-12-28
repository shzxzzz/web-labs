import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <span className="copyright-icon">©</span>
                    <span>Магазин 2025</span>
                    <a href="#" className="footer-link">Политика конфиденциальности</a>
                    <a href="#" className="footer-link">Cookie</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;