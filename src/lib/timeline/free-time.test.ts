import { describe, expect, it } from "vitest";
import { getFreeTimeBlocks } from "@/lib/timeline/free-time";

describe("getFreeTimeBlocks", () => {
  it("derives Monday's free periods from its fixed schedule", () => {
    expect(getFreeTimeBlocks([
      { startMinutes: 480, endMinutes: 720 },
      { startMinutes: 720, endMinutes: 765 },
      { startMinutes: 840, endMinutes: 1020 },
    ])).toEqual([
      { startMinutes: 360, endMinutes: 480 },
      { startMinutes: 765, endMinutes: 840 },
      { startMinutes: 1020, endMinutes: 1260 },
    ]);
  });

  it("returns the entire day when there are no fixed blocks", () => {
    expect(getFreeTimeBlocks([])).toEqual([{ startMinutes: 360, endMinutes: 1260 }]);
  });

  it("does not create a zero-length gap between adjacent blocks", () => {
    expect(getFreeTimeBlocks([{ startMinutes: 480, endMinutes: 600 }, { startMinutes: 600, endMinutes: 720 }])).toEqual([
      { startMinutes: 360, endMinutes: 480 },
      { startMinutes: 720, endMinutes: 1260 },
    ]);
  });

  it("normalizes overlapping fixed data without negative free periods", () => {
    expect(getFreeTimeBlocks([{ startMinutes: 480, endMinutes: 720 }, { startMinutes: 600, endMinutes: 840 }])).toEqual([
      { startMinutes: 360, endMinutes: 480 },
      { startMinutes: 840, endMinutes: 1260 },
    ]);
  });
});
