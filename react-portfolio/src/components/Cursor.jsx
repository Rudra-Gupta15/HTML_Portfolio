import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let animationFrameId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };

    const animCursor = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      animationFrameId = requestAnimationFrame(animCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    animCursor();

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .card, .pcard, .p-tab')) {
        if (cursorRef.current && ringRef.current) {
          cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2)';
          ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)';
          ringRef.current.style.opacity = '0.2';
        }
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .card, .pcard, .p-tab')) {
        if (cursorRef.current && ringRef.current) {
          cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
          ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
          ringRef.current.style.opacity = '0.5';
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
}
