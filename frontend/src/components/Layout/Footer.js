import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {currentYear} Cio-E-Commerce. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
