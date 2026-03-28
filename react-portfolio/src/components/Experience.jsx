import { useRef, useEffect } from 'react';
import '../styles/Experience.css';

const TIMELINE = [
  {
    date: '2022 — 2026',
    role: 'B.Tech Computer Technology',
    org: 'Yeshwantrao Chavan College of Engineering',
    type: 'edu',
    accent: '#FF6B35',   /* vibrant orange */
    desc: 'Undergraduate degree focusing on software engineering, web development, and database management.',
    bullets: [
      'Current CGPA: 7.76',
      'Specialization in Java enterprise development (Servlets, JSP, JDBC).',
      'Academic focus on robust backend systems and computer vision.'
    ],
    chips: ['Java', 'Python', 'SQL', 'Web Dev']
  },
  {
    date: '2022 — Present',
    role: 'Academic & Extracurricular',
    org: 'Active College Participation',
    type: 'self',
    accent: '#00BCD4',   /* bright cyan */
    desc: 'Actively participating in technical seminars, group projects, and college workshops to build practical skills.',
    bullets: [
      'Collaborated on extensive group assignments and project presentations.',
      'Attended skill-building workshops and technical seminars.',
      'Developing strong teamwork, communication, and leadership skills.'
    ],
    chips: ['Seminars', 'Workshops', 'Teamwork', 'Presentations']
  },
  {
    date: '2020 — 2022',
    role: 'Higher Secondary Certificate',
    org: 'New English Jr. College, Nagpur',
    type: 'edu',
    accent: '#06D6A0',   /* mint green */
    desc: 'Completed HSC board examinations with a focus on science and analytical thinking.',
    bullets: [
      'Scored 79.89% in the rigorous Science stream.',
      'Built a solid quantitative foundation in Mathematics and Physics.',
    ],
    chips: ['Science', 'Mathematics', 'HSC']
  },
  {
    date: '2019 — 2020',
    role: 'Secondary School Certificate',
    org: 'Sanskar Vidya Sagar, Nagpur',
    type: 'edu',
    accent: '#A855F7',   /* vivid purple */
    desc: 'Completed SSC building a strong early academic and competitive foundation.',
    bullets: [
      'Secured an outstanding 93% in board examinations.',
      'Maintained top academic performance across core subjects.'
    ],
    chips: ['SSC', 'Board Exams']
  }
];

const TYPE_BADGE = {
  work: { label: 'Work', color: '#C8914A' },
  self: { label: 'Self', color: '#B8C9A3' },
  edu:  { label: 'Edu',  color: '#A87038' },
};

export default function Experience() {
  const scrollRef  = useRef(null);
  const sectionRef = useRef(null);

  // Scroll-reveal: each card fades + slides up when section enters viewport
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.htl-item');
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('htl-item--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" ref={sectionRef}>
      <div className="sec-label">04 — Professional Path</div>

      <div className="htl-header">
        <div>
          <h2 className="sec-h" style={{ marginBottom: 0 }}>Education &amp; <em>Activities</em></h2>
          <p className="wintro-desc" style={{ marginTop: 10, marginBottom: 0 }}>
            Undergraduate foundation in programming, analytics, and software engineering.
          </p>
          <div className="htl-legend">
            {Object.entries(TYPE_BADGE).map(([k, v]) => (
              <span key={k} className="htl-legend-item" style={{ '--lc': v.color }}>
                <span className="htl-legend-dot" /> {v.label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="htl-scroll-btn" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
          <button className="htl-scroll-btn" onClick={() => scroll(1)}  aria-label="Next">›</button>
        </div>
      </div>

      <div
        className="htl-scroll"
        ref={scrollRef}
        onScroll={(e) => {
          const t = e.currentTarget;
          const maxScroll = t.scrollWidth - t.clientWidth;
          if (maxScroll <= 0) return;
          const pct = (t.scrollLeft / maxScroll) * 100;
          const fill = sectionRef.current?.querySelector('.htl-progress-fill');
          if (fill) fill.style.width = pct + '%';
        }}
      >
        {TIMELINE.map((item, i) => {
          const badge = TYPE_BADGE[item.type];
          return (
            <div className="htl-item" key={i}>
              <div className="htl-node">
                <div className="htl-dot"       style={{ '--dc': item.accent }} />
                <div className="htl-date-pill" style={{ '--dc': item.accent }}>{item.date}</div>
              </div>
              <div className="htl-card" style={{ '--accent': item.accent }}>
                <div className="htl-card-top">
                  <div>
                    <div className="htl-role">{item.role}</div>
                    <div className="htl-org">{item.org}</div>
                  </div>
                  <span
                    className="htl-type-badge"
                    style={{
                      background: badge.color + '22',
                      color: badge.color,
                      border: `1px solid ${badge.color}44`,
                    }}
                  >{badge.label}</span>
                </div>
                <div className="htl-desc">{item.desc}</div>
                {item.bullets.length > 0 && (
                  <ul className="htl-bullets">
                    {item.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {item.chips.length > 0 && (
                  <div className="htl-chips">
                    {item.chips.map(c => <span className="htl-chip" key={c}>{c}</span>)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="htl-progress-wrap">
        <div className="htl-progress-track">
          <div className="htl-progress-fill" />
        </div>
        <span className="htl-hint">drag or use arrows to explore</span>
      </div>
    </section>
  );
}
