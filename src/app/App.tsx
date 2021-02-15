import React from 'react';

import { SamplePlayer, Transport } from './components';
import { TimingProvider } from './contexts';

function App() {
  return (
    <div>
      <TimingProvider>
        <Transport />
        <hr />
        <SamplePlayer filePath="kick01.wav" name="Kick" triggers={[0, 500, 1000, 1500]} />
        <SamplePlayer filePath="hat01.wav" name="Hat" triggers={[250, 750, 1250, 1750]} />
      </TimingProvider>
    </div>
  );
}

export default App;
