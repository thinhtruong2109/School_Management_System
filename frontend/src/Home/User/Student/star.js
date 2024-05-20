// StarField.js
import React, { useEffect } from 'react';
import './star.css';

const StarField = () => {
  useEffect(() => {
    const numStars = 10; // Số lượng ngôi sao
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');
    document.body.appendChild(starContainer);

    // Tạo ngôi sao ngẫu nhiên
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      starContainer.appendChild(star);

      // Tính toán vị trí ban đầu và hướng di chuyển của ngôi sao
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      const speed = Math.random() * 4 + 1;

      // Thiết lập vị trí ban đầu của ngôi sao
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      // Di chuyển ngôi sao từ vị trí ban đầu đến vị trí mới
      const updatePosition = () => {
        const newX = parseFloat(star.style.left) + speed;
        const newY = parseFloat(star.style.top) + speed * (window.innerHeight / window.innerWidth);

        star.style.left = `${newX}px`;
        star.style.top = `${newY}px`;

        // Kiểm tra xem ngôi sao có ra khỏi màn hình không
        if (newX > window.innerWidth || newY > window.innerHeight) {
          // Nếu ra khỏi màn hình, đặt lại vị trí ban đầu
          star.style.left = `${Math.random() * window.innerWidth}px`;
          star.style.top = `${Math.random() * window.innerHeight}px`;
        }

        // Tiếp tục di chuyển ngôi sao
        requestAnimationFrame(updatePosition);
      };

      updatePosition();
    }
  }, []);

  return <div>

    
  </div>;
};

export default StarField;