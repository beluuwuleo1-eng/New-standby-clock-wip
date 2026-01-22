
import React from 'react';
import { X, Clock, Palette, Sparkles, LayoutGrid, Sun, Columns, Type } from 'lucide-react';
import { StandByMode, ThemeColor } from '../types';
import { BG_ACCENTS, THEME_COLORS } from '../constants';

interface SettingsPanelProps {
  onClose: () => void;
  mode: StandByMode;
  setMode: (mode: StandByMode) => void;
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
  is24Hour: boolean;
  set24Hour: (val: boolean) => void;
  showSeconds: boolean;
  setShowSeconds: (val: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose, mode, setMode, color, setColor, is24Hour, set24Hour, showSeconds, setShowSeconds
}) => {
  // Fix: Added implemented StandBy modes (DUO and WORD) to the settings selection grid.
  const modes = [
    { id: StandByMode.DIGITAL, label: 'Digital', icon: Clock },
    { id: StandByMode.ANALOG, label: 'Analog', icon: Clock },
    { id: StandByMode.WIDGETS, label: 'Widgets', icon: LayoutGrid },
    { id: StandByMode.SOLAR, label: 'Solar', icon: Sun },
    { id: StandByMode.DUO, label: 'Duo', icon: Columns },
    { id: StandByMode.WORD, label: 'Word', icon: Type },
  ];

  const colors: ThemeColor[] = ['white', 'red', 'orange', 'green', 'blue', 'purple'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-white/5">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-500" />
            StandBy Settings
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Mode Selection */}
          <section className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest opacity-40">Display Mode</label>
            <div className="grid grid-cols-2 gap-3">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                    mode === m.id ? 'bg-white text-black font-bold' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <m.icon className="w-5 h-5" />
                  {m.label}
                </button>
              ))}
            </div>
          </section>

          {/* Color Selection */}
          <section className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest opacity-40">Accent Color</label>
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-all border-4 ${
                    color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  } ${BG_ACCENTS[c]}`}
                />
              ))}
            </div>
          </section>

          {/* Options */}
          <section className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest opacity-40">Time Options</label>
            <div className="space-y-3">
              <button
                onClick={() => set24Hour(!is24Hour)}
                className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <span>24-Hour Time</span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${is24Hour ? 'bg-green-500' : 'bg-neutral-700'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${is24Hour ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </button>
              <button
                onClick={() => setShowSeconds(!showSeconds)}
                className="flex items-center justify-between w-full p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <span>Show Seconds</span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${showSeconds ? 'bg-green-500' : 'bg-neutral-700'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${showSeconds ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </button>
            </div>
          </section>
        </div>

        <div className="p-8 pt-0">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
