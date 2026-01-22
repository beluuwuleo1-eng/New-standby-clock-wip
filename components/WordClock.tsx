
import React from 'react';
import { ThemeColor } from '../types';
import { THEME_COLORS } from '../constants';

interface WordClockProps {
  time: Date;
  color: ThemeColor;
}

// Fix: Completed numberToWords function and added return statement to resolve TypeScript error in file components/WordClock.tsx on line 11.
const numberToWords = (n: number): string => {
  const words = [
    "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
    "Twenty One", "Twenty Two", "Twenty Three", "Twenty Four", "Twenty Five", "Twenty Six", "Twenty Seven", "Twenty Eight", "Twenty Nine", "Thirty",
    "Thirty One", "Thirty Two", "Thirty Three", "Thirty Four", "Thirty Five", "Thirty Six", "Thirty Seven", "Thirty Eight", "Thirty Nine", "Forty",
    "Forty One", "Forty Two", "Forty Three", "Forty Four", "Forty Five", "Forty Six", "Forty Seven", "Forty Eight", "Forty Nine", "Fifty",
    "Fifty One", "Fifty Two", "Fifty Three", "Fifty Four", "Fifty Five", "Fifty Six", "Fifty Seven", "Fifty Eight", "Fifty Nine"
  ];
  return words[n] || "";
};

// Fix: Implemented WordClock component to display time in words with responsive typography.
const WordClock: React.FC<WordClockProps> = ({ time, color }) => {
  const h = time.getHours() % 12 || 12;
  const m = time.getMinutes();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full select-none text-center px-8">
      <div className="space-y-2">
        <div className="text-3xl font-bold opacity-20 uppercase tracking-[0.3em]">Currently</div>
        <div className={`text-[12vw] font-black uppercase tracking-tighter leading-[0.9] ${THEME_COLORS[color]}`}>
          {numberToWords(h)}
        </div>
        <div className="text-[10vw] font-black uppercase tracking-tighter opacity-80 leading-[0.9]">
          {m === 0 ? "O'Clock" : numberToWords(m)}
        </div>
      </div>
    </div>
  );
};

export default WordClock;
