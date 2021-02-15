import React from 'react';

import { DEFAULT_BPM, FIRST_BEAT } from 'app/constants';
import { Beat } from 'app/types';

const noop = () => void 0;

export type TimingContextType = {
  beat: Beat;
  bpm: number;
  isPlaying: boolean;
  play: () => void;
  setBpm: (value: number) => void;
  stop: () => void;
};

const initialTimingContext: TimingContextType = {
  beat: FIRST_BEAT,
  bpm: DEFAULT_BPM,
  isPlaying: false,
  play: noop,
  setBpm: noop,
  stop: noop,
};

export const TimingContext = React.createContext<TimingContextType>(initialTimingContext);

export const useTimingContext = () => React.useContext(TimingContext);
