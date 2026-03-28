import { useEffect, useRef } from 'react';

const DEG = Math.PI / 180;

// Land bounding boxes [latMin, latMax, lonMin, lonMax]
const LAND = [
  // North America
  [48, 72, -140, -60], [25, 50, -125, -65], [15, 30, -115, -80],
  [8, 22, -92, -77], [4, 16, -86, -77],
  // South America
  [-5, 12, -80, -50], [-35, -5, -75, -35], [-55, -35, -75, -65],
  // Europe
  [36, 46, -10, 30], [45, 62, -5, 40], [62, 72, 5, 32], [72, 82, 15, 35],
  [50, 60, -10, 2], [56, 72, 4, 30],
  // Africa
  [-35, -20, 14, 36], [-20, 5, 10, 44], [5, 22, -18, 44], [22, 37, -5, 40],
  // Asia
  [37, 48, 28, 50], [35, 55, 50, 92], [20, 35, 60, 92],
  [8, 20, 68, 92],   // Indian subcontinent
  [55, 73, 60, 142], [20, 36, 92, 125], [36, 55, 92, 145],
  [0, 20, 95, 120],  // SE Asia
  [30, 46, 128, 146],// Japan/Korea
  // Australia + NZ
  [-43, -10, 114, 154], [-46, -34, 166, 178],
  // Greenland
  [62, 84, -58, -15],
];

// Major tech hubs [lat, lon, label]
const CITIES = [
  [12.9,  77.6,  'BLR'], // Bangalore
  [37.7, -122.4, 'SFO'], // San Francisco
  [51.5,  -0.1,  'LDN'], // London
  [1.3,  103.8,  'SGP'], // Singapore
  [35.7,  139.7, 'TYO'], // Tokyo
  [40.7,  -74.0, 'NYC'], // New York
];

const ARCS = [[0,1],[0,2],[0,3],[1,5],[2,5],[3,4],[1,4]];

function sph(lat, lon) {
  const la = lat * DEG, lo = lon * DEG;
  return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
}

function buildPoints() {
  const pts = [];
  const S = 4.2;
  for (let lat = -85; lat <= 85; lat += S) {
    for (let lon = -180; lon <= 180; lon += S) {
      if (LAND.some(([a, b, c, d]) => lat >= a && lat <= b && lon >= c && lon <= d)) {
        const jl = lat + (Math.random() - 0.5) * S * 0.75;
        const jn = lon + (Math.random() - 0.5) * S * 0.75;
        pts.push(sph(jl, jn));
      }
    }
  }
  return pts;
}

export default function Globe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let rotY = 0.5, rotX = -0.15, tgtX = -0.15;
    let drag = false, lx = 0, ly = 0;
    let t = 0, raf;
    const dpr = window.devicePixelRatio || 1;
    const pts = buildPoints();
    const cityXYZ = CITIES.map(([la, lo]) => sph(la, lo));

    const resize = () => {
      ctx.resetTransform();
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Rotation helpers
    const applyY = ([x, y, z], a) => {
      const c = Math.cos(a), s = Math.sin(a);
      return [x * c + z * s, y, -x * s + z * c];
    };
    const applyX = ([x, y, z], a) => {
      const c = Math.cos(a), s = Math.sin(a);
      return [x, y * c - z * s, y * s + z * c];
    };

    const draw = () => {
      t += 0.006;
      if (!drag) rotY += 0.0022;
      rotX += (tgtX - rotX) * 0.09;

      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const cx = W / 2, cy = H / 2;
      const r  = Math.min(W, H) * 0.415;

      ctx.clearRect(0, 0, W, H);

      const rot = p => applyX(applyY(p, rotY), rotX);

      const proj = p => {
        const [x, y, z] = rot(p);
        return { sx: cx + x * r, sy: cy - y * r, z };
      };

      // ── Outer atmosphere glow ─────────────────────────
      const atm = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.35);
      atm.addColorStop(0,   'rgba(185,130,40,.12)');
      atm.addColorStop(0.5, 'rgba(100,70,15,.05)');
      atm.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = atm;
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2); ctx.fill();

      // ── Globe body ────────────────────────────────────
      const bg = ctx.createRadialGradient(cx - r * .28, cy - r * .28, r * .04, cx, cy, r);
      bg.addColorStop(0,   '#102030');
      bg.addColorStop(0.5, '#09181f');
      bg.addColorStop(1,   '#050d16');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

      // ── Latitude / longitude grid ─────────────────────
      ctx.strokeStyle = 'rgba(80,160,220,.055)';
      ctx.lineWidth = 0.5;

      for (let la = -60; la <= 60; la += 30) {
        ctx.beginPath(); let on = false;
        for (let i = 0; i <= 80; i++) {
          const { sx, sy, z } = proj(sph(la, i / 80 * 360 - 180));
          if (z < 0) { on = false; continue; }
          if (on) { ctx.lineTo(sx, sy); } else { ctx.moveTo(sx, sy); on = true; }
        }
        ctx.stroke();
      }
      for (let lo = 0; lo < 360; lo += 30) {
        ctx.beginPath(); let on = false;
        for (let i = 0; i <= 80; i++) {
          const { sx, sy, z } = proj(sph(i / 80 * 180 - 90, lo));
          if (z < 0) { on = false; continue; }
          if (on) { ctx.lineTo(sx, sy); } else { ctx.moveTo(sx, sy); on = true; }
        }
        ctx.stroke();
      }

      // ── Land dots ─────────────────────────────────────
      for (const p of pts) {
        const { sx, sy, z } = proj(p);
        if (z < -0.08) continue;
        const alpha = z * 0.8 + 0.12;
        const size  = z * 0.85 + 0.55;
        ctx.fillStyle = `rgba(200,155,55,${alpha * 0.92})`;
        ctx.beginPath(); ctx.arc(sx, sy, size, 0, Math.PI * 2); ctx.fill();
      }

      // ── Orbital ring — back half then front ───────────
      const TILT = 24 * DEG;
      ctx.lineWidth = 2.2;
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath(); let on = false;
        for (let i = 0; i <= 160; i++) {
          const a = i / 160 * Math.PI * 2;
          const rp = rot([
            Math.cos(a) * 1.24,
            Math.sin(a) * Math.sin(TILT) * 1.24,
            Math.sin(a) * Math.cos(TILT) * 1.24,
          ]);
          const front = rp[2] > 0;
          if (pass === 0 &&  front) { on = false; continue; }
          if (pass === 1 && !front) { on = false; continue; }
          const px = cx + rp[0] * r, py = cy - rp[1] * r;
          if (on) { ctx.lineTo(px, py); } else { ctx.moveTo(px, py); on = true; }
        }
        ctx.strokeStyle = pass === 0
          ? 'rgba(195,150,52,.18)'
          : 'rgba(218,172,62,.92)';
        ctx.stroke();
      }

      // Ring glow dot at leading edge
      const ringAngle = t * 0.4;
      const rgp = rot([
        Math.cos(ringAngle) * 1.24,
        Math.sin(ringAngle) * Math.sin(TILT) * 1.24,
        Math.sin(ringAngle) * Math.cos(TILT) * 1.24,
      ]);
      if (rgp[2] > 0) {
        const gx = cx + rgp[0] * r, gy = cy - rgp[1] * r;
        const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 8);
        glow.addColorStop(0, 'rgba(240,195,80,.9)');
        glow.addColorStop(1, 'rgba(240,195,80,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(gx, gy, 8, 0, Math.PI * 2); ctx.fill();
      }

      // ── Globe rim ─────────────────────────────────────
      const rim = ctx.createRadialGradient(cx - r * .32, cy - r * .36, r * .18, cx, cy, r);
      rim.addColorStop(0,    'rgba(255,255,255,.055)');
      rim.addColorStop(0.72, 'rgba(255,255,255,0)');
      rim.addColorStop(0.88, 'rgba(185,140,50,.04)');
      rim.addColorStop(1,    'rgba(185,140,50,.22)');
      ctx.fillStyle = rim;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

      // ── Connection arcs ───────────────────────────────
      const cp = cityXYZ.map(c => proj(c));

      for (let i = 0; i < ARCS.length; i++) {
        const [a, b] = ARCS[i];
        const pa = cp[a], pb = cp[b];
        if (pa.z < 0 || pb.z < 0) continue;

        const mx = (pa.sx + pb.sx) / 2;
        const my = (pa.sy + pb.sy) / 2 - r * 0.2;

        // Arc line
        ctx.strokeStyle = 'rgba(210,165,55,.22)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.quadraticCurveTo(mx, my, pb.sx, pb.sy);
        ctx.stroke();

        // Animated dot along arc
        const tt = ((t * 0.28 + i * 0.19) % 1);
        const ax = (1-tt)*(1-tt)*pa.sx + 2*(1-tt)*tt*mx + tt*tt*pb.sx;
        const ay = (1-tt)*(1-tt)*pa.sy + 2*(1-tt)*tt*my + tt*tt*pb.sy;
        ctx.fillStyle = 'rgba(235,190,68,.95)';
        ctx.beginPath(); ctx.arc(ax, ay, 1.8, 0, Math.PI * 2); ctx.fill();
      }

      // ── City markers ──────────────────────────────────
      for (let i = 0; i < cp.length; i++) {
        const { sx, sy, z } = cp[i];
        if (z < 0) continue;
        const pulse = Math.sin(t * 1.8 + i * 1.15) * 0.5 + 0.5;

        // Outer pulse ring
        ctx.strokeStyle = `rgba(225,180,62,${pulse * 0.45})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.arc(sx, sy, 4 + pulse * 5.5, 0, Math.PI * 2); ctx.stroke();

        // Middle ring
        ctx.strokeStyle = `rgba(225,180,62,${0.55})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.arc(sx, sy, 3.2, 0, Math.PI * 2); ctx.stroke();

        // Core dot
        ctx.fillStyle = 'rgba(240,200,72,.98)';
        ctx.beginPath(); ctx.arc(sx, sy, 2, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    // Input events
    const onDown = e => {
      drag = true;
      lx = e.clientX ?? e.touches?.[0]?.clientX;
      ly = e.clientY ?? e.touches?.[0]?.clientY;
      canvas.style.cursor = 'grabbing';
    };
    const onMove = e => {
      if (!drag) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      rotY += (x - lx) * 0.005;
      tgtX  = Math.max(-0.72, Math.min(0.72, tgtX + (y - ly) * 0.005));
      lx = x; ly = y;
    };
    const onUp = () => { drag = false; canvas.style.cursor = 'grab'; };

    canvas.addEventListener('mousedown',  onDown);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove',  onMove, { passive: true });
    window.addEventListener('touchend',   onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onUp);
      canvas.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove',  onMove);
      window.removeEventListener('touchend',   onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab', touchAction: 'none' }}
    />
  );
}
