import React from 'react';

const Button = ({ text, image, bgColor, textColor, isTextBeforeImage }) => {
  const buttonClasses = `custom-button flex items-center gap-2 ${bgColor} ${textColor}`;

  return (
    <>
      <button className={buttonClasses}>
        {isTextBeforeImage && <span>{text}</span>}
        <img src={image} alt="" />
        {!isTextBeforeImage && <span>{text}</span>}
      </button>
    </>
  );
};

export default Button;
