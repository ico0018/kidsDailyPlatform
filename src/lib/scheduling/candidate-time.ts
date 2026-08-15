import { snapMinutes } from "@/lib/scheduling/placement";
import { yToMinutes } from "@/lib/timeline/geometry";
export function getScheduledTaskCandidateStart(translatedTop: number, timelineTop: number, pixelsPerMinute: number): number { return snapMinutes(yToMinutes(translatedTop - timelineTop, pixelsPerMinute)); }
