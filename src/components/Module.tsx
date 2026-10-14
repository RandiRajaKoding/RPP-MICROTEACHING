import React, { useState } from 'react';
import { Lock, UserX, AlertTriangle, Fingerprint, EyeOff, ShieldCheck } from 'lucide-react';
import './Module.css';

const Module: React.FC = () => {
  const [activeTab, setActiveTab] = useState('data');

  return (
    <div className="module-container container">
      <div className="section-header text-center mb-5">
        <h2 className="section-title">Pahami <span className="highlight-text">Ancamannya</span></h2>
        <p className="section-subtitle">Pelajari dasar keamanan digital sebelum memulai investigasimu.</p>
      </div>

      <div className="tabs-wrapper">
        <div className="tabs-nav glass-panel">
          <button 
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            <Fingerprint size={20} />
            Data Pribadi
          </button>
          <button 
            className={`tab-btn ${activeTab === 'phishing' ? 'active' : ''}`}
            onClick={() => setActiveTab('phishing')}
          >
            <UserX size={20} />
            Phishing
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'data' && (
            <div className="tab-pane animate-fade-in">
              <div className="content-grid">
                <div className="glass-panel info-card">
                  <div className="icon-wrapper blue">
                    <Lock size={32} />
                  </div>
                  <h3>Apa itu Data Pribadi?</h3>
                  <p>Informasi yang dapat mengidentifikasi seseorang secara langsung maupun tidak langsung. Contoh: NIK, Nama Lengkap, Nomor HP, Alamat, dan Riwayat Kesehatan.</p>
                </div>
                <div className="glass-panel info-card">
                  <div className="icon-wrapper green">
                    <ShieldCheck size={32} />
                  </div>
                  <h3>Mengapa Harus Dilindungi?</h3>
                  <p>Pencurian data dapat berujung pada penipuan finansial, pembobolan akun media sosial, pemerasan, atau pencatutan nama untuk pinjaman online palsu.</p>
                </div>
                <div className="glass-panel info-card">
                  <div className="icon-wrapper yellow">
                    <EyeOff size={32} />
                  </div>
                  <h3>Cara Melindungi Data</h3>
                  <p>Gunakan password kuat, aktifkan 2FA (Two-Factor Authentication), jangan oversharing di media sosial, dan waspada terhadap link tidak dikenal.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'phishing' && (
            <div className="tab-pane animate-fade-in">
              <div className="phishing-layout">
                <div className="phishing-text">
                  <h3>Mengenal <span className="text-danger">Phishing</span></h3>
                  <p>Kejahatan siber berupa rekayasa sosial (social engineering) di mana pelaku menyamar sebagai pihak berwenang (bank, kurir, lembaga) untuk mencuri data sensitifmu.</p>
                  
                  <ul className="red-flags-list">
                    <li>
                      <AlertTriangle size={20} className="text-danger" />
                      <strong>Desakan Waktu:</strong> "Akun Anda akan diblokir dalam 24 jam!"
                    </li>
                    <li>
                      <AlertTriangle size={20} className="text-danger" />
                      <strong>Tautan Aneh:</strong> URL tidak resmi seperti <i>bca-klaim-hadiah.com</i> atau <i>bit.ly/paket-kurir</i>
                    </li>
                    <li>
                      <AlertTriangle size={20} className="text-danger" />
                      <strong>File Mencurigakan:</strong> Ekstensi aplikasi (.APK) yang menyamar sebagai foto paket atau undangan pernikahan.
                    </li>
                    <li>
                      <AlertTriangle size={20} className="text-danger" />
                      <strong>Typo/Ejaan Buruk:</strong> Banyak kesalahan penulisan pada pesan resmi.
                    </li>
                  </ul>
                </div>
                <div className="phishing-image-container">
                  <div className="glass-panel example-card">
                    <div className="example-header">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="example-body">
                      <div className="msg received">
                        Halo kak, paket dari J&T sudah sampai. Cek resi dan foto paket di aplikasi berikut ya: 
                        <br/><a href="#" className="fake-link">Lihat_Foto_Paket.apk</a>
                      </div>
                      <div className="warning-stamp">CONTOH PHISHING</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module;
