import { SNAP_MINUTES } from "@/lib/timeline/geometry";
export const TASK_POOL_UNIT_WIDTH = 28;
export function durationToTaskPoolWidth(durationMinutes: number, unitWidth = TASK_POOL_UNIT_WIDTH): number { return Number.isFinite(durationMinutes) && durationMinutes > 0 && Number.isFinite(unitWidth) && unitWidth > 0 ? (durationMinutes / SNAP_MINUTES) * unitWidth : 0; }
export function getDurationSegmentCount(durationMinutes: number): number { return Math.max(0, Math.floor(durationMinutes / SNAP_MINUTES)); }
