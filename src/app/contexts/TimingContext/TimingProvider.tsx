import React from 'react';

import { TimingContext } from './TimingContext';
import { initialTimingProviderState, timingProviderReducer } from './TimingProvider.reducer';

type TimingProviderProps = {
  children: React.ReactNode;
};

export const TimingProvider: React.FC<TimingProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(timingProviderReducer, initialTimingProviderState);
  const { playState, time } = state;

  const isPlaying = playState === 'playing';

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 125);
    }

    return () => void clearInterval(interval);
  }, [isPlaying]);

  const play = React.useCallback(() => {
    dispatch({ type: 'start' });
  }, []);

  const stop = React.useCallback(() => {
    dispatch({ type: 'stop' });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      bpm: 120,
      isPlaying,
      play,
      stop,
      time,
    }),
    [isPlaying, play, stop, time],
  );

  return <TimingContext.Provider value={contextValue}>{children}</TimingContext.Provider>;
};
