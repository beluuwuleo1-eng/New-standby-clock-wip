
export enum StandByMode {
  DIGITAL = 'DIGITAL',
  ANALOG = 'ANALOG',
  WIDGETS = 'WIDGETS',
  SOLAR = 'SOLAR',
  DUO = 'DUO',
  WORD = 'WORD',
  WORLD = 'WORLD',
  TECH = 'TECH',
  ZEN = 'ZEN',
  MINIMAL = 'MINIMAL'
}

export interface DailyInsight {
  quote: string;
  author: string;
  focus: string;
  fact: string;
}

export type ThemeColor = 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'white';

export interface AppState {
  mode: StandByMode;
  color: ThemeColor;
  is24Hour: boolean;
  showSeconds: boolean;
}
