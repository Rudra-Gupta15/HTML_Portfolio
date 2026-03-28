import '../styles/Achievements.css';

export default function Achievements() {
  const achs = [
    {icon:'🎓',title:'7.76 CGPA',desc:'Strong academic performance throughout B.Tech Computer Technology at YCCE Nagpur.'},
    {icon:'📋',title:'93% in SSC',desc:'Exceptional secondary school performance demonstrating strong academic fundamentals.'},
    {icon:'☕',title:'Java Full Stack',desc:'Built end-to-end LMS with Servlets, JSP, JDBC and MySQL following MVC architecture.'},
    {icon:'🌐',title:'Networking Project',desc:'Multi-client chat app using TCP sockets, Swing GUI and multithreading in Java.'},
    {icon:'👁️',title:'Computer Vision',desc:'Gait-based human recognition using OpenCV and Streamlit — privacy-first biometrics.'},
    {icon:'🏆',title:'HackerRank Active',desc:'Actively solving algorithmic challenges to sharpen problem-solving and coding skills.'},
  ];

  return (
    <section id="achievements">
      <div className="sec-label">05 — Highlights</div>
      <h2 className="sec-h">Academic <em>Highlights</em></h2>
      <div className="ach-grid">
        {achs.map((a, i) => (
          <div className="card ach-card" key={i} onMouseMove={(e) => {
            const card = e.currentTarget;
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
            card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
          }}>
            <div className="ach-icon">{a.icon}</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-desc">{a.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
