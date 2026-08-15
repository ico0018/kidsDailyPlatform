import type { ScheduledTask } from "@/lib/scheduling/placement";
const prefix = "kids-daily-planner:schedule:";
function key(childId: string, localDate: string): string { return `${prefix}${childId}:${localDate}`; }
export function loadScheduledTasks(childId: string, localDate: string): ScheduledTask[] { if (typeof window === "undefined") return []; try { const parsed: unknown = JSON.parse(window.localStorage.getItem(key(childId, localDate)) ?? "[]"); return Array.isArray(parsed) ? parsed.filter((item): item is ScheduledTask => typeof item === "object" && item !== null && "id" in item && "startMinutes" in item && "durationMinutes" in item) : []; } catch { return []; } }
export function saveScheduledTasks(childId: string, localDate: string, tasks: ScheduledTask[]): void { window.localStorage.setItem(key(childId, localDate), JSON.stringify(tasks)); }
export function removeScheduledTask(tasks: ScheduledTask[], scheduledTaskId: string): ScheduledTask[] { return tasks.filter((task) => task.id !== scheduledTaskId); }
