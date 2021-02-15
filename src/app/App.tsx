import React from 'react';

import { SamplePlayer, Transport } from './components';
import { TimingProvider } from './contexts';
import { Beat } from './types';

const downbeats: Beat[] = [
  { main: 0, sub: 0 },
  { main: 1, sub: 0 },
  { main: 2, sub: 0 },
  { main: 3, sub: 0 },
];

const upBeats: Beat[] = [
  { main: 0, sub: 2 },
  { main: 1, sub: 2 },
  { main: 2, sub: 2 },
  { main: 3, sub: 2 },
];

function App() {
  return (
    <div>
      <h1>Drumamine</h1>
      <hr />

      <TimingProvider>
        <Transport />
        <hr />
        <SamplePlayer
          filePath="kick01.wav"
          name="Kick (Plays on down beats)"
          triggers={downbeats}
        />
        <SamplePlayer filePath="hat01.wav" name="Hat (Plays on up beats)" triggers={upBeats} />
      </TimingProvider>
    </div>
  );
}

export default App;
