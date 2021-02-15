import React from 'react';

import { TimingContext } from './TimingContext';

type PlayingState = 'playing' | 'stopped';

type TimingProviderProps = {
  children: React.ReactNode;
};

export const TimingProvider: React.FC<TimingProviderProps> = ({ children }) => {
  // TODO: this needs to go into a useReducer before it gets too complex
  const [playingState, setPlayingState] = React.useState<PlayingState>('stopped');
  const [time, setTime] = React.useState(0);

  const isPlaying = playingState === 'playing';

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        // TODO: this needs to warp properly based on BPM
        setTime((prev) => {
          const newTime = prev + 125;
          return newTime < 2000 ? newTime : 0;
        });
      }, 125);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const play = React.useCallback(() => {
    setPlayingState('playing');
  }, []);

  const stop = React.useCallback(() => {
    // TODO: reset time to 0
    setPlayingState('stopped');
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
