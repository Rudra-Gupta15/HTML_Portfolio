import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Projects.css';

/* ─── Scroll-reveal hook ─── */
function useScrollReveal(selector) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(selector);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('sr--vis');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return ref;
}



const PROJECTS = [
  {
    cat: 'java web', emoji: '📚', type: 'Java Web · Full Stack', title: 'Student LMS', subtitle: 'Learning Management System',
    gradient: ['#FF6B35', '#FFD166'], gradientBg: 'linear-gradient(135deg, #141414 0%, #3e1a0a 50%, #FF6B35 100%)',
    overview: 'A web-based Learning Management System to manage students, courses, and academic activities with secure authentication and dashboards.',
    bullets: ['Secure login & registration with server-side validation', 'Student dashboard: courses, profile, academic info', 'Course management: listing and enrollment', 'Full CRUD operations via JDBC & MySQL', 'MVC architecture — Servlets as controllers, JSP as views'],
    techDetails: 'Built using Java Servlets for request handling, JSP for dynamic views, JDBC for database connectivity. MySQL for persistence. MVC pattern for clean separation of concerns.',
    outcome: 'End-to-end LMS with secure auth, course enrollment, profile management.',
    tags: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'HTML'], github: 'https://github.com/maitheeli-agnihotri'
  },
  {
    cat: 'java', emoji: '💬', type: 'Java · Networking', title: 'Chat Application', subtitle: 'Socket Programming + GUI',
    gradient: ['#00BCD4', '#4DD0E1'], gradientBg: 'linear-gradient(135deg, #141414 0%, #00363a 50%, #00BCD4 100%)',
    overview: 'Real-time client-server chat application using Java Socket programming with a graphical user interface and multi-threading for concurrent clients.',
    bullets: ['Two-way TCP socket communication', 'Interactive GUI with Java Swing and AWT', 'Message transmission via I/O streams', 'Multi-threading for concurrent client connections'],
    techDetails: 'Java Socket API with TCP for reliable delivery. Swing/AWT for cross-platform GUI. Dedicated threads per client prevent blocking.',
    outcome: 'Real-time multi-client chat demonstrating network programming mastery.',
    tags: ['Java', 'Socket', 'Swing', 'AWT', 'Threads'], github: 'https://github.com/maitheeli-agnihotri'
  },
  {
    cat: 'python aiml', emoji: '👁️', type: 'Python · Computer Vision', title: 'Gait Recognition', subtitle: 'Human Recognition System',
    gradient: ['#EF476F', '#FF9A6C'], gradientBg: 'linear-gradient(135deg, #141414 0%, #3e0a15 50%, #EF476F 100%)',
    overview: 'A human recognition system based on gait (walking patterns) using Python and computer vision — no facial recognition required.',
    bullets: ['Gait analysis from video frames using OpenCV', 'Motion feature extraction per individual', 'Privacy-respecting: no facial data', 'Streamlit web interface for visualization'],
    techDetails: 'OpenCV processes video frames to extract skeletal motion features. Streamlit provides real-time web demo interface.',
    outcome: 'Privacy-respecting biometric system using walking patterns for identification.',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Streamlit'], github: 'https://github.com/maitheeli-agnihotri'
  },
];

const TABS = ['all', 'java', 'python', 'web'];
const TABS_LABELS = {
  all: 'All',
  java: 'Java',
  python: 'Python / AI',
  web: 'Web'
};

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);
  
  if (!project) return null;
  const g0 = project.gradient?.[0] || 'var(--coral)';
  const g1 = project.gradient?.[1] || 'var(--peach)';

  return createPortal(
    <div className="pmodal-overlay" onClick={onClose}>
      <div className="pmodal pmodal-v2" onClick={e => e.stopPropagation()}>
        <div className="pmodal-header" style={{ background: project.gradientBg }}>
          <button className="pmodal-close" onClick={onClose}>✕</button>
          <div className="pmodal-header-content">
            <span className="pmodal-emoji">{project.emoji}</span>
            <div>
              <div className="pmodal-type">{project.type}</div>
              <h2 className="pmodal-title">{project.title}</h2>
              <div className="pmodal-subtitle-txt">{project.subtitle}</div>
            </div>
          </div>
        </div>
        {project.image ? (
          <div className="pmodal-img-wrap">
            <img src={project.image} alt={project.title} className="pmodal-img"
              onError={e => { e.target.parentElement.classList.add('pmodal-img-missing'); e.target.style.display = 'none'; }} />
            <div className="pmodal-img-placeholder">{project.emoji}</div>
          </div>
        ) : (
          <div className="pmodal-emoji-banner" style={{ background: project.gradientBg || `linear-gradient(135deg, ${g0}, ${g1})` }}>
            <span className="pmodal-banner-emoji">{project.emoji}</span>
          </div>
        )}
        <div className="pmodal-body">
          <div className="pmodal-section">
            <div className="pmodal-section-label">📋 Overview</div>
            <p className="pmodal-overview">{project.overview}</p>
          </div>
          <div className="pmodal-section">
            <div className="pmodal-section-label">🔧 What It Does</div>
            <ul className="pmodal-bullets">
              {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
          {project.techDetails && (
            <div className="pmodal-section">
              <div className="pmodal-section-label">⚙️ Technical Details</div>
              <p className="pmodal-tech-detail">{project.techDetails}</p>
            </div>
          )}
          <div className="pmodal-outcome">
            <span className="pmodal-outcome-icon">🏆</span>
            {project.outcome}
          </div>
          <div className="pmodal-footer">
            <div className="pmodal-tags">
              {project.tags.map(t => <span key={t} className="pmodal-tag">{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="pmodal-github" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  Live Demo ↗
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="pmodal-github"
                  style={{ background: `linear-gradient(135deg, ${g0}, ${g1})`, color: '#fff' }}>
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const scrollRef   = useRef(null);
  const progressRef = useRef(null);
  const sectionRef  = useScrollReveal('.proj-sr');
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [filter]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 440, behavior: 'smooth' });
  };

  const visible = PROJECTS.filter(p => filter === 'all' || p.cat.includes(filter));

  return (
    <section id="projects" ref={sectionRef}>

      <div className="sec-label proj-sr proj-sr-d0">03 — Selected Work</div>

      <div className="proj-header-row proj-sr proj-sr-d1">
        <h2 className="sec-h">🚀 <em>Projects</em></h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 340 }}>
          Production systems — real pipelines solving real problems.
        </p>
      </div>

      <div className="proj-tabs proj-sr proj-sr-d2">
        {TABS.map(tab => (
          <button key={tab} className={`p-tab${filter === tab ? ' active' : ''}`} onClick={() => setFilter(tab)}>
            {TABS_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="pcard-nav proj-sr proj-sr-d3">
        <div className="pscroll-hint">
          <span className="pscroll-arrow-anim">←</span>
          swipe to explore
          <span className="pscroll-arrow-anim" style={{ animationDelay: '0.5s' }}>→</span>
        </div>
        <div className="pnav-btns">
          <button className="pnav-btn" onClick={() => scroll(-1)} disabled={!canScrollLeft}>‹</button>
          <button className="pnav-btn" onClick={() => scroll(1)} disabled={!canScrollRight}>›</button>
        </div>
      </div>

      <div className="pcard-scroll" ref={scrollRef} onScroll={(e) => {
        const t = e.currentTarget;
        const max = t.scrollWidth - t.clientWidth;
        if (max <= 0) return;
        if (progressRef.current) progressRef.current.style.width = (t.scrollLeft / max * 100) + '%';
        checkScroll();
      }}>
        <div className="pcard-track">
          {visible.map((p, i) => (
            <div key={p.title} className="pcard" style={{ animationDelay: `${i * 0.07}s` }} onClick={() => setSelected(p)}>
              <div className="pcard-bg" style={{ background: p.gradientBg }} />
              {p.gradient && (
                <>
                  <div className="pcard-blob1" style={{ background: p.gradient[1] }} />
                  <div className="pcard-blob2" style={{ background: p.gradient[0] }} />
                </>
              )}
              <div className="pcard-top">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div className="pcard-type" style={{marginBottom: 0}}>{p.type}</div>
                  <div className="pcard-tap-top">TAP TO EXPAND ↗</div>
                </div>
                <h3 className="pcard-title">{p.title}</h3>
                <p className="pcard-sub">{p.subtitle}</p>
              </div>
              <div className="pcard-img-stage">
                <div className="pcard-img-frame">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="pcard-img"
                      onError={e => { e.target.style.display = 'none'; e.target.parentElement.classList.add('pcard-img-miss'); }} />
                  ) : null}
                  <div className="pcard-img-placeholder" style={{ opacity: p.image ? 0.12 : 0.5, fontSize: p.image ? 72 : 56 }}>{p.emoji}</div>
                </div>
              </div>
              <div className="pcard-bottom">
                <p className="pcard-desc">{p.outcome}</p>
                <div className="pcard-tags">
                  {p.tags.slice(0, 3).map(t => <span key={t} className="pcard-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div ref={progressRef} style={{ height: '100%', background: 'linear-gradient(90deg, var(--coral), var(--peach))', borderRadius: 2, transition: 'width 0.1s ease', width: '0%' }} />
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
