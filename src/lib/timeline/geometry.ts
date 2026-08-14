export const DAY_START_MINUTES = 6 * 60;
export const DAY_END_MINUTES = 21 * 60;
export const DAY_DURATION_MINUTES = DAY_END_MINUTES - DAY_START_MINUTES;
export const SNAP_MINUTES = 5;

export function minutesToPercent(minutes: number): number {
  return ((minutes - DAY_START_MINUTES) / DAY_DURATION_MINUTES) * 100;
}

export function durationToPercent(startMinutes: number, endMinutes: number): number {
  return ((endMinutes - startMinutes) / DAY_DURATION_MINUTES) * 100;
}

export function minutesToY(minutes: number, pixelsPerMinute: number): number {
  return (minutes - DAY_START_MINUTES) * pixelsPerMinute;
}

export function yToMinutes(y: number, pixelsPerMinute: number): number {
  return DAY_START_MINUTES + y / pixelsPerMinute;
}

export function durationToHeight(durationMinutes: number, pixelsPerMinute: number): number {
  return durationMinutes * pixelsPerMinute;
}
