
import React from 'react';
import { format } from 'date-fns';
import { ThemeColor } from '../types';
import { THEME_COLORS } from '../constants';

interface DigitalClockProps {
  time: Date;
  color: ThemeColor;
  is24Hour: boolean;
  showSeconds: boolean;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time, color, is24Hour, showSeconds }) => {
  const timeStr = format(time, is24Hour ? 'HH:mm' : 'h:mm');
  const secondsStr = format(time, 'ss');
  const period = format(time, 'aa');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full select-none">
      <div className={`flex items-baseline font-black tracking-tighter ${THEME_COLORS[color]}`}>
        <span className="text-[25vw] leading-none">{timeStr}</span>
        {showSeconds && (
          <span className="text-[8vw] ml-4 opacity-50 tabular-nums">{secondsStr}</span>
        )}
      </div>
      {!is24Hour && (
        <div className={`text-[4vw] font-bold uppercase tracking-widest mt-[-2vw] ${THEME_COLORS[color]} opacity-80`}>
          {period}
        </div>
      )}
    </div>
  );
};

export default DigitalClock;
