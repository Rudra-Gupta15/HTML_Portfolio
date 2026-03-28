import React from 'react';
import '../styles/Marquee.css';


export default function Marquee() {
  const mTerms = [
    'Java Full Stack', 'SAP Aspirant', 'MVC Architecture', 'JDBC · MySQL', 
    'Socket Programming', 'Computer Vision', 'Servlets · JSP', 
    'OpenCV · Python', 'Streamlit', 'Git · GitHub', 'HTML · CSS', 'Enterprise Dev'
  ];

  const repeatedTerms = [...mTerms, ...mTerms];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {repeatedTerms.map((t, i) => (
          <React.Fragment key={i}>
            <span className={i % 2 === 0 ? 'cyan' : ''}>{t}</span>
            <span className="acc">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
