import * as React from 'react';

import { useTimingContext } from 'app/contexts';

export const Transport: React.FC = React.memo(() => {
  const { beat, play, stop } = useTimingContext();

  return (
    <div>
      <button onClick={stop}>Stop</button>
      <button onClick={play}>Play</button>

      <div>
        Current beat: {beat.main + 1}.{beat.sub + 1}
      </div>
    </div>
  );
});
