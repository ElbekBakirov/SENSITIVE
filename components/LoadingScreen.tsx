
import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Qurilma tahlil qilinmoqda...",
    "Free Fire algoritmlari yuklanmoqda...",
    "Eng yaxshi headshot parametrlarini qidirish...",
    "Aim traektoriyasi optimallashtirilmoqda...",
    "Pro-player ma'lumotlari bazasi tekshirilmoqda..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8 animate-pulse">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-orange-500/20 rounded-full animate-spin border-t-orange-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <svg className="w-8 h-8 text-orange-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
          </svg>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-orbitron font-black text-orange-500 tracking-widest">HISOBLANMOQDA...</h3>
        <p className="text-slate-400 text-sm font-medium h-4">{loadingTexts[textIndex]}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
