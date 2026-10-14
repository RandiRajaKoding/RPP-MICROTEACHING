import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertOctagon, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Mail, 
  MessageSquare, 
  Forward, 
  Globe, 
  HelpCircle,
  Lightbulb,
  Download
} from 'lucide-react';
import './Simulation.css';

interface RedFlag {
  id: string;
  tooltip: string;
}

interface Scenario {
  id: number;
  title: string;
  badge: string;
  instruction: string;
  type: 'whatsapp' | 'email' | 'sms';
  flags: RedFlag[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Kasus 1: Kurir Paket',
    badge: 'Malware .APK',
    instruction: 'Identifikasi 2 red flags pada pesan paket ini.',
    type: 'whatsapp',
    flags: [
      { id: 'wa1_sender', tooltip: 'Nomor Tidak Dikenal' },
      { id: 'wa1_text', tooltip: 'Desakan Waktu & Typo' }
    ]
  },
  {
    id: 2,
    title: 'Kasus 2: Undangan Digital',
    badge: 'Malware .APK',
    instruction: 'Identifikasi 2 red flags pada pesan undangan ini.',
    type: 'whatsapp',
    flags: [
      { id: 'wa2_sender', tooltip: 'Nomor Tidak Dikenal' },
      { id: 'wa2_file', tooltip: 'Ekstensi File Berbahaya (.apk)' }
    ]
  },
  {
    id: 3,
    title: 'Kasus 3: Pemblokiran Bank',
    badge: 'Phishing Email & Domain Palsu',
    instruction: 'Identifikasi 3 red flags pada email bank ini.',
    type: 'email',
    flags: [
      { id: 'em_sender', tooltip: 'Alamat Email Palsu' },
      { id: 'em_urgency', tooltip: 'Ancaman Pemblokiran 2 Jam' },
      { id: 'em_link', tooltip: 'Domain Tidak Resmi (.info)' }
    ]
  },
  {
    id: 4,
    title: 'Kasus 4: Kuota Belajar 50GB',
    badge: 'Link Phishing & TLD .xyz',
    instruction: 'Identifikasi 3 red flags pada pesan broadcast kuota gratis ini.',
    type: 'whatsapp',
    flags: [
      { id: 'wa4_sender', tooltip: 'Nomor Asing & Pesan Terusan' },
      { id: 'wa4_text', tooltip: 'Iming-iming Hadiah Tidak Masuk Akal' },
      { id: 'wa4_link', tooltip: 'Domain Tiruan (.xyz, Bukan .go.id)' }
    ]
  },
  {
    id: 5,
    title: 'Kasus 5: Peringatan Akun Medsos',
    badge: 'Phishing Email & Form Palsu',
    instruction: 'Identifikasi 3 red flags pada email peringatan hak cipta Instagram ini.',
    type: 'email',
    flags: [
      { id: 'em5_sender', tooltip: 'Domain Email Bukan Resmi Meta' },
      { id: 'em5_urgency', tooltip: 'Ancaman Panik Batas 24 Jam' },
      { id: 'em5_link', tooltip: 'Domain Formulir Tiruan' }
    ]
  },
  {
    id: 6,
    title: 'Kasus 6: Saldo DANA Kaget',
    badge: 'Smishing SMS & URL Shortener',
    instruction: 'Identifikasi 3 red flags pada pesan SMS e-wallet ini.',
    type: 'sms',
    flags: [
      { id: 'sms6_sender', tooltip: 'Nomor HP Biasa (Bukan ID Resmi DANA)' },
      { id: 'sms6_text', tooltip: 'Iming-iming Saldo & Desakan Waktu' },
      { id: 'sms6_link', tooltip: 'URL Shortener (Menyembunyikan Tautan Asli)' }
    ]
  }
];

const trapExplanations: Record<number, string> = {
  1: 'Anda mengunduh file .APK palsu! Aplikasi berbahaya ini merupakan malware pencuri SMS OTP perbankan.',
  2: 'Anda membuka file undangan .APK palsu! File ini langsung meminta izin akses kontak dan SMS untuk meretas perangkat Anda.',
  3: 'Anda menekan tautan login phishing bank! Situs bca-verify-akun.info adalah web tiruan untuk mencuri password & PIN internet banking.',
  4: 'Anda mengklik tautan kuota palsu! Tautan .xyz ini mengarahkan ke formulir pencurian identitas & jebakan nomor HP berlangganan SMS berbayar.',
  5: 'Anda mengklik formulir banding palsu! Tautan helpdesk-center.net ini mencuri username, password, dan kode 2FA Instagram Anda.',
  6: 'Anda mengklik URL shortener (bit.ly)! Tautan pendek ini menyamarkan situs web phishing yang mencuri PIN dan OTP dompet digital Anda.'
};

const winExplanations: Record<number, string> = {
  1: 'Hebat! Anda jeli melihat ekstensi .APK dan kata-kata typo berdesakan waktu.',
  2: 'Luar biasa! Undangan pernikahan yang aman tidak pernah meminta Anda menginstal aplikasi .APK!',
  3: 'Tepat sekali! Anda cermat mengenali domain palsu (.info) serta alamat email pengirim yang mencurigakan.',
  4: 'Mantap! Anda paham bahwa domain resmi pemerintah selalu berakhiran .go.id, bukan domain murah seperti .xyz!',
  5: 'Cemerlang! Anda tidak panik dengan ancaman 24 jam dan jeli mengecek alamat email pengirim serta domain formulir.',
  6: 'Kritis sekali! Anda waspada terhadap SMS dari nomor biasa dan tidak terjebak URL Shortener (bit.ly) yang menyamarkan situs aslinya.'
};

const Simulation: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showEduGuide, setShowEduGuide] = useState(false);

  const scenario = scenarios[currentScenario];
  const totalFlags = scenario.flags.length;

  const handleFlagClick = (flagId: string) => {
    if (gameOver || gameWon) return;

    if (!foundFlags.includes(flagId)) {
      const newFlags = [...foundFlags, flagId];
      setFoundFlags(newFlags);
      
      if (newFlags.length === totalFlags) {
        setGameWon(true);
      }
    }
  };

  const handleTrapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameOver || gameWon) return;
    setGameOver(true);
  };

  const resetGame = () => {
    setFoundFlags([]);
    setGameOver(false);
    setGameWon(false);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      resetGame();
    }
  };

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1);
      resetGame();
    }
  };

  return (
    <div className="simulation-container container">
      <div className="section-header text-center mb-5">
        <h2 className="section-title">Zona <span className="highlight-text">Simulasi Interaktif</span></h2>
        <p className="section-subtitle">
          Uji insting detektifmu menghadapi aneka modus <strong>Link Phishing</strong>, <strong>Smishing</strong>, dan <strong>Malware .APK</strong>.<br/>
          Temukan tanda-tanda bahayanya (Red Flags) dan <em>JANGAN KLIK</em> jebakan utamanya!
        </p>
      </div>

      <div className="sim-layout">
        {/* Smartphone Mockup */}
        <div className="phone-mockup">
          <div className="phone-notch"></div>
          <div className="phone-screen">
            
            {/* Tipe WhatsApp (Kasus 1, 2, 4) */}
            {scenario.type === 'whatsapp' && (
              <>
                <div className="wa-header">
                  <div 
                    className={`wa-sender ${foundFlags.includes(`wa${scenario.id}_sender`) ? 'flag-found' : ''}`}
                    onClick={() => handleFlagClick(`wa${scenario.id}_sender`)}
                  >
                    <div className="avatar">?</div>
                    <div className="sender-info">
                      <h4>
                        {scenario.id === 1 && '+62 813-9999-0000'}
                        {scenario.id === 2 && '+62 852-1111-2222'}
                        {scenario.id === 4 && '+62 895-4422-9988'}
                      </h4>
                      <span>Online</span>
                    </div>
                    {foundFlags.includes(`wa${scenario.id}_sender`) && 
                      <div className="flag-tooltip">{scenario.flags.find(f => f.id === `wa${scenario.id}_sender`)?.tooltip}</div>
                    }
                  </div>
                </div>

                <div className="wa-body">
                  <div className="date-badge">Hari ini</div>
                  
                  {/* Kasus 1: Kurir Paket APK */}
                  {scenario.id === 1 && (
                    <div className="message received">
                      <div 
                        className={`msg-text ${foundFlags.includes('wa1_text') ? 'flag-found' : ''}`}
                        onClick={() => handleFlagClick('wa1_text')}
                      >
                        Yth. Pelanggan, <br/>
                        Paket anda tertahan digudang kmi krena alamat tidak lngkp. <br/>
                        Segera instal aplikasi lacak d bawah ini untk konfirmasi dlm waktu 1x24 jam atau pket hangus!
                        {foundFlags.includes('wa1_text') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'wa1_text')?.tooltip}</div>}
                      </div>
                      
                      <div className="wa-doc-card">
                        <div className="wa-doc-file-info">
                          <div className="wa-doc-badge">APK</div>
                          <div className="wa-doc-details">
                            <span className="wa-doc-title">Lacak_Paket_JNT.apk</span>
                            <span className="wa-doc-meta">8.4 MB • Berkas Instalasi</span>
                          </div>
                        </div>
                        <div 
                          className="wa-doc-download-btn trap-link" 
                          onClick={handleTrapClick}
                          title="Ketuk untuk mengunduh dan memasang berkas"
                        >
                          <Download size={18} />
                        </div>
                      </div>
                      <span className="time">10:42</span>
                    </div>
                  )}

                  {/* Kasus 2: Undangan Digital APK */}
                  {scenario.id === 2 && (
                    <div className="message received">
                      <div className="msg-text">
                        Bismillahirrohmanirrohim, <br/>
                        Tanpa mengurangi rasa hormat, kami mengundang bapak/ibu/saudara/i sekalian untuk hadir di acara resepsi pernikahan kami. <br/><br/>
                        Mohon doa restunya. Detail acara dan denah lokasi dapat diakses pada berkas di bawah ini: 🙏
                      </div>
                      
                      <div className="wa-doc-card">
                        <div 
                          className={`wa-doc-file-info ${foundFlags.includes('wa2_file') ? 'flag-found' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFlagClick('wa2_file');
                          }}
                          title="Periksa nama & ekstensi berkas"
                        >
                          <div className="wa-doc-badge">APK</div>
                          <div className="wa-doc-details">
                            <span className="wa-doc-title">Surat_Undangan_Digital.apk</span>
                            <span className="wa-doc-meta">15 MB • Dokumen APK</span>
                          </div>
                          {foundFlags.includes('wa2_file') && (
                            <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'wa2_file')?.tooltip}</div>
                          )}
                        </div>
                        
                        <div 
                          className="wa-doc-download-btn trap-link" 
                          onClick={handleTrapClick}
                          title="Ketuk untuk mengunduh dan memasang aplikasi"
                        >
                          <Download size={18} />
                        </div>
                      </div>
                      <span className="time">13:15</span>
                    </div>
                  )}

                  {/* Kasus 4: Link Phishing Kuota Belajar 50GB */}
                  {scenario.id === 4 && (
                    <div className="message received">
                      <div className="wa-forwarded">
                        <Forward size={13} />
                        <span>Diteruskan berkali-kali</span>
                      </div>
                      <div 
                        className={`msg-text ${foundFlags.includes('wa4_text') ? 'flag-found' : ''}`}
                        onClick={() => handleFlagClick('wa4_text')}
                      >
                        🎉 <strong>BANTUAN SUBSIDI PENDIDIKAN</strong> 🎉<br/>
                        Kemendikbudristek membagikan Kuota Belajar 50GB & Pulsa Gratis untuk seluruh siswa & guru sekolah!<br/>
                        <em>Klaim sebelum batas kuota ditutup malam ini!</em>
                        {foundFlags.includes('wa4_text') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'wa4_text')?.tooltip}</div>}
                      </div>

                      <div className="wa-link-preview-box">
                        <div className="wa-link-card" onClick={handleTrapClick}>
                          <div className="link-thumb">
                            <Globe size={26} />
                            <span>KEMENDIKBUD RI</span>
                          </div>
                          <div className="link-info">
                            <h5>Portal Bantuan Kuota Internet 50GB</h5>
                            <p>Verifikasi nomor ponsel Anda untuk aktivasi kuota belajar gratis...</p>
                          </div>
                        </div>

                        <div 
                          className={`wa-link-url fake-url ${foundFlags.includes('wa4_link') ? 'flag-found' : ''}`}
                          onClick={() => handleFlagClick('wa4_link')}
                        >
                          https://kemdikbud.kuota-gratis2026.xyz/klaim
                          {foundFlags.includes('wa4_link') && <div className="flag-tooltip bottom">{scenario.flags.find(f => f.id === 'wa4_link')?.tooltip}</div>}
                        </div>

                        <button className="btn-warning btn-sm btn-block trap-link" onClick={handleTrapClick}>
                          Klaim 50GB Sekarang
                        </button>
                      </div>
                      <span className="time">09:14</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Tipe Email (Kasus 3, 5) */}
            {scenario.type === 'email' && (
              <div className="email-ui">
                <div className="email-header">
                  <div className="email-app-bar">
                    <Mail size={18} /> <span>Kotak Masuk</span>
                  </div>

                  {/* Kasus 3: Bank BCA */}
                  {scenario.id === 3 && (
                    <>
                      <h3 className="email-subject">PEMBERITAHUAN PEMBLOKIRAN REKENING</h3>
                      <div 
                        className={`email-sender ${foundFlags.includes('em_sender') ? 'flag-found' : ''}`}
                        onClick={() => handleFlagClick('em_sender')}
                      >
                        <div className="avatar bg-blue">B</div>
                        <div className="sender-info">
                          <h4>Bank Central Asia</h4>
                          <span className="email-address">security@bca-verify-akun.info</span>
                        </div>
                        {foundFlags.includes('em_sender') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'em_sender')?.tooltip}</div>}
                      </div>
                    </>
                  )}

                  {/* Kasus 5: Instagram Copyright / Medsos */}
                  {scenario.id === 5 && (
                    <>
                      <h3 className="email-subject">[PERINGATAN AKHIR] Hak Cipta & Penutupan Akun</h3>
                      <div 
                        className={`email-sender ${foundFlags.includes('em5_sender') ? 'flag-found' : ''}`}
                        onClick={() => handleFlagClick('em5_sender')}
                      >
                        <div className="avatar bg-purple">IG</div>
                        <div className="sender-info">
                          <h4>Instagram Support Center</h4>
                          <span className="email-address">appeals@meta-security-support.cc</span>
                        </div>
                        {foundFlags.includes('em5_sender') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'em5_sender')?.tooltip}</div>}
                      </div>
                    </>
                  )}
                </div>

                <div className="email-body">
                  {/* Isi Kasus 3 */}
                  {scenario.id === 3 && (
                    <>
                      <p>Nasabah Yth,</p>
                      <p 
                        className={`email-urgency ${foundFlags.includes('em_urgency') ? 'flag-found' : ''}`}
                        onClick={() => handleFlagClick('em_urgency')}
                      >
                        Sistem kami mendeteksi aktivitas mencurigakan. Rekening Anda <strong>akan diblokir permanen dalam waktu 2 jam</strong> jika Anda tidak melakukan verifikasi data sekarang juga!
                        {foundFlags.includes('em_urgency') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'em_urgency')?.tooltip}</div>}
                      </p>
                      <div className="email-action">
                        <button className="btn btn-danger trap-link" onClick={handleTrapClick}>VERIFIKASI SEKARANG</button>
                      </div>
                      <p className="email-footer">
                        Abaikan pesan ini jika Anda sudah melakukan verifikasi.<br/>
                        Tautan alternatif: 
                        <span 
                          className={`fake-url ${foundFlags.includes('em_link') ? 'flag-found' : ''}`}
                          onClick={() => handleFlagClick('em_link')}
                        >
                          http://bca-verify-akun.info/login
                          {foundFlags.includes('em_link') && <div className="flag-tooltip bottom">{scenario.flags.find(f => f.id === 'em_link')?.tooltip}</div>}
                        </span>
                      </p>
                    </>
                  )}

                  {/* Isi Kasus 5 */}
                  {scenario.id === 5 && (
                    <>
                      <p>Halo Pengguna @siswa_smakita,</p>
                      <p 
                        className={`email-urgency ${foundFlags.includes('em5_urgency') ? 'flag-found' : ''}`}
                        onClick={() => handleFlagClick('em5_urgency')}
                      >
                        Akun Instagram Anda terdeteksi melanggar Ketentuan Hak Cipta Musik & Konten. <strong>Akun Anda akan dinonaktifkan permanen dalam 24 jam</strong> kecuali Anda mengajukan sanggahan!
                        {foundFlags.includes('em5_urgency') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'em5_urgency')?.tooltip}</div>}
                      </p>
                      <div className="email-action">
                        <button className="btn btn-primary trap-link" onClick={handleTrapClick}>AJUKAN BANDING SEKARANG</button>
                      </div>
                      <p className="email-footer">
                        Tautan formulir banding resmi:<br/>
                        <span 
                          className={`fake-url ${foundFlags.includes('em5_link') ? 'flag-found' : ''}`}
                          onClick={() => handleFlagClick('em5_link')}
                        >
                          https://instagram-form-appeals.helpdesk-center.net/login
                          {foundFlags.includes('em5_link') && <div className="flag-tooltip bottom">{scenario.flags.find(f => f.id === 'em5_link')?.tooltip}</div>}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Tipe SMS (Kasus 6: Smishing DANA Kaget) */}
            {scenario.type === 'sms' && (
              <div className="sms-ui">
                <div className="sms-header">
                  <div className="sms-app-bar">
                    <MessageSquare size={18} /> <span>Pesan (SMS)</span>
                  </div>
                  <div 
                    className={`sms-sender ${foundFlags.includes('sms6_sender') ? 'flag-found' : ''}`}
                    onClick={() => handleFlagClick('sms6_sender')}
                  >
                    <div className="avatar bg-blue">D</div>
                    <div className="sender-info">
                      <h4>+62 878-5544-3321</h4>
                      <span>Pesan Teks Seluler</span>
                    </div>
                    {foundFlags.includes('sms6_sender') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'sms6_sender')?.tooltip}</div>}
                  </div>
                </div>

                <div className="sms-body">
                  <div className="date-badge">Hari ini • 14:20</div>
                  <div className="sms-bubble received">
                    <div 
                      className={`msg-text ${foundFlags.includes('sms6_text') ? 'flag-found' : ''}`}
                      onClick={() => handleFlagClick('sms6_text')}
                    >
                      INFO RESMI DANA: Selamat! Nomor Anda terpilih menerima saldo DANA Kaget sebesar Rp 750.000. Ambil saldo sebelum kedaluwarsa malam ini pukul 23:59 WIB!
                      {foundFlags.includes('sms6_text') && <div className="flag-tooltip">{scenario.flags.find(f => f.id === 'sms6_text')?.tooltip}</div>}
                    </div>

                    <div className="sms-link-wrapper">
                      <span>Link penarikan: </span>
                      <span 
                        className={`fake-url ${foundFlags.includes('sms6_link') ? 'flag-found' : ''}`}
                        onClick={() => handleFlagClick('sms6_link')}
                      >
                        https://bit.ly/dana-kaget-reward-2026
                        {foundFlags.includes('sms6_link') && <div className="flag-tooltip bottom">{scenario.flags.find(f => f.id === 'sms6_link')?.tooltip}</div>}
                      </span>
                    </div>

                    <div className="trap-msg text-center mt-3">
                      <button className="btn btn-primary btn-sm btn-block trap-link" onClick={handleTrapClick}>
                        Klaim Saldo Rp 750.000
                      </button>
                    </div>
                    <span className="time">14:20</span>
                  </div>
                </div>
              </div>
            )}

            {/* Overlays */}
            {gameOver && (
              <div className="overlay game-over animate-fade-in">
                <AlertOctagon size={60} className="text-danger mb-3" />
                <h3>Oops! Jebakan Berhasil Mengenaimu!</h3>
                <p className="overlay-desc">
                  {trapExplanations[scenario.id] || 'Anda telah menekan jebakan utama (link/file berbahaya).'}
                </p>
                <button className="btn btn-outline mt-4" onClick={resetGame}>
                  <RotateCcw size={18} /> Coba Lagi Kasus Ini
                </button>
              </div>
            )}

            {gameWon && (
              <div className="overlay game-won animate-fade-in">
                <CheckCircle size={60} className="text-success mb-3" />
                <h3>Tepat Sekali! Insting Detektifmu Tajam!</h3>
                <p className="overlay-desc">
                  {winExplanations[scenario.id] || 'Anda berhasil menemukan semua kejanggalan dan terhindar dari jebakan.'}
                </p>
                <div className="win-actions mt-4">
                  <button className="btn btn-outline mr-2" onClick={resetGame}>Ulangi Kasus</button>
                  {currentScenario < scenarios.length - 1 ? (
                    <button className="btn btn-primary" onClick={nextScenario}>Kasus Selanjutnya →</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => { setCurrentScenario(0); resetGame(); }}>
                      Ulangi Kasus 1 ↺
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel Kontrol & Status Simulasi */}
        <div className="sim-status glass-panel">
          {/* Navigasi Cepat Antar Kasus */}
          <div className="scenario-chips mb-4">
            {scenarios.map((sc, idx) => (
              <button
                key={sc.id}
                className={`chip-btn ${currentScenario === idx ? 'active' : ''}`}
                onClick={() => {
                  setCurrentScenario(idx);
                  resetGame();
                }}
              >
                Kasus {sc.id}
              </button>
            ))}
          </div>

          <div className="scenario-nav mb-3">
            <button className="icon-btn" onClick={prevScenario} disabled={currentScenario === 0} title="Kasus Sebelumnya">
              <ChevronLeft size={20} />
            </button>
            <div className="text-center">
              <span className="badge-type">{scenario.badge}</span>
              <h3 className="scenario-title m-0">{scenario.title}</h3>
            </div>
            <button className="icon-btn" onClick={nextScenario} disabled={currentScenario === scenarios.length - 1} title="Kasus Selanjutnya">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <p className="mb-4 text-muted text-center">{scenario.instruction}</p>

          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(foundFlags.length / totalFlags) * 100}%` }}
              ></div>
            </div>
            <div className="d-flex justify-between">
              <span className="progress-text">{foundFlags.length} dari {totalFlags} Red Flags Ditemukan</span>
              <span className="progress-percentage">{Math.round((foundFlags.length / totalFlags) * 100)}%</span>
            </div>
          </div>

          {/* Checklist Temuan */}
          <div className="flag-checklist mt-4">
            <h4>Checklist Temuan Red Flags:</h4>
            <div className="flag-tags">
              {scenario.flags.map(f => {
                const isFound = foundFlags.includes(f.id);
                return (
                  <div key={f.id} className={`flag-tag-item ${isFound ? 'found' : 'missing'}`}>
                    {isFound ? (
                      <>
                        <CheckCircle size={16} className="text-success flex-shrink-0" />
                        <span><strong>Ditemukan:</strong> {f.tooltip}</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle size={16} className="text-muted flex-shrink-0" />
                        <span>Kejanggalan belum ditemukan... (Klik teks/elemen di HP)</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips Deteksi Link Phishing (Interaktif) */}
          <div className="link-edu-box mt-4">
            <div className="link-edu-header" onClick={() => setShowEduGuide(!showEduGuide)}>
              <div className="d-flex align-items-center gap-2">
                <Lightbulb size={18} className="text-warning flex-shrink-0" />
                <strong>Tips Rahasia Detektif: Anatomi Link Phishing</strong>
              </div>
              <span className="expand-indicator">{showEduGuide ? '▲ Tutup' : '▼ Buka Panduan'}</span>
            </div>
            {showEduGuide && (
              <div className="link-edu-content animate-fade-in">
                <div className="edu-item">
                  <strong>1. Teliti Domain Utama (Sebelum Garis Miring Pertama):</strong>
                  <p>Pada <code>kemdikbud.kuota-gratis2026.xyz</code>, domain aslinya adalah <b>kuota-gratis2026.xyz</b>, bukan Kemdikbud! Domain resmi instansi pemerintah Indonesia wajib berakhiran <b>.go.id</b>.</p>
                </div>
                <div className="edu-item">
                  <strong>2. Waspadai Pemendek Tautan (URL Shortener):</strong>
                  <p>Tautan seperti <code>bit.ly/...</code> atau <code>tinyurl.com/...</code> sengaja digunakan pelaku untuk menyembunyikan alamat situs web penipuan di baliknya.</p>
                </div>
                <div className="edu-item">
                  <strong>3. Awasi Rekayasa Sosial & FOMO (Fear of Missing Out):</strong>
                  <p>Pesan phishing selalu menyertakan ancaman batas waktu darurat ("Diblokir dalam 2 jam!") atau iming-iming hadiah gratis untuk mematikan akal kritis korban.</p>
                </div>
              </div>
            )}
          </div>

          <div className="instructions mt-4">
            <h4>Petunjuk Bermain:</h4>
            <ul>
              <li>Klik pada bagian pesan (Pengirim, Teks Panik, Tautan URL, atau Lampiran) yang mencurigakan.</li>
              <li>Hindari menekan tombol aksi konfirmasi atau link jebakan utama.</li>
              <li>Gunakan tombol <em>Kasus 1 - 6</em> di atas untuk menjelajahi seluruh simulasi.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
