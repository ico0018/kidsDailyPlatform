import { describe, expect, it } from "vitest";
import { getScheduledTaskCandidateStart, getTimelineRelativeY } from "@/lib/scheduling/candidate-time";
import { DAILY_PIXELS_PER_MINUTE, minutesToY } from "@/lib/timeline/geometry";
describe("scheduled candidate time", () => { it("uses the moved task top with the daily scale", () => { const top = 1000; expect(getScheduledTaskCandidateStart(top + minutesToY(395, DAILY_PIXELS_PER_MINUTE), top, DAILY_PIXELS_PER_MINUTE)).toBe(395); expect(getScheduledTaskCandidateStart(top + minutesToY(400, DAILY_PIXELS_PER_MINUTE), top, DAILY_PIXELS_PER_MINUTE)).toBe(400); expect(getScheduledTaskCandidateStart(top + minutesToY(410, DAILY_PIXELS_PER_MINUTE), top, DAILY_PIXELS_PER_MINUTE)).toBe(410); expect(getScheduledTaskCandidateStart(top + minutesToY(380, DAILY_PIXELS_PER_MINUTE), top, DAILY_PIXELS_PER_MINUTE)).toBe(380); }); });

describe("timeline coordinate normalization", () => {
  it("keeps two visual-viewport DOMRect coordinates in one local timeline space", () => {
    expect(getTimelineRelativeY({
      draggedClientTop: 450,
      timelineClientTop: 100,
      visualViewportOffsetTop: 250,
    })).toBe(350);
  });

  it("includes a nested timeline scroll offset without mixing page scroll coordinates", () => {
    expect(getTimelineRelativeY({
      draggedClientTop: 450,
      timelineClientTop: 100,
      timelineScrollTop: 80,
      visualViewportOffsetTop: 250,
    })).toBe(430);
  });
});
