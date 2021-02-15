import React from 'react';

import { TimingContext } from './TimingContext';
import {
  initialTimingProviderState,
  TimingProviderActionType,
  timingProviderReducer,
} from './TimingProvider.reducer';

const SEC_PER_MIN = 60.0;
const MS_PER_SEC = 1000;
const ticksPerBeat = 4;

const getTickRate = (bpm: number): number =>
  Math.floor(MS_PER_SEC / (bpm / SEC_PER_MIN) / ticksPerBeat);

type TimingProviderProps = {
  children: React.ReactNode;
};

export const TimingProvider: React.FC<TimingProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(timingProviderReducer, initialTimingProviderState);
  const { beat, bpm, playState } = state;

  const isPlaying = playState === 'playing';

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      const tickRate = getTickRate(bpm);
      interval = setInterval(() => {
        dispatch({ type: TimingProviderActionType.Tick });
      }, tickRate);
    }

    return () => void clearInterval(interval);
  }, [bpm, isPlaying]);

  const play = React.useCallback(() => {
    dispatch({ type: TimingProviderActionType.Start });
  }, []);

  const stop = React.useCallback(() => {
    dispatch({ type: TimingProviderActionType.Stop });
  }, []);

  const setBpm = React.useCallback((value: number) => {
    dispatch({ type: TimingProviderActionType.SetBpm, value });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      beat,
      bpm,
      isPlaying,
      play,
      setBpm,
      stop,
    }),
    [beat, bpm, isPlaying, play, setBpm, stop],
  );

  return <TimingContext.Provider value={contextValue}>{children}</TimingContext.Provider>;
};
