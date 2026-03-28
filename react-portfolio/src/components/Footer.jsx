import { useEffect, useState } from 'react';
import '../styles/Footer.css';

export default function Footer() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < 22; i++) {
      const dur = 4 + Math.random() * 6;
      items.push({
        id: i,
        char: ['🌻','🌼','🌸','🌺','🍀','🌷'][Math.floor(Math.random() * 6)],
        left: Math.random() * 100 + '%',
        bottom: Math.random() * 50 + '%',
        animationDuration: dur + 's',
        animationDelay: Math.random() * dur + 's',
        fontSize: (10 + Math.random() * 12) + 'px',
      });
    }
    setPetals(items);
  }, []);

  return (
    <footer className="site-footer">

      {/* ── Main content ── */}
      <div className="ft-main-content">
        <div className="ft-connect-text">Feel free to connect ✦</div>
        <div className="ft-soc-row">
          <a href="mailto:maitheeli.agnihotriemail@gmail.com" className="ft-soc-btn" title="Email">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/maitheeli-agnihotri" target="_blank" rel="noreferrer" className="ft-soc-btn" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Sunny Garden — FULL AREA SVG ── */}
      <div className="ft-sakura-wrap">
        <svg
          className="ft-sakura-svg"
          viewBox="0 0 1440 280"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ftsky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#141414" stopOpacity="1"/>
              <stop offset="40%"  stopColor="#1C2E14" stopOpacity="1"/>
              <stop offset="72%"  stopColor="#2D5A1B" stopOpacity="1"/>
              <stop offset="100%" stopColor="#1B4010" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="ftgrass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#56C35A"/>
              <stop offset="100%" stopColor="#2E7D32"/>
            </linearGradient>
            <radialGradient id="ftsun" cx="50%" cy="10%" r="55%">
              <stop offset="0%"   stopColor="#FFD700" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Sky fills entire viewBox */}
          <rect x="0" y="0" width="1440" height="280" fill="url(#ftsky)"/>
          <rect x="0" y="0" width="1440" height="280" fill="url(#ftsun)"/>

          {/* Ground */}
          <rect x="0" y="238" width="1440" height="42" fill="url(#ftgrass)"/>
          <rect x="0" y="236" width="1440" height="6"  fill="#76D077" opacity="0.65"/>

          {/* Tree 1 */}
          <rect x="118" y="172" width="7"  height="66" fill="#5D4037" rx="3"/>
          <ellipse cx="121" cy="160" rx="34" ry="28" fill="#388E3C" opacity="0.96"/>
          <ellipse cx="100" cy="168" rx="24" ry="20" fill="#4CAF50" opacity="0.86"/>
          <ellipse cx="142" cy="165" rx="22" ry="19" fill="#66BB6A" opacity="0.9"/>
          <circle  cx="115" cy="152" r="6"           fill="#FFD600" opacity="0.97"/>
          <circle  cx="133" cy="148" r="5"           fill="#FF7043" opacity="0.92"/>

          {/* Tree 2 */}
          <rect x="300" y="160" width="9"  height="78" fill="#4E342E" rx="3"/>
          <ellipse cx="304" cy="144" rx="44" ry="37" fill="#2E7D32" opacity="0.94"/>
          <ellipse cx="274" cy="158" rx="30" ry="25" fill="#388E3C" opacity="0.84"/>
          <ellipse cx="332" cy="154" rx="28" ry="24" fill="#4CAF50" opacity="0.9"/>
          <circle  cx="296" cy="135" r="8"           fill="#FFC107" opacity="0.97"/>
          <circle  cx="318" cy="139" r="5"           fill="#FF8A65" opacity="0.9"/>

          {/* Tree 3 */}
          <rect x="522" y="146" width="10" height="92" fill="#5D4037" rx="4"/>
          <ellipse cx="526" cy="128" rx="50" ry="43" fill="#1B5E20" opacity="0.95"/>
          <ellipse cx="492" cy="144" rx="34" ry="30" fill="#2E7D32" opacity="0.85"/>
          <ellipse cx="560" cy="140" rx="32" ry="28" fill="#388E3C" opacity="0.9"/>
          <circle  cx="512" cy="120" r="8"           fill="#FFD600" opacity="0.99"/>
          <circle  cx="540" cy="115" r="6"           fill="#FF6D00" opacity="0.92"/>
          <circle  cx="526" cy="132" r="5"           fill="#FFEB3B" opacity="0.97"/>

          {/* Tree 4 — tallest */}
          <rect x="718" y="118" width="13" height="120" fill="#3E2723" rx="4"/>
          <ellipse cx="724" cy="96"  rx="62" ry="52" fill="#1B5E20" opacity="0.97"/>
          <ellipse cx="685" cy="116" rx="44" ry="36" fill="#2E7D32" opacity="0.88"/>
          <ellipse cx="763" cy="112" rx="42" ry="34" fill="#388E3C" opacity="0.92"/>
          <circle  cx="712" cy="86"  r="10"          fill="#FFD600" opacity="0.99"/>
          <circle  cx="738" cy="82"  r="7"           fill="#FF8F00" opacity="0.94"/>
          <circle  cx="724" cy="100" r="6"           fill="#FFEB3B" opacity="0.9"/>
          <circle  cx="700" cy="108" r="5"           fill="#EF5350" opacity="0.88"/>

          {/* Tree 5 */}
          <rect x="912" y="150" width="9"  height="88" fill="#5D4037" rx="3"/>
          <ellipse cx="916" cy="132" rx="46" ry="40" fill="#2E7D32" opacity="0.93"/>
          <ellipse cx="882" cy="148" rx="32" ry="28" fill="#388E3C" opacity="0.85"/>
          <ellipse cx="948" cy="144" rx="30" ry="26" fill="#4CAF50" opacity="0.9"/>
          <circle  cx="908" cy="123" r="8"           fill="#FFC107" opacity="0.97"/>
          <circle  cx="926" cy="119" r="5"           fill="#FF7043" opacity="0.9"/>

          {/* Tree 6 */}
          <rect x="1120" y="162" width="8"  height="76" fill="#5D4037" rx="3"/>
          <ellipse cx="1124" cy="146" rx="40" ry="35" fill="#388E3C" opacity="0.92"/>
          <ellipse cx="1094" cy="158" rx="28" ry="24" fill="#4CAF50" opacity="0.84"/>
          <ellipse cx="1152" cy="154" rx="26" ry="22" fill="#66BB6A" opacity="0.88"/>
          <circle  cx="1116" cy="138" r="6"          fill="#FFE082" opacity="0.97"/>
          <circle  cx="1134" cy="134" r="5"          fill="#FF8A65" opacity="0.9"/>

          {/* Tree 7 */}
          <rect x="1322" y="174" width="7"  height="64" fill="#5D4037" rx="3"/>
          <ellipse cx="1325" cy="162" rx="32" ry="28" fill="#4CAF50" opacity="0.9"/>
          <ellipse cx="1302" cy="170" rx="22" ry="20" fill="#66BB6A" opacity="0.82"/>
          <ellipse cx="1346" cy="167" rx="20" ry="18" fill="#81C784" opacity="0.86"/>
          <circle  cx="1318" cy="154" r="5"          fill="#FFCA28" opacity="0.94"/>
          <circle  cx="1334" cy="150" r="4"          fill="#EF5350" opacity="0.88"/>

          {/* Ground bumps */}
          <ellipse cx="300"  cy="239" rx="65"  ry="11" fill="#66BB6A" opacity="0.38"/>
          <ellipse cx="724"  cy="239" rx="85"  ry="11" fill="#66BB6A" opacity="0.33"/>
          <ellipse cx="1110" cy="239" rx="72"  ry="11" fill="#66BB6A" opacity="0.36"/>
        </svg>
      </div>

      {/* Floating petals */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'100%',pointerEvents:'none',overflow:'hidden',zIndex:3}}>
        {petals.map(p => (
          <div
            key={p.id}
            className="ft-petal"
            style={{left:p.left, bottom:p.bottom, animationDuration:p.animationDuration, animationDelay:p.animationDelay, fontSize:p.fontSize}}
          >
            {p.char}
          </div>
        ))}
      </div>

      <div className="ft-copy">© 2026 Maitheeli Agnihotri · Crafted with ☕ &amp; 🌻</div>
    </footer>
  );
}
