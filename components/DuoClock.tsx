
import React from 'react';
import { format } from 'date-fns';
import { ThemeColor } from '../types';
import { THEME_COLORS } from '../constants';

interface DuoClockProps {
  time: Date;
  color: ThemeColor;
}

const DuoClock: React.FC<DuoClockProps> = ({ time, color }) => {
  const hours = format(time, 'HH');
  const minutes = format(time, 'mm');

  return (
    <div className="flex flex-col items-center justify-center h-full w-full select-none leading-none">
      <div className={`text-[35vh] font-black tracking-tighter ${THEME_COLORS[color]}`}>
        {hours}
      </div>
      <div className="text-[35vh] font-black tracking-tighter text-white opacity-90 mt-[-5vh]">
        {minutes}
      </div>
    </div>
  );
};

export default DuoClock;
