import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    const stars = Array.from({length: 220}).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      s: Math.random() * 2.2,
      v: Math.random() * 0.4 + 0.1,
      color: ['#00BCD4', '#FF6B35', '#FFFFFF', '#4DD0E1', '#FFD166'][Math.floor(Math.random() * 5)]
    }));
    
    let animId;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.s, 0, Math.PI * 2);
        
        // Add subtle glow to stars
        ctx.shadowBlur = 4;
        ctx.shadowColor = star.color;
        
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = star.color;
        ctx.fill();
        
        // Reset shadow for performance
        ctx.shadowBlur = 0;

        star.y -= star.v;
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none', opacity: 0.6
      }} 
    />
  );
}
