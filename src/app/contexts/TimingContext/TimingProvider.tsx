import React from 'react';

import { TimingContext } from './TimingContext';

type TimingProviderProps = {
  children: React.ReactNode;
};

export const TimingProvider: React.FC<TimingProviderProps> = ({ children }) => {
  // TODO: this needs to go into a useReducer before it gets too complex
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // TODO: this needs to warp properly based on BPM
      setTime((prev) => {
        const newTime = prev + 125;
        return newTime < 2000 ? newTime : 0;
      });
    }, 125);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const contextValue = React.useMemo(
    () => ({
      bpm: 120,
      time,
    }),
    [time],
  );

  return <TimingContext.Provider value={contextValue}>{children}</TimingContext.Provider>;
};
