
import React from 'react';
import { format } from 'date-fns';
import { ThemeColor, DailyInsight } from '../types';
import { THEME_COLORS } from '../constants';

interface WidgetViewProps {
  time: Date;
  color: ThemeColor;
  insight: DailyInsight | null;
}

const WidgetView: React.FC<WidgetViewProps> = ({ time, color, insight }) => {
  const timeStr = format(time, 'h:mm');
  const dayName = format(time, 'EEEE');
  const dateStr = format(time, 'MMMM do');

  return (
    <div className="grid grid-cols-2 gap-12 w-full max-w-6xl px-12">
      {/* Left: Simple Digital Clock */}
      <div className="bg-white/5 rounded-[3rem] p-12 flex flex-col justify-between aspect-square">
        <div className="text-2xl font-semibold opacity-50">{dayName}</div>
        <div className={`text-9xl font-black tracking-tighter ${THEME_COLORS[color]}`}>
          {timeStr}
        </div>
        <div className="text-2xl font-medium opacity-50">{dateStr}</div>
      </div>

      {/* Right: AI Daily Insight */}
      <div className="bg-white/5 rounded-[3rem] p-12 flex flex-col justify-between aspect-square overflow-hidden">
        {insight ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${THEME_COLORS[color].replace('text', 'bg')}`} />
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">Daily Focus</span>
            </div>
            <p className="text-2xl font-medium leading-tight">"{insight.quote}"</p>
            <p className="text-lg opacity-40">— {insight.author}</p>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm font-semibold opacity-50 mb-1">Today's Fact</p>
              <p className="text-sm italic opacity-80 leading-snug">{insight.fact}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full animate-pulse">
            <div className="text-white/20 font-bold uppercase tracking-tighter text-4xl">Syncing AI...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetView;
