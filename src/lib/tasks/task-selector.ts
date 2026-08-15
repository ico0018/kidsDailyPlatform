import { formatLocalDate } from "@/lib/date/local-date";
import type { TaskAssignment, TaskTemplate } from "@/types/domain";
export interface TodaysTask extends TaskTemplate { dailyTaskId: string; assignmentId: string; }
export function getTasksForDate(childId: string, date: Date, templates: TaskTemplate[], assignments: TaskAssignment[]): TodaysTask[] {
  const templatesById = new Map(templates.map((template) => [template.id, template])); const seen = new Set<string>(); const key = formatLocalDate(date);
  return assignments.filter((assignment) => assignment.childId === childId && assignment.weekdays.includes(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6)).flatMap((assignment) => { const task = templatesById.get(assignment.taskTemplateId); if (!task || !task.active || seen.has(task.id)) return []; seen.add(task.id); return [{ ...task, assignmentId: assignment.id, dailyTaskId: `${assignment.id}__${key}` }]; });
}
export function getTotalTaskDuration(tasks: Pick<TaskTemplate, "durationMinutes">[]): number { return tasks.reduce((total, task) => total + task.durationMinutes, 0); }
export function formatDuration(minutes: number): string { if (minutes < 60) return `${minutes} min`; const hours = Math.floor(minutes / 60); const remaining = minutes % 60; return remaining === 0 ? `${hours} hr` : `${hours} hr ${remaining} min`; }
