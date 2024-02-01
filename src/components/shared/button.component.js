import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
  const { onClick, className, children, to, additionalClass } = props;
  const buttonClass = className === 'cta' ? 'cta-button' : 'button';
  const combinedClass = additionalClass ? `${buttonClass} ${additionalClass}` : buttonClass;

  return (
    <Link to={to} className={combinedClass} onClick={onClick}>
      {children}
    </Link>
  );
};

export default Button;
