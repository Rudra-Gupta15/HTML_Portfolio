import { useEffect, useRef } from 'react';
import '../styles/Skills.css';

const BADGE_GROUPS = [
  {
    title: '☕ Java Core',
    items: [
      { label: 'Java SE',            bg: '#c0392b', tc: '#fff' },
      { label: 'OOP',                bg: '#922B21', tc: '#fff' },
      { label: 'Collections',        bg: '#A93226', tc: '#fff' },
      { label: 'Streams & Lambda',   bg: '#E74C3C', tc: '#fff' },
      { label: 'Exception Handling', bg: '#CB4335', tc: '#fff' },
      { label: 'Multithreading',     bg: '#96281B', tc: '#fff' },
    ]
  },
  {
    title: '🌐 Java Web Stack',
    items: [
      { label: 'Servlets',   bg: '#1A5276', tc: '#fff' },
      { label: 'JSP',        bg: '#2471A3', tc: '#fff' },
      { label: 'JDBC',       bg: '#1F618D', tc: '#fff' },
      { label: 'MVC Pattern',bg: '#154360', tc: '#fff' },
      { label: 'CRUD APIs',  bg: '#21618C', tc: '#fff' },
      { label: 'Tomcat',     bg: '#F0A30A', tc: '#000' },
    ]
  },
  {
    title: '🗄️ Database',
    items: [
      { label: 'MySQL',      bg: '#00758F', tc: '#fff' },
      { label: 'SQL',        bg: '#005F73', tc: '#fff' },
      { label: 'JDBC Pool',  bg: '#007B83', tc: '#fff' },
    ]
  },
  {
    title: '🛠️ Tools & IDE',
    items: [
      { label: 'Eclipse',    bg: '#2C3E50', tc: '#fff' },
      { label: 'VS Code',    bg: '#007ACC', tc: '#fff' },
      { label: 'Git',        bg: '#F05032', tc: '#fff' },
      { label: 'GitHub',     bg: '#24292e', tc: '#fff' },
      { label: 'Maven',      bg: '#C2185B', tc: '#fff' },
      { label: 'Linux',      bg: '#333333', tc: '#fff' },
    ]
  },
];

const SKILLS_LIST = [
  { n: '01', label: 'Java Core / OOP',  pct: 88 },
  { n: '02', label: 'Servlet / JSP',    pct: 82 },
  { n: '03', label: 'JDBC / MySQL',     pct: 80 },
  { n: '04', label: 'Problem Solving',  pct: 85 },
  { n: '05', label: 'Git / Linux',      pct: 70 },
];

/* ── 3D orbit data ── */
const TECHS = [
  { label: 'Servlets', r: 80,  speed: 0.9,  angle: 0,    orbitTilt: 0.3,  color: '#4F8EF7', size: 14 },
  { label: 'JSP',      r: 80,  speed: 0.9,  angle: 2.1,  orbitTilt: 0.3,  color: '#2D6CE8', size: 13 },
  { label: 'JDBC',     r: 80,  speed: 0.9,  angle: 4.2,  orbitTilt: 0.3,  color: '#82AEFF', size: 12 },
  { label: 'MySQL',    r: 120, speed: 0.55, angle: 0.8,  orbitTilt: -0.4, color: '#00BFFF', size: 14 },
  { label: 'MVC',      r: 120, speed: 0.55, angle: 3.1,  orbitTilt: -0.4, color: '#4ECDC4', size: 12 },
  { label: 'OOP',      r: 155, speed: 0.35, angle: 1.5,  orbitTilt: 0.6,  color: '#E0B87A', size: 13 },
  { label: 'Tomcat',   r: 155, speed: 0.35, angle: 4.8,  orbitTilt: 0.6,  color: '#F48120', size: 12 },
  { label: 'Git',      r: 190, speed: 0.22, angle: 0.4,  orbitTilt: -0.2, color: '#F05032', size: 11 },
  { label: 'Maven',    r: 190, speed: 0.22, angle: 3.4,  orbitTilt: -0.2, color: '#C2185B', size: 11 },
];

export default function Skills() {
  const canvasRef = useRef(null);
  const rowsRef   = useRef(null);

  /* ─── Bloom Progress canvas ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      canvas.width  = canvas.parentElement.offsetWidth || 460;
      canvas.height = 200;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Vibrant rainbow palette on black
    const palette = [
      '#FF6B35', '#FFD166', '#06D6A0', '#118AB2',
      '#EF476F', '#FF9A6C', '#00BCD4', '#A855F7',
    ];

    // Build 3 rows of circles
    const ROWS = 3;
    const circles = Array.from({ length: ROWS }, (_, row) =>
      Array.from({ length: 22 }, (_, i) => ({
        x:    i * 52 + 28,
        r:    6 + (i % 5) * 5,
        c:    palette[(i + row * 3) % palette.length],
        sp:   0.4 + (i % 3) * 0.25,
        ph:   (i * 0.55 + row * 1.2) % (Math.PI * 2),
        vx:   0.45 + (row % 2) * 0.15,
      }))
    );

    let t = 0, animId;
    let files = 0, lines = 0;

    function draw() {
      animId = requestAnimationFrame(draw);
      t += 0.022;

      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = '#141414';
      ctx.fillRect(0, 0, W, H);

      // Row Y positions
      const rowY = [H * 0.22, H * 0.5, H * 0.78];

      circles.forEach((row, ri) => {
        row.forEach(c => {
          const pulse = Math.sin(t * c.sp + c.ph);
          const r = c.r + pulse * c.r * 0.55;

          const cy = rowY[ri];

          // Outer ring
          ctx.beginPath();
          ctx.arc(c.x, cy, r * 1.55, 0, Math.PI * 2);
          ctx.strokeStyle = c.c + '40';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Fill circle
          ctx.beginPath();
          ctx.arc(c.x, cy, r, 0, Math.PI * 2);
          ctx.fillStyle = c.c + '55';
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(c.x, cy, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = c.c + 'BB';
          ctx.fill();

          // Scroll left
          c.x -= c.vx;
          if (c.x < -40) c.x = W + 40;
        });
      });

      // HUD
      if (files < 61)   files += 1;
      if (lines < 1036) lines += 13;

      const hudX = W - 130, hudY = H - 74;
      ctx.fillStyle = 'rgba(8,12,20,0.82)';
      ctx.strokeStyle = 'rgba(200,145,74,0.3)';
      ctx.lineWidth = 1;
      roundRect(ctx, hudX, hudY, 116, 60, 8);

      ctx.font = '10px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(200,145,74,0.85)';
      ctx.textAlign = 'left';
      ctx.fillText(`FILES ${String(files).padStart(4, '0')}`, hudX + 10, hudY + 18);
      ctx.fillText(`LINES ${String(lines).padStart(4, '0')}`, hudX + 10, hudY + 34);
      ctx.fillText('BUILD ✓',                              hudX + 10, hudY + 50);

      // Label
      ctx.font = '10px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(200,145,74,0.6)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('BLOOM PROGRESS', 14, 10);
    }

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  /* ─── Progress bar reveal ─── */
  useEffect(() => {
    const bars = rowsRef.current?.querySelectorAll('.sk-fi');
    if (!bars) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          bars.forEach(b => { b.style.width = b.dataset.pct + '%'; });
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    if (rowsRef.current) io.observe(rowsRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills">
      <div className="sec-label">02 — Tech Arsenal</div>
      <h2 className="sec-h">Skills &amp; <em>Technologies</em></h2>

      <div className="skills-layout">

        {/* ── LEFT: Java Badges ── */}
        <div className="skills-left">
          {BADGE_GROUPS.map(group => (
            <div className="badge-group" key={group.title}>
              <div className="badge-group-title">{group.title}</div>
              <div className="badge-row">
                {group.items.map(item => (
                  <span
                    key={item.label}
                    className="skill-badge"
                    style={{ background: item.bg, color: item.tc }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: 3D Orbit + Progress Bars ── */}
        <div className="skills-right">
          <div className="nn-label">Java Ecosystem — 3D Orbit</div>
          <div className="canvas-wrap">
            <canvas ref={canvasRef} id="skill-canvas" />
          </div>

          <div className="sk-rows" ref={rowsRef}>
            {SKILLS_LIST.map(s => (
              <div className="sk-row" key={s.n}>
                <span className="sk-i">{s.n}</span>
                <span className="sk-n">{s.label}</span>
                <div className="sk-tr">
                  <div className="sk-fi" data-pct={s.pct} />
                </div>
                <span className="sk-p">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
