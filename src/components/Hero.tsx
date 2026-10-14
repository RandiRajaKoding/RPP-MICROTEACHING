import React from 'react';
import { ShieldAlert, ArrowRight, Activity } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-container container">
      <div className="hero-content animate-fade-in">
        <div className="badge delay-100">
          <Activity size={16} className="pulse" />
          <span>Misi Detektif Terbuka</span>
        </div>
        
        <h1 className="hero-title delay-200">
          Awas <span className="highlight">Jebakan</span> Phishing!
        </h1>
        
        <p className="hero-subtitle delay-300">
          Data pribadimu berharga. Di era digital, ancaman siber mengintai di balik pesan manis dan link menarik. Siapkah kamu menjadi detektif untuk mengungkap jebakan tersebut?
        </p>
        
        <div className="hero-actions delay-300">
          <a href="#simulasi" className="btn btn-primary">
            Mulai Investigasi
            <ArrowRight size={20} />
          </a>
          <a href="#materi" className="btn btn-outline">
            Pelajari Teori
          </a>
        </div>
      </div>
      
      <div className="hero-visual animate-fade-in delay-200">
        <div className="shield-wrapper">
          <div className="glow"></div>
          <div className="glass-panel shield-card">
            <ShieldAlert size={80} className="shield-icon" />
            <h3>Peringatan Siber</h3>
            <p>10,000+ Serangan Phishing terjadi hari ini.</p>
          </div>
          
          {/* Floating elements */}
          <div className="glass-panel float-card card-1">
            <div className="dot red"></div>
            <span>Link Mencurigakan</span>
          </div>
          <div className="glass-panel float-card card-2">
            <div className="dot green"></div>
            <span>Data Aman</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
