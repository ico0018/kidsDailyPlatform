"use client";

import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { DailyTimeline } from "@/components/planner/DailyTimeline";
import {
  loadScheduledTasks,
  removeScheduledTask,
  saveScheduledTasks,
} from "@/data/repositories/schedule-repository";
import { formatLocalDate } from "@/lib/date/local-date";
import {
  createScheduledTask,
  getPoolTimelinePreview,
  type PoolTimelinePreview,
} from "@/lib/scheduling/pool-timeline-preview";
import type { ScheduledTask } from "@/lib/scheduling/placement";
import { getTasksForDate, type TodaysTask } from "@/lib/tasks/task-selector";
import { getRemainingTasks } from "@/lib/tasks/task-pool-state";
import { durationToTaskPoolWidth } from "@/lib/tasks/task-duration-geometry";
import { useDragScrollLock } from "@/lib/interaction/use-drag-scroll-lock";
import { DAILY_PIXELS_PER_MINUTE } from "@/lib/timeline/geometry";
import type { FixedSchedule, TaskAssignment, TaskTemplate } from "@/types/domain";

type ScheduledDrag = {
  type: "SCHEDULED_TASK";
  scheduledTaskId: string;
  dailyTaskId: string;
  taskTemplateId: string;
  durationMinutes: number;
  originalStartMinutes: number;
};

type DragSourceType = "SCHEDULED_TASK" | "UNSCHEDULED_TASK" | null;

function DraggableTask({ task }: { task: TodaysTask }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.dailyTaskId,
    data: { type: "UNSCHEDULED_TASK", task },
  });

  return (
    <article
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="touch-none cursor-grab rounded-2xl border border-[#d9c9ec] bg-[#f4effb] p-4 shadow-sm active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-3">
        <b>{task.icon} {task.name}</b>
        <span className="shrink-0 text-xs font-semibold text-[#725b83]">
          {task.durationMinutes} min · <span className="text-amber-600" aria-label={`${task.points} points`}>⭐ {task.points}</span>
        </span>
      </div>
      <div
        aria-label={`${task.durationMinutes} minute time brick`}
        className="mt-3 h-4 max-w-full rounded-full border border-[#b9a0d4] bg-[#d9c8ec] shadow-[inset_0_1px_1px_rgba(255,255,255,.65),0_2px_4px_rgba(98,63,130,.18)]"
        style={{ width: durationToTaskPoolWidth(task.durationMinutes) }}
      />
    </article>
  );
}

function TaskPool({
  remaining,
  activeSourceType,
}: {
  remaining: TodaysTask[];
  activeSourceType: DragSourceType;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "task-pool",
    data: { type: "TASK_POOL" },
  });
  const isScheduledTaskOverPool = activeSourceType === "SCHEDULED_TASK" && isOver;

  return (
    <aside
      ref={setNodeRef}
      className={`rounded-[28px] border p-5 transition ${
        isScheduledTaskOverPool
          ? "border-[#be9bd7] bg-[#f7f0fc] shadow-[0_12px_30px_rgba(136,93,170,.18)]"
          : "border-[#f0dfcd] bg-[#fffaf3]"
      }`}
    >
      <h2 className="text-2xl font-extrabold">Today&apos;s Tasks 🎒</h2>
      <p className="mt-2 text-sm">
        {remaining.length ? `${remaining.length} left to plan` : "🎀 All planned!"}
      </p>
      {isScheduledTaskOverPool && (
        <p className="mt-3 rounded-xl bg-white/70 px-3 py-2 text-sm font-bold text-[#74458f]">
          ← Move back to Tasks
        </p>
      )}
      <div className="mt-5 space-y-3">
        {remaining.map((task) => <DraggableTask key={task.dailyTaskId} task={task} />)}
      </div>
    </aside>
  );
}

export function SchedulingBoard({
  date,
  childId,
  schedules,
  templates,
  assignments,
}: {
  date: Date;
  childId: string;
  schedules: FixedSchedule[];
  templates: TaskTemplate[];
  assignments: TaskAssignment[];
}) {
  const key = formatLocalDate(date);
  const all = getTasksForDate(childId, date, templates, assignments);
  const [planned, setPlanned] = useState<ScheduledTask[]>([]);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [activeSourceType, setActiveSourceType] = useState<DragSourceType>(null);
  const [poolPreview, setPoolPreview] = useState<PoolTimelinePreview | null>(null);
  const [poolPreviewTask, setPoolPreviewTask] = useState<Pick<TaskTemplate, "icon" | "name"> | null>(null);
  const timelineTopRef = useRef<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  useDragScrollLock(activeSourceType !== null);

  useEffect(() => {
    queueMicrotask(() => setPlanned(loadScheduledTasks(childId, key)));
  }, [childId, key]);

  const save = (next: ScheduledTask[]) => {
    setPlanned(next);
    saveScheduledTasks(childId, key, next);
  };

  const clearDragState = () => {
    setOverlay(null);
    setActiveSourceType(null);
    setPoolPreview(null);
    setPoolPreviewTask(null);
    timelineTopRef.current = null;
  };

  const updateTimelinePreview = (active: DragOverEvent["active"], timelineTop: number) => {
    const source = active.data.current;
    const translatedTop = active.rect.current.translated?.top;
    if (translatedTop === null || translatedTop === undefined) {
      setPoolPreview(null);
      setPoolPreviewTask(null);
      return;
    }

    if (source?.type === "UNSCHEDULED_TASK") {
      const task = source.task as TodaysTask;
      setPoolPreview(getPoolTimelinePreview({
        translatedTop,
        timelineTop,
        durationMinutes: task.durationMinutes,
        pixelsPerMinute: DAILY_PIXELS_PER_MINUTE,
        fixedSchedules: schedules,
        scheduledTasks: planned,
      }));
      setPoolPreviewTask(task);
      return;
    }

    if (source?.type === "SCHEDULED_TASK") {
      const task = source as ScheduledDrag;
      setPoolPreview(getPoolTimelinePreview({
        translatedTop,
        timelineTop,
        durationMinutes: task.durationMinutes,
        pixelsPerMinute: DAILY_PIXELS_PER_MINUTE,
        fixedSchedules: schedules,
        scheduledTasks: planned,
        ignoreScheduledTaskId: task.scheduledTaskId,
      }));
      setPoolPreviewTask(templates.find((template) => template.id === task.taskTemplateId) ?? null);
      return;
    }

    setPoolPreview(null);
    setPoolPreviewTask(null);
  };

  const onDragOver = (event: DragOverEvent) => {
    if (event.over?.id !== "timeline") {
      timelineTopRef.current = null;
      setPoolPreview(null);
      setPoolPreviewTask(null);
      return;
    }

    timelineTopRef.current = event.over.rect.top;
    updateTimelinePreview(event.active, event.over.rect.top);
  };

  const onDragMove = (event: DragMoveEvent) => {
    if (timelineTopRef.current !== null) {
      updateTimelinePreview(event.active, timelineTopRef.current);
    }
  };

  const onEnd = (event: DragEndEvent) => {
    const source = event.active.data.current;
    if (!source) {
      clearDragState();
      return;
    }

    if (source.type === "SCHEDULED_TASK") {
      const drag = source as ScheduledDrag;

      if (event.over?.id === "task-pool") {
        save(removeScheduledTask(planned, drag.scheduledTaskId));
        clearDragState();
        return;
      }

      if (event.over?.id !== "timeline") {
        clearDragState();
        return;
      }

      const preview = getPoolTimelinePreview({
        translatedTop: event.active.rect.current.translated?.top ?? 0,
        timelineTop: event.over.rect.top,
        durationMinutes: drag.durationMinutes,
        pixelsPerMinute: DAILY_PIXELS_PER_MINUTE,
        fixedSchedules: schedules,
        scheduledTasks: planned,
        ignoreScheduledTaskId: drag.scheduledTaskId,
      });

      if (preview.result.valid && preview.startMinutes !== drag.originalStartMinutes) {
        save(planned.map((task) => (
          task.id === drag.scheduledTaskId ? { ...task, startMinutes: preview.startMinutes } : task
        )));
      }
      clearDragState();
      return;
    }

    if (event.over?.id !== "timeline") {
      clearDragState();
      return;
    }

    const task = source.task as TodaysTask;
    const preview = getPoolTimelinePreview({
      translatedTop: event.active.rect.current.translated?.top ?? 0,
      timelineTop: event.over.rect.top,
      durationMinutes: task.durationMinutes,
      pixelsPerMinute: DAILY_PIXELS_PER_MINUTE,
      fixedSchedules: schedules,
      scheduledTasks: planned,
    });

    if (preview.result.valid) {
      save([
        ...planned,
        createScheduledTask({
          dailyTaskId: task.dailyTaskId,
          taskTemplateId: task.id,
          startMinutes: preview.startMinutes,
          durationMinutes: task.durationMinutes,
        }),
      ]);
    }
    clearDragState();
  };

  const remaining = getRemainingTasks(all, planned);

  return (
    <DndContext
      id="daily-planner-dnd"
      sensors={sensors}
      onDragStart={(event) => {
        setOverlay(String(event.active.id));
        setPoolPreview(null);
        setPoolPreviewTask(null);
        setActiveSourceType(event.active.data.current?.type === "SCHEDULED_TASK"
          ? "SCHEDULED_TASK"
          : "UNSCHEDULED_TASK");
      }}
      onDragOver={onDragOver}
      onDragMove={onDragMove}
      onDragEnd={onEnd}
      onDragCancel={clearDragState}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(290px,.9fr)]">
        <DailyTimeline
          schedules={schedules}
          scheduledTasks={planned}
          templates={templates}
          poolPreview={poolPreview}
          poolPreviewTask={poolPreviewTask ?? undefined}
        />
        <TaskPool remaining={remaining} activeSourceType={activeSourceType} />
      </div>
      <DragOverlay>
        {overlay && <div className="rounded-2xl bg-white px-3 py-2 shadow-xl">Moving task</div>}
      </DragOverlay>
    </DndContext>
  );
}
