import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container navbar-container">
        <a href="#beranda" className="navbar-logo">
          <Shield className="logo-icon" size={28} />
          <span>Detektif Siber</span>
        </a>

        <div className="desktop-menu">
          <a href="#beranda" className="nav-link">Beranda</a>
          <a href="#materi" className="nav-link">Materi</a>
          <a href="#simulasi" className="nav-link">Simulasi</a>
          <a href="#galeri" className="nav-link">Galeri</a>
          <a href="#simulasi" className="btn btn-primary nav-btn">Mulai Misi</a>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#beranda" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Beranda</a>
        <a href="#materi" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Materi</a>
        <a href="#simulasi" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Simulasi</a>
        <a href="#galeri" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Galeri</a>
        <a href="#simulasi" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Mulai Misi</a>
      </div>
    </nav>
  );
};

export default Navbar;
