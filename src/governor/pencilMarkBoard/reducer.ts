import { AnyAction } from 'redux';
import { PencilMarkBoardActions } from './actions';
import { PencilMarkBoardInitialState, pencilMarkBoardInitialState } from './initialState';

export const pencilMarkBoardReducer = (state: PencilMarkBoardInitialState = pencilMarkBoardInitialState, action: AnyAction) => {
  switch (action.type) {
    case PencilMarkBoardActions.ENABLE_PENCIL_MODE:
      return { ...state, pencilMode: true }

    case PencilMarkBoardActions.DISABLE_PENCIL_MODE:
      return { ...state, pencilMode: false }

    default:
      return state;
  }
}