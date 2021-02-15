import * as React from 'react';

import { useTimingContext } from 'app/contexts';

export type TransportProps = {};

export const Transport: React.FC<TransportProps> = () => {
  const { play, stop } = useTimingContext();

  return (
    <div>
      <button onClick={stop}>Stop</button>
      <button onClick={play}>Play</button>
    </div>
  );
};
