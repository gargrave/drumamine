import React from 'react';

import { useTimingContext } from 'app/contexts';
import { getAudioBuffer } from 'app/utils';

type SamplePlayerProps = {
  filePath: string;
  name: string;
  triggers: number[];
};

export const SamplePlayer: React.FC<SamplePlayerProps> = ({ filePath, name, triggers }) => {
  const { time } = useTimingContext();

  const [active, setActive] = React.useState(false);
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
    if (triggers.includes(time)) {
      playSound();
    }
  }, [active, playSound, time, triggers]);

  return <div />;
};
