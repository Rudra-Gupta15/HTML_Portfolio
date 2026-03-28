import Globe from './Globe';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="home">
      <div className="hero-left">
        <p className="hero-tag">Java Full Stack Developer</p>
        <h1 className="hero-name">MAITHEELI<br /><span className="gn">Agnihotri</span></h1>
        <p className="hero-tagline">Crafting clean, purposeful web systems from database to UI</p>
        <div className="hero-roles">
          <span className="h-role">Java Developer</span>
          <span className="h-dot">·</span>
          <span className="h-role">Full Stack</span>
          <span className="h-dot">·</span>
          <span className="h-role">SAP Aspirant</span>
        </div>
        <p className="hero-desc">
          Computer Technology undergraduate at YCCE Nagpur with a strong
          foundation in Java, web development, and problem-solving.
          Looking to grow through impactful internships.
        </p>
        <div className="hero-btns">
          <a href="#contact" className="btn-primary">Download CV</a>
          <a href="#contact" className="btn-outline">Contact Me</a>
        </div>
        <div className="scroll-cue">
          <div className="scroll-line"></div>Scroll to explore
        </div>
      </div>

      <div className="hero-right">
        <Globe />
        <div className="globe-tip">Drag to rotate ✦</div>
      </div>
    </section>
  );
}
