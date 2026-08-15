export interface TimeBlock { startMinutes: number; endMinutes: number; }

export function getFreeTimeBlocks(
  fixedBlocks: TimeBlock[],
  dayStart = 360,
  dayEnd = 1260,
): TimeBlock[] {
  const normalized = fixedBlocks
    .map((block) => ({ startMinutes: Math.max(dayStart, block.startMinutes), endMinutes: Math.min(dayEnd, block.endMinutes) }))
    .filter((block) => block.endMinutes > block.startMinutes)
    .sort((a, b) => a.startMinutes - b.startMinutes)
    .reduce<TimeBlock[]>((merged, block) => {
      const previous = merged.at(-1);
      if (previous && block.startMinutes <= previous.endMinutes) {
        previous.endMinutes = Math.max(previous.endMinutes, block.endMinutes);
      } else {
        merged.push({ ...block });
      }
      return merged;
    }, []);

  const freeBlocks: TimeBlock[] = [];
  let cursor = dayStart;
  for (const block of normalized) {
    if (block.startMinutes > cursor) freeBlocks.push({ startMinutes: cursor, endMinutes: block.startMinutes });
    cursor = Math.max(cursor, block.endMinutes);
  }
  if (cursor < dayEnd) freeBlocks.push({ startMinutes: cursor, endMinutes: dayEnd });
  return freeBlocks;
}
