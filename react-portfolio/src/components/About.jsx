import React from 'react';
import '../styles/About.css';


export default function About() {
  const STATS = [
    {n: '8.42', l: 'CGPA', sub: 'In B.Tech', icon: '🎓', c: '#00BCD4'}, /* Cyan */
    {n: '15+', l: 'Projects', sub: 'Built & Deployed', icon: '🚀', c: '#FFB703'}, /* Vivid Gold */
    {n: '12+', l: 'Certifications', sub: 'Skills Validated', icon: '📜', c: '#EF476F'}, /* Pink-Red */
    {n: '93%', l: 'SSC Board', sub: 'Academic Peak', icon: '🏆', c: '#06D6A0'}, /* Mint-Green */
  ];

  return (
    <section id="about">
      <div className="sec-label">01 — Introduction</div>
      <h2 className="sec-h">Who I <em>Am</em></h2>
      
      <div className="abt-row1">
        <div className="card abt-bio-card">
          <div className="ab-bio-tag"><span className="ab-dot"></span> The Story</div>
          <p className="ab-bio-text">
            I am a <strong>Computer Technology</strong> undergraduate at YCCE Nagpur with a deep-rooted passion for <strong>Java Full Stack Development</strong> and <strong>Computer Vision</strong>. 
          </p>
          <p className="ab-bio-text">
             My journey started with a fascination for how logic translates into systems. Today, I build end-to-end applications that bridge robust backends with intuitive frontend experiences.
          </p>
          <div className="ab-trait-row">
            <span className="ab-trait">Detail Oriented</span>
            <span className="ab-trait">Problem Solver</span>
            <span className="ab-trait">Lifelong Learner</span>
          </div>
        </div>

        <div className="abt-stats-grid">
          {STATS.map((s, i) => (
            <div className="card ab-stat-card" key={i} style={{'--sc': s.c}}>
              <div className="ab-stat-icon">{s.icon}</div>
              <div className="ab-stat-n">{s.n}</div>
              <div className="ab-stat-l">{s.l}</div>
              <div className="ab-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="abt-specs-row">
        <div className="card ab-spec">
          <div className="ab-spec-bar" style={{'--accent': '#FF6B35'}}></div>
          <div className="ab-spec-top">
            <span className="ab-spec-icon">☕</span>
            <div className="ab-spec-badge">88<small>%</small></div>
          </div>
          <div className="ab-spec-title">Backend Architecture</div>
          <p className="ab-spec-desc">Deep focus on Java enterprise systems, MVC, and complex database schemas.</p>
          <div className="ab-spec-chips">
            <span className="ab-chip">Java</span>
            <span className="ab-chip">JDBC</span>
            <span className="ab-chip">MySQL</span>
          </div>
        </div>

        <div className="card ab-spec">
          <div className="ab-spec-bar" style={{'--accent': '#00BCD4'}}></div>
          <div className="ab-spec-top">
            <span className="ab-spec-icon">🌐</span>
            <div className="ab-spec-badge">82<small>%</small></div>
          </div>
          <div className="ab-spec-title">Web Systems</div>
          <p className="ab-spec-desc">Creating scalable web interfaces using modern frontend and legacy Java stacks.</p>
          <div className="ab-spec-chips">
            <span className="ab-chip">React</span>
            <span className="ab-chip">JSP</span>
            <span className="ab-chip">HTML/CSS</span>
          </div>
        </div>

        <div className="card ab-spec">
          <div className="ab-spec-bar" style={{'--accent': '#06D6A0'}}></div>
          <div className="ab-spec-top">
            <span className="ab-spec-icon">👁️</span>
            <div className="ab-spec-badge">75<small>%</small></div>
          </div>
          <div className="ab-spec-title">Computer Vision</div>
          <p className="ab-spec-desc">Implementing AI-driven visual systems and data processing pipelines.</p>
          <div className="ab-spec-chips">
            <span className="ab-chip">Python</span>
            <span className="ab-chip">OpenCV</span>
            <span className="ab-chip">Git</span>
          </div>
        </div>
      </div>
    </section>
  );
}
