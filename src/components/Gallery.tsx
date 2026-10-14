import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Send, 
  ThumbsUp, 
  MessageSquare, 
  ExternalLink,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import './Gallery.css';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface Project {
  id: number;
  studentName: string;
  title: string;
  url: string;
  likes: number;
  comments: Comment[];
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    studentName: 'Kelompok 1 (Budi & Andi)',
    title: 'Awas Phishing Berkedok Undangan!',
    url: 'https://canva.com/design/example1',
    likes: 12,
    comments: [
      {
        id: 101,
        author: 'Siti (Kelompok 2)',
        text: 'Penjelasan tentang bahaya file .APK di undangan sangat jelas dan mudah dipahami!',
        timestamp: '10 menit lalu'
      },
      {
        id: 102,
        author: 'Pak Randi (Guru)',
        text: 'Desain visualnya bagus dan kontras warnanya tepat. Perbanyak tips pencegahannya ya!',
        timestamp: '5 menit lalu'
      }
    ]
  },
  {
    id: 2,
    studentName: 'Kelompok 2 (Siti & Rani)',
    title: '5 Cara Melindungi Data Pribadi',
    url: 'https://canva.com/design/example2',
    likes: 8,
    comments: [
      {
        id: 201,
        author: 'Budi (Kelompok 1)',
        text: 'Poin tentang aktivasi 2FA dan bahaya oversharing di medsos sangat mengedukasi.',
        timestamp: '15 menit lalu'
      }
    ]
  }
];

const Gallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Track liked project IDs for the current user
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  
  // Track which project has comments opened
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  
  // Comment form states
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !url) return;

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      const newProject: Project = {
        id: Date.now(),
        studentName: name,
        title,
        url,
        likes: 0,
        comments: []
      };
      
      setProjects([newProject, ...projects]);
      setName('');
      setTitle('');
      setUrl('');
      setIsSubmitting(false);
    }, 600);
  };

  const handleLike = (id: number) => {
    const isAlreadyLiked = likedProjects.includes(id);
    
    if (isAlreadyLiked) {
      setLikedProjects(likedProjects.filter(pId => pId !== id));
      setProjects(projects.map(p => 
        p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p
      ));
    } else {
      setLikedProjects([...likedProjects, id]);
      setProjects(projects.map(p => 
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      ));
    }
  };

  const toggleComments = (id: number) => {
    if (activeCommentId === id) {
      setActiveCommentId(null);
    } else {
      setActiveCommentId(id);
      setCommentText('');
    }
  };

  const handleAddComment = (e: React.FormEvent, projectId: number) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: commentAuthor.trim() || 'Siswa Peninjau',
      text: commentText.trim(),
      timestamp: 'Baru saja'
    };

    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    setCommentText('');
  };

  return (
    <div className="gallery-container container">
      <div className="section-header text-center mb-5">
        <h2 className="section-title">Galeri <span className="highlight-text">Karya & Peer-Review</span></h2>
        <p className="section-subtitle">
          Kumpulkan purwarupa infografis Canva kelompokmu, berikan apresiasi (<strong>Like</strong>), <br/>
          serta tuliskan ulasan sejawat (<strong>Peer-Assessment</strong>) untuk karya kelompok teman-temanmu.
        </p>
      </div>

      <div className="gallery-layout">
        <div className="submission-panel glass-panel">
          <h3><ImageIcon size={20} className="inline-icon" /> Kumpulkan Tugas Proyek</h3>
          <p className="submission-subtitle text-muted mb-4">
            Pastikan tautan Canva Anda telah diatur agar dapat diakses publik.
          </p>
          <form onSubmit={handleSubmit} className="submission-form">
            <div className="form-group">
              <label>Nama Kelompok / Siswa</label>
              <input 
                type="text" 
                placeholder="Misal: Kelompok 3 (Rian & Dika)" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Judul Karya Infografis</label>
              <input 
                type="text" 
                placeholder="Misal: Waspada Jebakan Smishing & APK!" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Tautan Canva / GDrive</label>
              <div className="input-with-icon">
                <LinkIcon size={18} className="input-icon" />
                <input 
                  type="url" 
                  placeholder="https://canva.com/design/..." 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : <><Send size={18} /> Publikasikan Karya</>}
            </button>
          </form>
        </div>

        <div className="projects-grid">
          {projects.map(project => {
            const isLiked = likedProjects.includes(project.id);
            const isCommentsOpen = activeCommentId === project.id;

            return (
              <div key={project.id} className="project-card glass-panel">
                <div className="project-placeholder">
                  <div className="placeholder-badge">
                    <Sparkles size={14} /> Infografis Siswa
                  </div>
                  <ImageIcon size={44} className="placeholder-icon" />
                  <span>Pratinjau Desain Canva</span>
                </div>
                
                <div className="project-info">
                  <h4>{project.title}</h4>
                  <p className="student-name">
                    <User size={14} className="inline-icon-user" /> Oleh: {project.studentName}
                  </p>
                  
                  <div className="project-actions">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-link"
                      title="Buka karya asli di Canva"
                    >
                      Buka Canva <ExternalLink size={14} />
                    </a>
                    
                    <div className="interaction-btns">
                      {/* Tombol Like */}
                      <button 
                        className={`gallery-action-btn like-btn ${isLiked ? 'active' : ''}`}
                        onClick={() => handleLike(project.id)}
                        title={isLiked ? "Batal Suka" : "Beri Suka (Like)"}
                      >
                        <ThumbsUp size={16} className={`like-icon ${isLiked ? 'liked' : ''}`} />
                        <span className="like-count">{project.likes}</span>
                      </button>

                      {/* Tombol Ulas */}
                      <button 
                        className={`gallery-action-btn comment-btn ${isCommentsOpen ? 'active' : ''}`}
                        onClick={() => toggleComments(project.id)}
                        title="Lihat atau tambah ulasan komentar"
                      >
                        <MessageSquare size={16} />
                        <span>Ulas ({project.comments.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Bagian Komentar / Ulasan (Peer-Review) */}
                  {isCommentsOpen && (
                    <div className="comments-section animate-fade-in">
                      <div className="comments-header">
                        <h5>Ulasan Sejawat ({project.comments.length})</h5>
                        <span className="peer-badge">Peer-Assessment</span>
                      </div>

                      {/* Daftar Komentar */}
                      <div className="comments-list">
                        {project.comments.length === 0 ? (
                          <p className="no-comments">Belum ada ulasan. Jadilah yang pertama memberikan masukan untuk kelompok ini!</p>
                        ) : (
                          project.comments.map(c => (
                            <div key={c.id} className="comment-item">
                              <div className="comment-meta">
                                <span className="comment-author">{c.author}</span>
                                <span className="comment-time"><Clock size={11} /> {c.timestamp}</span>
                              </div>
                              <p className="comment-text">{c.text}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Form Tambah Ulasan */}
                      <form 
                        onSubmit={(e) => handleAddComment(e, project.id)} 
                        className="add-comment-form"
                      >
                        <input 
                          type="text" 
                          placeholder="Nama Anda / Kelompok (Contoh: Kelompok 3)" 
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="comment-author-input"
                        />
                        <div className="comment-input-row">
                          <input 
                            type="text" 
                            placeholder="Tulis ulasan/masukan konstruktif..." 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="comment-text-input"
                            required
                          />
                          <button type="submit" className="comment-submit-btn" title="Kirim Ulasan">
                            <Send size={15} />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
