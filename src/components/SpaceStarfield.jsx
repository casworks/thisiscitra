import React, { useEffect, useRef } from 'react';

export default function SpaceStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const parent = canvas.parentElement;
    if (!parent) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let stars = [];
    let frameId;
    let resizeObserver;
    let viewWidth = 0;
    let viewHeight = 0;
    let lastTime = 0;

    const createStars = (width, height) => {
      const count = Math.min(3600, Math.max(600, Math.floor(width * height * 0.001)));
      stars = Array.from({ length: count }).map(() => {
        const huePick = Math.random();
        const tint =
          huePick > 0.98
            ? [255, 160, 220]
            : huePick > 0.95
            ? [140, 200, 255]
            : [255, 255, 255];
        const speed = 1.4 + Math.random() * 3.6;
        const angle = Math.random() * Math.PI * 2;
        const turn = 0.15 + Math.random() * 0.4;
        const wobble = 0.25 + Math.random() * 0.6;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.18 + Math.random() * 0.85,
          alpha: 0.35 + Math.random() * 0.55,
          twinkle: 0.0008 + Math.random() * 0.0024,
          phase: Math.random() * Math.PI * 2,
          tint,
          speed,
          angle,
          turn,
          wobble
        };
      });
    };

    const resize = () => {
      const width = parent.clientWidth;
      const height = Math.max(parent.scrollHeight, window.innerHeight);
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      viewWidth = width;
      viewHeight = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars(width, height);
    };

    const render = (time) => {
      const delta = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
      lastTime = time;
      ctx.clearRect(0, 0, viewWidth, viewHeight);
      stars.forEach((star) => {
        const drift = Math.sin(time * 0.0002 + star.phase) * star.turn;
        star.angle += drift * delta;
        const speed = star.speed + Math.cos(time * 0.00015 + star.phase * 1.3) * 0.35;
        const vx = Math.cos(star.angle) * speed + Math.sin(time * 0.00035 + star.phase) * star.wobble;
        const vy = Math.sin(star.angle) * speed + Math.cos(time * 0.0003 + star.phase * 1.7) * star.wobble;
        star.x += vx * delta;
        star.y += vy * delta;
        if (star.x - star.radius > viewWidth) {
          star.x = -star.radius;
        } else if (star.x + star.radius < 0) {
          star.x = viewWidth + star.radius;
        }
        if (star.y - star.radius > viewHeight) {
          star.y = -star.radius;
        } else if (star.y + star.radius < 0) {
          star.y = viewHeight + star.radius;
        }
        const twinkle = Math.sin(time * star.twinkle + star.phase) * 0.35;
        const alpha = Math.max(0.15, Math.min(1, star.alpha + twinkle));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${star.tint[0]}, ${star.tint[1]}, ${star.tint[2]}, ${alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(parent);
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="space-canvas" />;
}
