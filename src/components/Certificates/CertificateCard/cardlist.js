import React, { useLayoutEffect, useRef } from "react";

const CardList = () => {
  const cardRef = useRef();

  useLayoutEffect(() => {
    const updateCardHeight = () => {
      const card = cardRef.current;
      if (card) {
        const width = card.offsetWidth;
        const height = parseInt(width * 70) / 100
        card.style.height = `${height}px`;
      }
    };

    updateCardHeight();
    window.addEventListener('resize', updateCardHeight); // Update on window resize

    return () => {
      window.removeEventListener('resize', updateCardHeight); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className="certificate-card" ref={cardRef}></div>
  );
};

export default CardList;
