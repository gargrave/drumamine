export async function getAudioBuffer(audioContext: AudioContext, filepath: string) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();

  try {
    return await audioContext.decodeAudioData(arrayBuffer);
  } catch (err) {
    const ERR_INVALID_AUDIO = `Unable to decode audio file: ${filepath}`;
    throw Error(ERR_INVALID_AUDIO);
  }
}
