import Decimal from "decimal.js";

function differenceInMilliseconds(laterDate: Date, earlierDate: Date): Decimal {
  return Decimal(+laterDate - +earlierDate);
}

export function milliseconds(end: Date, start: Date): Decimal {
  return differenceInMilliseconds(end, start);
}
