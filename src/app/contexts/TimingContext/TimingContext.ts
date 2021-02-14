import React from 'react';

export type TimingContextType = {
  bpm: number;
  time: number;
};

const initialTimingContext: TimingContextType = {
  bpm: 120,
  time: 0,
};

export const TimingContext = React.createContext<TimingContextType>(initialTimingContext);

export const useTimingContext = () => React.useContext(TimingContext);
