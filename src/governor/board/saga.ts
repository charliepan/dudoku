import { all, call, put, select, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { Direction } from '../../governor/models/board';
import { createPencilMarkBoardClearMatchingMarksAction, createPencilMarkBoardClearPencilMarksAction, createPencilMarkingSetAction, selectIsPencilMode, selectPencilMarkBoard } from '../../governor/pencilMarkBoard';
import { Board, Piece } from '../../models/client/board';
import { PencilMarkBoard } from '../../models/client/pencilMarkBoard';
import { ServerBoardResponse, ServerBoardSolverResponse, ServerBoardValidationResponse } from '../../models/server/board';
import { makeRequest } from '../../utils/api';
import { transformClientToServerSudokuBoard, transformServerToClientSudokuBoard } from '../../utils/board';
import { BoardActions, BoardMoveInDirectionAction, BoardSelectPieceAction, BoardSetPaintNumberAction, BoardSetUserPressedAction, createBoardSelectPieceAction, createBoardSetAction, createBoardSetActivePieceAction, createBoardSetCursorIndexAction, createBoardSetHighlightedNumber, createBoardSetPaintNumberAction, createBoardSetSolutionBoardAction, createBoardSetValidationStatusAction } from './actions';
import { selectActivePiece, selectActivePieceIndex, selectBoard, selectCurrentCursorIndex, selectSolutionBoard } from './selectors';


export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga),
    takeLatest(BoardActions.SET_PAINT_NUMBER, setNumberInPieceSaga),
    takeLatest(BoardActions.CHECK_BOARD, checkBoard),
    takeEvery(BoardActions.SELECT_PIECE, handlePieceSelection),
    takeLatest(BoardActions.MOVE_IN_DIRECTION, moveActivePieceInDirection),
    takeEvery(BoardActions.SET_USER_PRESSED, setUserPressed)
  ])
}

export function* fetchBoardSaga(): Generator {
  // gets a new board
  const response = (yield call(makeRequest, 'get-sudoku-board')) as ServerBoardResponse;

  // gets the solved board using the new board
  const solutionBoard = (yield call(makeRequest, 'check-board', { board: response.board })) as ServerBoardSolverResponse;

  yield put(createBoardSetAction(transformServerToClientSudokuBoard(response.board)));
  yield put(createBoardSetSolutionBoardAction(transformServerToClientSudokuBoard(solutionBoard.solution)));
}

export function* setNumberInPieceSaga(action: BoardSetPaintNumberAction): Generator {
  const desiredNumber = action.payload
  const activePieceIndex = (yield select(selectActivePieceIndex)) as number;
  const activePiece = (yield select(selectActivePiece)) as Piece;
  const currentBoard = [...(yield select(selectBoard)) as Board]
  const currentPencilMarkBoard = [...(yield select(selectPencilMarkBoard)) as PencilMarkBoard];

  currentBoard[activePieceIndex] = {
    ...activePiece,
    number: currentBoard[activePieceIndex].number === desiredNumber ? 0 : desiredNumber,
    isWrong: false
  }


  // check if there are pencil markings in that piece first and remove them
  if (currentPencilMarkBoard[activePieceIndex]?.length > 0) {
    yield put(createPencilMarkBoardClearPencilMarksAction());
  }

  if (desiredNumber !== 0) {
    yield put(createBoardSetHighlightedNumber(desiredNumber));
  } else {
    yield put(createBoardSetHighlightedNumber(null));
  }

  yield put(createBoardSetAction(currentBoard));

  if (desiredNumber !== 0) {
    yield put(createPencilMarkBoardClearMatchingMarksAction(activePieceIndex));
  }

  if (currentBoard.every(piece => piece.number !== 0)) {
    yield* validateBoard(currentBoard)
  }
}

export function* handlePieceSelection(action: BoardSelectPieceAction): Generator {
  const board = (yield select(selectBoard)) as Board;
  const clickedIndex = action.payload;
  const isActionable = board[clickedIndex]?.isActionable;
  const number = board[clickedIndex]?.number;
  const activePiece = (yield select(selectActivePiece)) as Piece;

  yield put(createBoardSetCursorIndexAction(action.payload));

  if (isActionable) {
    if (activePiece == null) {
      yield put(createBoardSetActivePieceAction(clickedIndex));
      if (number !== 0) {
        yield put(createBoardSetHighlightedNumber(number));
      } else {
        yield put(createBoardSetHighlightedNumber(null));
      }
    } else if (activePiece != null) {
      if (activePiece.index != clickedIndex) {
        yield put(createBoardSetActivePieceAction(clickedIndex));
      } else {
        yield put(createBoardSetActivePieceAction(null));
        yield put(createBoardSetHighlightedNumber(null));
      }
    }
  } else if (!isActionable && number != 0) {
    yield put(createBoardSetActivePieceAction(null));
  }
}

export function* validateBoard(board: Board): Generator {
  const response = (yield call(makeRequest, 'validate-board', { board: transformClientToServerSudokuBoard(board) })) as ServerBoardValidationResponse;

  yield put(createBoardSetValidationStatusAction(response.status));
}

export function* checkBoard(): Generator {
  const currentBoard = (yield select(selectBoard)) as Board;
  const solvedBoard = (yield select(selectSolutionBoard)) as Board;

  const checkedBoard = currentBoard.map((currentPiece, index) => {
    return {
      ...currentPiece,
      isWrong: currentPiece.number != 0 && currentPiece.number != solvedBoard[index].number
    }
  })

  yield put(createBoardSetActivePieceAction(null));

  yield put(createBoardSetAction(checkedBoard));
}

export function* moveActivePieceInDirection(action: BoardMoveInDirectionAction): Generator {
  const currentBoard = (yield select(selectBoard)) as Board;
  const currentCursorIndex = (yield select(selectCurrentCursorIndex)) as number;

  let newIndex = currentCursorIndex;
  if (currentCursorIndex != null && currentCursorIndex > -1) {
    switch (action.payload) {
      case Direction.UP:
        newIndex -= 9;
        if (newIndex < 0) {
          newIndex = 81 + newIndex;
        }
        break;

      case Direction.DOWN:
        newIndex += 9;
        if (newIndex > 80) {
          newIndex = newIndex % 9;
        }
        break;

      case Direction.LEFT:
        newIndex -= 1;
        if (newIndex < 0) {
          newIndex = 80;
        }
        break;

      case Direction.RIGHT:
        newIndex += 1;
        if (newIndex > 80) {
          newIndex = 0;
        }
        break;

      default:
        return;
    }
  } else {
    newIndex = 0;
  }

  yield put(createBoardSetCursorIndexAction(newIndex));

  const isHighlighted = currentBoard[newIndex]?.isHighlighted;
  const number = currentBoard[newIndex]?.number;

  if (!isHighlighted && number !== 0) {
    yield put(createBoardSetHighlightedNumber(number))
  } else if (!isHighlighted && number === 0) {
    yield put(createBoardSetHighlightedNumber(null))
  }
  yield (put(createBoardSelectPieceAction(newIndex)));
}

export function* setUserPressed(action: BoardSetUserPressedAction) {
  const isPencilMode = (yield select(selectIsPencilMode)) as boolean;
  switch (action.payload) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
      isPencilMode
        ? yield put(createPencilMarkingSetAction(action.payload))
        : yield put(createBoardSetPaintNumberAction(action.payload))
      break

    default:
      break
  }
}