import { describe, expect, it } from "vitest";
import { durationToHeight, minutesToY, yToMinutes } from "@/lib/timeline/geometry";

describe("daily timeline geometry", () => {
  const pixelsPerMinute = 1.1;
  it("maps the daily boundaries and key times precisely", () => {
    expect(minutesToY(360, pixelsPerMinute)).toBe(0);
    expect(minutesToY(480, pixelsPerMinute)).toBeCloseTo(132);
    expect(minutesToY(720, pixelsPerMinute)).toBeCloseTo(396);
    expect(minutesToY(1260, pixelsPerMinute)).toBeCloseTo(990);
  });
  it("converts coordinates back to minutes", () => expect(yToMinutes(132, pixelsPerMinute)).toBeCloseTo(480));
  it("keeps duration proportional", () => expect(durationToHeight(30, pixelsPerMinute)).toBeCloseTo(33));
});
