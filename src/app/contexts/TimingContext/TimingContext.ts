import React from 'react';

import { DEFAULT_BPM } from 'app/constants';
import { Beat } from '../../types';

const noop = () => void 0;

export type TimingContextType = {
  beat: Beat;
  bpm: number;
  isPlaying: boolean;
  play: () => void;
  stop: () => void;
};

const initialTimingContext: TimingContextType = {
  beat: { main: 0, sub: 0 },
  bpm: DEFAULT_BPM,
  isPlaying: false,
  play: noop,
  stop: noop,
};

export const TimingContext = React.createContext<TimingContextType>(initialTimingContext);

export const useTimingContext = () => React.useContext(TimingContext);
