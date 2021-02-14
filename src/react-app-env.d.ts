/// <reference types="react-scripts" />

declare var ac: AudioContext;

declare global {
  interface Window {
    ac: AudioContext;
  }
}
