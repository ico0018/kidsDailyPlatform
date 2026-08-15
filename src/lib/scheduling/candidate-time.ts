import { snapMinutes } from "@/lib/scheduling/placement";
import { yToMinutes } from "@/lib/timeline/geometry";

export function getTimelineRelativeY({
  draggedClientTop,
  timelineClientTop,
  timelineScrollTop = 0,
  visualViewportOffsetTop = 0,
}: {
  draggedClientTop: number;
  timelineClientTop: number;
  timelineScrollTop?: number;
  visualViewportOffsetTop?: number;
}): number {
  // Both DOMRects are CSS-pixel coordinates in the same visual viewport. Normalize
  // both endpoints with the current viewport offset before taking their difference.
  // Viewport scale intentionally is not applied: timeline geometry is also CSS pixels.
  return (draggedClientTop + visualViewportOffsetTop)
    - (timelineClientTop + visualViewportOffsetTop)
    + timelineScrollTop;
}

export function getScheduledTaskCandidateStart(
  translatedTop: number,
  timelineTop: number,
  pixelsPerMinute: number,
  coordinateOptions?: {
    timelineScrollTop?: number;
    visualViewportOffsetTop?: number;
  },
): number {
  return snapMinutes(yToMinutes(getTimelineRelativeY({
    draggedClientTop: translatedTop,
    timelineClientTop: timelineTop,
    ...coordinateOptions,
  }), pixelsPerMinute));
}
