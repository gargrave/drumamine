import produce from 'immer';

export const wrap = (min: number, max: number, val: number): number => {
  if (val < min) return max;
  if (val > max) return min;
  return val;
};

export type TimingProviderActionType = 'start' | 'stop' | 'tick';

type TimingProviderAction = {
  type: TimingProviderActionType;
};

type PlayState = 'playing' | 'stopped';

type TimingProviderState = {
  playState: PlayState;
  time: number;
};

export const initialTimingProviderState: TimingProviderState = {
  playState: 'stopped',
  time: 0,
};

export const timingProviderReducer = (
  state: TimingProviderState,
  action: TimingProviderAction,
): TimingProviderState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'start':
        draft.playState = 'playing';
        return;

      case 'stop':
        draft.playState = 'stopped';
        draft.time = 0;
        return;

      case 'tick': {
        // TODO: this needs to warp properly based on BPM
        draft.time = wrap(0, 2000 - 1, state.time + 125);
        return;
      }

      default:
        return;
    }
  });
};
