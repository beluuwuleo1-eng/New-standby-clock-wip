
import React, { useState, useEffect, useCallback } from 'react';
import { Settings as SettingsIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { StandByMode, ThemeColor, DailyInsight } from './types';
import { fetchDailyInsight } from './services/geminiService';
import DigitalClock from './components/DigitalClock';
import AnalogClock from './components/AnalogClock';
import WidgetView from './components/WidgetView';
import SolarClock from './components/SolarClock';
import SettingsPanel from './components/SettingsPanel';
// Fix: Added missing component imports for DuoClock and WordClock.
import DuoClock from './components/DuoClock';
import WordClock from './components/WordClock';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState<StandByMode>(StandByMode.DIGITAL);
  const [color, setColor] = useState<ThemeColor>('red');
  const [is24Hour, setIs24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [insight, setInsight] = useState<DailyInsight | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch AI insights on mount
  useEffect(() => {
    const loadInsight = async () => {
      const data = await fetchDailyInsight();
      if (data) setInsight(data);
    };
    loadInsight();
  }, []);

  const cycleMode = useCallback((direction: 'next' | 'prev') => {
    const modes = Object.values(StandByMode);
    const currentIndex = modes.indexOf(mode);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= modes.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = modes.length - 1;
    setMode(modes[nextIndex]);
  }, [mode]);

  const renderMode = () => {
    // Fix: Updated switch cases to handle implemented Duo and Word modes.
    switch (mode) {
      case StandByMode.DIGITAL:
        return <DigitalClock time={time} color={color} is24Hour={is24Hour} showSeconds={showSeconds} />;
      case StandByMode.ANALOG:
        return <AnalogClock time={time} color={color} />;
      case StandByMode.WIDGETS:
        return <WidgetView time={time} color={color} insight={insight} />;
      case StandByMode.SOLAR:
        return <SolarClock time={time} color={color} />;
      case StandByMode.DUO:
        return <DuoClock time={time} color={color} />;
      case StandByMode.WORD:
        return <WordClock time={time} color={color} />;
      default:
        return <DigitalClock time={time} color={color} is24Hour={is24Hour} showSeconds={showSeconds} />;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white transition-colors duration-1000 flex items-center justify-center">
      {/* Dynamic Background Noise/Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* Main Content Area */}
      <div className="w-full h-full flex items-center justify-center">
        {renderMode()}
      </div>

      {/* Navigation Controls (Visible on Hover) */}
      <div className="absolute inset-x-0 inset-y-0 group pointer-events-none">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
          <button 
            onClick={() => cycleMode('prev')}
            className="p-6 bg-white/5 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
          <button 
            onClick={() => cycleMode('next')}
            className="p-6 bg-white/5 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Top Right Actions */}
      <div className="absolute top-12 right-12 z-40">
        <button
          onClick={() => setShowSettings(true)}
          className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all backdrop-blur-md border border-white/5"
        >
          <SettingsIcon className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Mode Indicator */}
      <div className="absolute bottom-12 flex gap-2">
        {Object.values(StandByMode).map((m) => (
          <div
            key={m}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              mode === m ? 'w-8 bg-white' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          onClose={() => setShowSettings(false)}
          mode={mode}
          setMode={setMode}
          color={color}
          setColor={setColor}
          is24Hour={is24Hour}
          set24Hour={setIs24Hour}
          showSeconds={showSeconds}
          setShowSeconds={setShowSeconds}
        />
      )}
    </div>
  );
};

export default App;
