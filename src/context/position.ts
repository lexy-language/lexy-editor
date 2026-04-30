export interface Range {
  readonly start: Position,
  readonly end: Position
}

export interface Position {
  lineNumber: number;
  column: number;
}

export function newPosition(lineNumber: number, column: number) {
  return {
    lineNumber: lineNumber,
    column: column
  }
}

export function positionEquals(first: Position, second: Position) {
  return first && second && first.column == second.column && first.lineNumber == second.lineNumber;
}
