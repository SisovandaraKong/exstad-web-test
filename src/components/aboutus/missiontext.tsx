// GradientWrapper.tsx
import React from 'react';

interface GradientWrapperProps {
  children: React.ReactNode;
  className?: string; // optional extra classes
  gradient?: string;  // optional custom gradient
}

const MyCard: React.FC<GradientWrapperProps> = ({
  children,
  className = '',
  gradient = 'linear-gradient(135deg, #FF0000, #7777FF)', // default Figma gradient
}) => {
  return (
    <div
    className={`${className} bg-clip-text text-transparent`}
    style={{ backgroundImage: gradient }}
    >
      {children}
    </div>
  );
};

export default MyCard;
