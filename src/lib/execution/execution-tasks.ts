import type { ScheduledTask } from "@/lib/scheduling/placement";
import type { TaskTemplate } from "@/types/domain";
import type { ExecutionTask } from "@/lib/execution/task-execution";

const embeddedLessons: Record<string, string> = {
  "task-chinese-vocab": "https://www.bing.com/search?q=%E8%AF%AD%E6%96%87%E5%AD%97%E8%AF%8D%E5%AD%A6%E4%B9%A0",
  "task-chinese-poem": "https://www.bing.com/search?q=%E5%8F%A4%E8%AF%97%E5%AD%A6%E4%B9%A0",
};

export function toExecutionTask(scheduled: ScheduledTask, template: TaskTemplate): ExecutionTask {
  const embedUrl = template.url ?? embeddedLessons[template.id];
  const isRaz = template.id === "task-raz-1-book";
  return {
    id: template.id,
    scheduledTaskId: scheduled.id,
    name: template.name,
    icon: template.icon,
    points: template.points,
    durationMinutes: scheduled.durationMinutes,
    mode: embedUrl ? "EMBED" : "TIMER",
    requiresPhoto: template.taskType === "OFFLINE" && !embedUrl,
    embedUrl,
    recordsWrongAnswers: isRaz,
  };
}

export function executionTasksForPlan(scheduled: ScheduledTask[], templates: TaskTemplate[]): ExecutionTask[] {
  return scheduled
    .map((item) => {
      const template = templates.find((candidate) => candidate.id === item.taskTemplateId);
      return template ? toExecutionTask(item, template) : null;
    })
    .filter((item): item is ExecutionTask => item !== null)
    .sort((a, b) => a.scheduledTaskId.localeCompare(b.scheduledTaskId));
}
