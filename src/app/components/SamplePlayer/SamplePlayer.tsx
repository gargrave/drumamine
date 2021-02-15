import React from 'react';

import { useTimingContext } from 'app/contexts';
import { Beat } from 'app/types';
import { getAudioBuffer } from 'app/utils';

const playsOnBeat = (triggers: Beat[]) => (currentBeat: Beat) => {
  const len = triggers.length;
  for (let i = 0; i < len; i += 1) {
    const beat = triggers[i];
    if (beat.main === currentBeat.main && beat.sub === currentBeat.sub) {
      return true;
    }
  }
  return false;
};

type SamplePlayerProps = {
  filePath: string;
  name: string;
  triggers: Beat[];
};

export const SamplePlayer: React.FC<SamplePlayerProps> = ({ filePath, name, triggers }) => {
  const { beat, isPlaying } = useTimingContext();

  const [active, setActive] = React.useState(true);
  const [sample, setSample] = React.useState<AudioBuffer>();

  const playSound = React.useCallback(() => {
    if (!sample) return;

    const sampleSource = ac.createBufferSource();
    sampleSource.buffer = sample;
    sampleSource.connect(ac.destination);
    sampleSource.start();

    return sampleSource;
  }, [sample]);

  // attempt to load the associated sample on initial load
  React.useEffect(() => {
    const loadSample = async () => {
      const loadedSample = await getAudioBuffer(ac, `sounds/${filePath}`);
      setSample(loadedSample);
    };

    loadSample();
  }, [filePath]);

  // when "time" changes, see if we need to trigger the sample
  React.useEffect(() => {
    if (!active) return;
    if (!isPlaying) return;

    if (playsOnBeat(triggers)(beat)) {
      playSound();
    }
  }, [active, beat, isPlaying, playSound, triggers]);

  return <div>SamplePlayer: {name}</div>;
};
