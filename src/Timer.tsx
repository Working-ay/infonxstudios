import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number;
}

export const Timer = () => {
  // Set target date to 30 days from now
  const [targetDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-2xl">
        <span className="text-3xl md:text-5xl font-bold tracking-tighter">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-3 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex animate-in fade-in zoom-in duration-1000">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};