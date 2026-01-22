
import React from 'react';
import { ThemeColor } from '../types';
import { BG_ACCENTS } from '../constants';

interface AnalogClockProps {
  time: Date;
  color: ThemeColor;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, color }) => {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondsDeg = (seconds / 60) * 360;
  const minutesDeg = ((minutes + seconds / 60) / 60) * 360;
  const hoursDeg = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="relative w-[45vh] h-[45vh] flex items-center justify-center">
      {/* Clock Face */}
      <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
      
      {/* Tick Marks */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-full w-full flex justify-center py-2"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div className={`w-1 rounded-full ${i % 3 === 0 ? 'h-6 bg-white' : 'h-3 bg-white/30'}`} />
        </div>
      ))}

      {/* Hour Hand */}
      <div
        className="absolute w-2 bg-white rounded-full origin-bottom bottom-1/2"
        style={{ height: '25%', transform: `rotate(${hoursDeg}deg)` }}
      />
      
      {/* Minute Hand */}
      <div
        className="absolute w-1.5 bg-white/80 rounded-full origin-bottom bottom-1/2"
        style={{ height: '35%', transform: `rotate(${minutesDeg}deg)` }}
      />
      
      {/* Second Hand */}
      <div
        className={`absolute w-0.5 ${BG_ACCENTS[color]} origin-bottom bottom-1/2`}
        style={{ height: '40%', transform: `rotate(${secondsDeg}deg)` }}
      />
      
      {/* Center Pin */}
      <div className={`z-10 w-3 h-3 rounded-full ${BG_ACCENTS[color]} border-2 border-black`} />
    </div>
  );
};

export default AnalogClock;
