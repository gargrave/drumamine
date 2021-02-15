import produce from 'immer';

import { DEFAULT_BPM, FIRST_BEAT } from 'app/constants';
import { Beat } from 'app/types';

const SEC_PER_MIN = 60.0;
const MS_PER_SEC = 1000;
const ticksPerBeat = 4;

const getTickRate = (bpm: number): number =>
  Math.floor(MS_PER_SEC / (bpm / SEC_PER_MIN) / ticksPerBeat);

const wrap = (min: number, max: number, val: number): number => {
  if (val < min) return max;
  if (val > max) return min;
  return val;
};

export enum TimingProviderActionType {
  SetBpm = 'SetBpm',
  Start = 'Start',
  Stop = 'Stop',
  Tick = 'Tick',
}

type EmptyActionTypes =
  | TimingProviderActionType.Start
  | TimingProviderActionType.Stop
  | TimingProviderActionType.Tick;

type TimingProviderAction =
  | {
      type: TimingProviderActionType.SetBpm;
      value: number;
    }
  | {
      type: EmptyActionTypes;
    };

type PlayState = 'playing' | 'stopped';

type TimingProviderState = {
  beat: Beat;
  bpm: number;
  playState: PlayState;
  // TODO: we might not need this in state anymore
  tickRate: number;
};

export const initialTimingProviderState: TimingProviderState = {
  beat: FIRST_BEAT,
  bpm: DEFAULT_BPM,
  playState: 'stopped',
  tickRate: getTickRate(DEFAULT_BPM),
};

export const timingProviderReducer = (
  state: TimingProviderState,
  action: TimingProviderAction,
): TimingProviderState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TimingProviderActionType.SetBpm:
        draft.bpm = action.value;
        return;

      case TimingProviderActionType.Start:
        draft.playState = 'playing';
        return;

      case TimingProviderActionType.Stop:
        draft.beat = FIRST_BEAT;
        draft.playState = 'stopped';
        return;

      case TimingProviderActionType.Tick: {
        const newSub = wrap(0, 3, state.beat.sub + 1);
        const newBeat = newSub === 0 ? wrap(0, 3, state.beat.main + 1) : state.beat.main;

        draft.beat = {
          main: newBeat,
          sub: newSub,
        };
        return;
      }

      default:
        return;
    }
  });
};
