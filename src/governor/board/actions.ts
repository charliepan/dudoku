import { Action } from "redux";
import { Direction } from "../../governor/models/board";
import { Board, Difficulty } from "../../models/client/board";
import { ServerBoardValidationStatus } from "../../models/server/board";

export enum BoardActions {
  FETCH_BOARD = 'BOARD/FETCH_BOARD',
  RESET_BOARD = 'BOARD/RESET_BOARD',
  SET_DIFFICULTY = 'BOARD/SET_DIFFICULTY',
  LOAD_BOARD_AND_NAVIGATE = 'BOARD/LOAD_BOARD_AND_NAVIGATE',
  SET_BOARD = 'BOARD/SET_BOARD',

  SELECT_PIECE = 'BOARD/SELECT_PIECE',
  SET_ACTIVE_PIECE = 'BOARD/SET_ACTIVE_PIECE',
  SET_PAINT_NUMBER = 'BOARD/SET_PAINT_NUMBER',
  SET_ACTIVE_PAINT_NUMBER = 'BOARD/SET_ACTIVE_PAINT_NUMBER',
  SET_USER_PRESSED = 'BOARD/SET_USER_PRESSED',

  SET_VALIDATION_STATUS = 'BOARD/SET_VALIDATION_STATUS',
  CHECK_BOARD = 'BOARD/CHECK_BOARD',
  SET_SOLUTION_BOARD = 'BOARD/SET_SOLUTION_BOARD',

  HIGHLIGHT_ALL_MATCHING_PIECES = 'BOARD/HIGHLIGHT_ALL_MATCHING_PIECES',
  SET_HIGHLIGHTED_NUMBER = 'BOARD/SET_HIGHLIGHTED_NUMBER',

  MOVE_IN_DIRECTION = 'BOARD/MOVE_IN_DIRECTION',
  SET_CURSOR_INDEX = 'BOARD/SET_CURSOR_INDEX'
}

export interface BoardFetchAction extends Action {
  type: BoardActions.FETCH_BOARD
}

export interface BoardSetAction extends Action {
  type: BoardActions.SET_BOARD
  payload: Board
}

export interface BoardSelectPieceAction extends Action {
  type: BoardActions.SELECT_PIECE
  payload: number
}

export interface BoardSetActivePieceAction extends Action {
  type: BoardActions.SET_ACTIVE_PIECE
  payload: number
}

export interface BoardSetPaintNumberAction extends Action {
  type: BoardActions.SET_PAINT_NUMBER
  payload: number
}

export interface BoardSetValidationStatusAction extends Action {
  type: BoardActions.SET_VALIDATION_STATUS
  payload: ServerBoardValidationStatus
}

export interface BoardCheckBoardAction extends Action {
  type: BoardActions.CHECK_BOARD
}

export interface BoardSetSolutionBoardAction extends Action {
  type: BoardActions.SET_SOLUTION_BOARD
  payload: Board
}

export interface BoardHighlightAllMatchingPiecesAction extends Action {
  type: BoardActions.HIGHLIGHT_ALL_MATCHING_PIECES
  payload: number
}

export interface BoardSetHighlightedNumber extends Action {
  type: BoardActions.SET_HIGHLIGHTED_NUMBER,
  payload: number
}

export interface BoardMoveInDirectionAction extends Action {
  type: BoardActions.MOVE_IN_DIRECTION,
  payload: Direction
}

export interface BoardSetCursorIndexAction extends Action {
  type: BoardActions.SET_CURSOR_INDEX,
  payload: number
}

export interface BoardSetUserPressedAction extends Action {
  type: BoardActions.SET_USER_PRESSED,
  payload: number
}

export interface BoardSetActivePaintNumberAction extends Action {
  type: BoardActions.SET_ACTIVE_PAINT_NUMBER,
  payload: number
}

export interface BoardLoadBoardAndNavigateAction extends Action {
  type: BoardActions.LOAD_BOARD_AND_NAVIGATE
}

export interface BoardSetDifficultyAction extends Action {
  type: BoardActions.SET_DIFFICULTY,
  payload: Difficulty
}

export interface BoardResetBoardAction extends Action {
  type: BoardActions.RESET_BOARD
}

export function createBoardFetchAction(): BoardFetchAction {
  return {
    type: BoardActions.FETCH_BOARD,
  }
}

export function createBoardSetAction(board: Board): BoardSetAction {
  return {
    type: BoardActions.SET_BOARD,
    payload: board
  }
}

export function createBoardSelectPieceAction(index: number): BoardSelectPieceAction {
  return {
    type: BoardActions.SELECT_PIECE,
    payload: index
  }
}

export function createBoardSetActivePieceAction(index: number): BoardSetActivePieceAction {
  return {
    type: BoardActions.SET_ACTIVE_PIECE,
    payload: index
  }
}

export function createBoardSetPaintNumberAction(number: number): BoardSetPaintNumberAction {
  return {
    type: BoardActions.SET_PAINT_NUMBER,
    payload: number
  }
}

export function createBoardSetValidationStatusAction(status: ServerBoardValidationStatus): BoardSetValidationStatusAction {
  return {
    type: BoardActions.SET_VALIDATION_STATUS,
    payload: status
  }
}

export function createBoardCheckBoardAction(): BoardCheckBoardAction {
  return {
    type: BoardActions.CHECK_BOARD
  }
}

export function createBoardSetSolutionBoardAction(board: Board): BoardSetSolutionBoardAction {
  return {
    type: BoardActions.SET_SOLUTION_BOARD,
    payload: board
  }
}

export function createBoardHighlightAllMatchingPiecesAction(number: number): BoardHighlightAllMatchingPiecesAction {
  return {
    type: BoardActions.HIGHLIGHT_ALL_MATCHING_PIECES,
    payload: number
  }
}

export function createBoardSetHighlightedNumber(number: number): BoardSetHighlightedNumber {
  return {
    type: BoardActions.SET_HIGHLIGHTED_NUMBER,
    payload: number
  }
}

export function createBoardMoveInDirectionAction(direction: Direction): BoardMoveInDirectionAction {
  return {
    type: BoardActions.MOVE_IN_DIRECTION,
    payload: direction
  }
}

export function createBoardSetCursorIndexAction(index: number): BoardSetCursorIndexAction {
  return {
    type: BoardActions.SET_CURSOR_INDEX,
    payload: index
  }
}

export function createBoardSetUserPressedAction(number: number): BoardSetUserPressedAction {
  return {
    type: BoardActions.SET_USER_PRESSED,
    payload: number
  }
}

export function createBoardSetActivePaintNumber(number: number): BoardSetActivePaintNumberAction {
  return {
    type: BoardActions.SET_ACTIVE_PAINT_NUMBER,
    payload: number
  }
}

export function createBoardLoadBoardAndNavigateAction(): BoardLoadBoardAndNavigateAction {
  return {
    type: BoardActions.LOAD_BOARD_AND_NAVIGATE
  }
}

export function createBoardSetDifficultyAction(difficulty: Difficulty): BoardSetDifficultyAction {
  return {
    type: BoardActions.SET_DIFFICULTY,
    payload: difficulty
  }
}

export function createBoardResetBoardAction(): BoardResetBoardAction {
  return {
    type: BoardActions.RESET_BOARD
  }
}