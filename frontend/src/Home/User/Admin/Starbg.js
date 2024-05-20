import React, { useRef, useEffect } from 'react';

const StarExplosion = () => {
  const canvasRef = useRef(null);

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  // Thiết lập kích thước canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Khởi tạo các ngôi sao
  const stars = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 4 + 1,
    vx: Math.random() * 4 - 2,
    vy: Math.random() * 4 - 2,
  }));

  // Vòng lặp hoạt ảnh
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
      // Di chuyển ngôi sao
      star.x += star.vx;
      star.y += star.vy;

      // Đảm bảo ngôi sao luôn ở trong canvas
      if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
      if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;

      // Vẽ ngôi sao
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  };

  animate();
}, []);

  return <canvas ref={canvasRef} width="800" height="600" />;
};

export default StarExplosion;