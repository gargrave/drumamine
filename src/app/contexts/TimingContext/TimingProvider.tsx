import React from 'react';

import { TimingContext } from './TimingContext';
import { initialTimingProviderState, timingProviderReducer } from './TimingProvider.reducer';

type TimingProviderProps = {
  children: React.ReactNode;
};

export const TimingProvider: React.FC<TimingProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(timingProviderReducer, initialTimingProviderState);
  const { beat, bpm, playState, tickRate } = state;

  const isPlaying = playState === 'playing';

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        dispatch({ type: 'tick' });
      }, tickRate);
    }

    return () => void clearInterval(interval);
  }, [isPlaying, tickRate]);

  const play = React.useCallback(() => {
    dispatch({ type: 'start' });
  }, []);

  const stop = React.useCallback(() => {
    dispatch({ type: 'stop' });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      beat,
      bpm,
      isPlaying,
      play,
      stop,
    }),
    [beat, bpm, isPlaying, play, stop],
  );

  return <TimingContext.Provider value={contextValue}>{children}</TimingContext.Provider>;
};
