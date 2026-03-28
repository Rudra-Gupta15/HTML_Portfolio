import { useEffect, useState } from 'react';
import '../styles/Navbar.css';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      
      const secs = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      let currentActive = 'home';
      secs.forEach(s => {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 140) {
          currentActive = s;
        }
      });
      setActive(currentActive);
      
      const prog = document.getElementById('progress-bar');
      const tot = document.body.scrollHeight - window.innerHeight;
      if (prog) {
        prog.style.width = (tot > 0 ? (window.scrollY / tot) * 100 : 0) + '%';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sNav = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div id="progress-bar"></div>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="#home" className="nav-logo" onClick={(e) => sNav(e, 'home')}>Maitheeli</a>
        <ul className="nav-links">
          {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map(link => (
            <li key={link}>
              <a 
                href={`#${link}`} 
                className={active === link ? 'active' : ''} 
                onClick={(e) => sNav(e, link)}
              >
                {link === 'experience' ? 'Journey' : link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn-talk" onClick={(e) => sNav(e, 'contact')}>Let's Talk</a>
      </nav>
    </>
  );
}
