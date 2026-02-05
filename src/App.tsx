import React, { useState, useEffect } from 'react';

export default function App() {
  // Target: 30 days from now
 const [expiryTime] = useState(new Date("2025-03-10T00:00:00").getTime());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = expiryTime - now;
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryTime]);

  // Helper to format numbers to 00
  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans selection:bg-blue-500">
      
      {/* Subtle Top Glow like the image */}
      <div className="fixed top-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center text-center">
        
        {/* Logo - Lowercase and wide tracking for that "curvy" modern feel */}
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 lowercase opacity-90">
          infonix
        </h1>

        {/* Timer - Large, bold, separated by colons */}
        <div className="flex items-center gap-2 md:gap-4 mb-10">
          <span className="text-6xl md:text-8xl font-bold tracking-tighter">{format(timeLeft.days)}</span>
          <span className="text-4xl md:text-6xl font-light opacity-30">:</span>
          <span className="text-6xl md:text-8xl font-bold tracking-tighter">{format(timeLeft.hours)}</span>
          <span className="text-4xl md:text-6xl font-light opacity-30">:</span>
          <span className="text-6xl md:text-8xl font-bold tracking-tighter">{format(timeLeft.mins)}</span>
          <span className="text-4xl md:text-6xl font-light opacity-30">:</span>
          <span className="text-6xl md:text-8xl font-bold tracking-tighter">{format(timeLeft.secs)}</span>
        </div>

        {/* Discord Button - Pill shape, specific Blue */}
        <a 
          href="https://discord.gg/kszZj4822m" 
          target="_blank"
          rel="noreferrer"
          className="bg-[#2463eb] hover:bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-all transform active:scale-95 shadow-lg shadow-blue-900/20"
        >
          Join our Discord
        </a>
      </div>

      {/* Optional: Very subtle bottom vignette */}
      <div className="fixed bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}