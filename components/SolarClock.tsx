
import React from 'react';
import { format } from 'date-fns';
import { ThemeColor } from '../types';
import { THEME_COLORS } from '../constants';

interface SolarClockProps {
  time: Date;
  color: ThemeColor;
}

const SolarClock: React.FC<SolarClockProps> = ({ time, color }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const progress = (hours * 60 + minutes) / (24 * 60);
  const timeStr = format(time, 'h:mm');
  const period = format(time, 'aa');

  // Calculate sun position along a curve
  const angle = progress * Math.PI - Math.PI; // -PI to 0
  const x = 50 + 40 * Math.cos(angle);
  const y = 80 - 50 * Math.abs(Math.sin(angle));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 opacity-20 bg-gradient-to-t from-transparent ${THEME_COLORS[color].replace('text', 'via')}`} />
      
      {/* Horizon Line */}
      <div className="absolute bottom-1/4 w-full h-px bg-white/20" />

      {/* Sun Curve Path */}
      <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <path
          d="M 10 80 Q 50 20 90 80"
          fill="none"
          stroke="currentColor"
          className="text-white/5"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
      </svg>

      {/* The Sun */}
      <div
        className={`absolute w-12 h-12 rounded-full blur-md shadow-2xl transition-all duration-1000 ${THEME_COLORS[color].replace('text', 'bg')}`}
        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-pulse" />
      </div>

      {/* Center Time Display */}
      <div className="z-10 text-center select-none">
        <div className={`text-[18vw] font-black leading-none tracking-tighter ${THEME_COLORS[color]}`}>
          {timeStr}
        </div>
        <div className="text-3xl font-bold uppercase tracking-[0.5em] opacity-40 mt-[-1vw]">
          {period}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 text-sm font-medium tracking-widest opacity-30 flex gap-8">
        <span>SUNRISE 06:12</span>
        <span>SUNSET 18:45</span>
      </div>
    </div>
  );
};

export default SolarClock;
