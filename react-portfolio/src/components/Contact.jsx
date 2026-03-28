import { useState } from 'react';
import '../styles/Contact.css';


export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = () => {
    alert('Thanks ' + (name || 'friend') + '! Message received 🌸');
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <section id="contact">
      <div className="sec-label">06 — Let's Connect</div>
      <h2 className="sec-h">Get in <em>Touch</em></h2>
      <div className="contact-wrap">
        <div className="contact-left">
          <h3>Say Hello ✦</h3>
          <a href="tel:+919096567675" className="c-item">
            <div className="c-icon-wrap">📞</div>
            <div className="c-info"><div className="c-lbl">Mobile</div><div className="c-val">9096567675</div></div>
          </a>
          <a href="mailto:maitheeli.agnihotriemail@gmail.com" className="c-item">
            <div className="c-icon-wrap">✉️</div>
            <div className="c-info"><div className="c-lbl">Email</div><div className="c-val">maitheeli.agnihotriemail@gmail.com</div></div>
          </a>
          <a href="https://linkedin.com/in/maitheeli-agnihotri" target="_blank" rel="noreferrer" className="c-item">
            <div className="c-icon-wrap">💼</div>
            <div className="c-info"><div className="c-lbl">LinkedIn</div><div className="c-val">maitheeli-agnihotri</div></div>
            <span className="c-ext">↗</span>
          </a>
          <div className="contact-socials">
            <a href="mailto:maitheeli.agnihotriemail@gmail.com" className="soc-btn">✉️</a>
            <a href="https://linkedin.com/in/maitheeli-agnihotri" target="_blank" rel="noreferrer" className="soc-btn">💼</a>
            <a href="https://www.hackerrank.com/" target="_blank" rel="noreferrer" className="soc-btn">👩‍💻</a>
          </div>
        </div>
        <div className="contact-right">
          <h3>Send a Message</h3>
          <div className="f-g">
            <label className="f-lbl">Name</label>
            <input type="text" className="f-in" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="f-g">
            <label className="f-lbl">Email</label>
            <input type="email" className="f-in" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div className="f-g">
            <label className="f-lbl">Message</label>
            <textarea className="f-in" placeholder="Your message..." value={msg} onChange={e=>setMsg(e.target.value)}></textarea>
          </div>
          <button className="f-btn" onClick={handleSubmit}>✈ Send Message</button>
        </div>
      </div>
    </section>
  );
}
