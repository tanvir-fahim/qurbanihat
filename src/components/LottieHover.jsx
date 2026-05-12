"use client";
import { useRef } from "react";
import Lottie from "lottie-react";

const LottieHover = ({ 
  animationData, 
  size = 50, 
  loop = true, 
  className = "" 
}) => {
  const lottieRef = useRef();

  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <Lottie animationData={animationData} loop />
    </div>
  );
};

export default LottieHover;