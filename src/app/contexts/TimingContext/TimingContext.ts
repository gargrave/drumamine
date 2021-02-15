import React from 'react';

const noop = () => void 0;

export type TimingContextType = {
  bpm: number;
  isPlaying: boolean;
  play: () => void;
  stop: () => void;
  time: number;
};

const initialTimingContext: TimingContextType = {
  bpm: 120,
  isPlaying: false,
  play: noop,
  stop: noop,
  time: 0,
};

export const TimingContext = React.createContext<TimingContextType>(initialTimingContext);

export const useTimingContext = () => React.useContext(TimingContext);
