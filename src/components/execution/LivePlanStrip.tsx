"use client";

import { useEffect, useState } from "react";
import type { ScheduledTask } from "@/lib/scheduling/placement";
import { DAY_DURATION_MINUTES, DAY_START_MINUTES, minutesToPercent } from "@/lib/timeline/geometry";
import type { TaskTemplate } from "@/types/domain";

function localMinutes(): number { const now = new Date(); return now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60; }

export function LivePlanStrip({ scheduledTasks, templates, selectedId, onSelect }: { scheduledTasks: ScheduledTask[]; templates: TaskTemplate[]; selectedId: string | null; onSelect: (scheduledTaskId: string) => void }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { const update = () => setNow(localMinutes()); update(); const interval = window.setInterval(update, 1000); return () => window.clearInterval(interval); }, []);
  const visibleNow = now !== null && now >= DAY_START_MINUTES && now <= DAY_START_MINUTES + DAY_DURATION_MINUTES;
  return <section aria-label="Today's time plan" className="rounded-3xl border border-[#dbe7f2] bg-[#f8fbff] p-4 shadow-sm"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-extrabold">Today&apos;s plan</h2><span className="text-sm font-semibold text-slate-500">Live time</span></div><div className="relative h-28 overflow-hidden rounded-2xl border border-[#cfe0ef] bg-white" role="list">
    {[0, 25, 50, 75, 100].map((position) => <span key={position} aria-hidden="true" className="absolute inset-y-0 border-l border-slate-100" style={{ left: `${position}%` }} />)}
    {scheduledTasks.map((item) => { const task = templates.find((template) => template.id === item.taskTemplateId); const selected = selectedId === item.id; return <button key={item.id} type="button" role="listitem" onClick={() => onSelect(item.id)} className={`absolute top-8 z-10 h-12 overflow-hidden rounded-xl border px-2 text-left text-xs font-bold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${selected ? "border-indigo-500 bg-indigo-100 text-indigo-950" : "border-[#a8c6dc] bg-[#e8f4ff] text-[#365a74]"}`} style={{ left: `${Math.max(0, minutesToPercent(item.startMinutes))}%`, width: `${Math.max(4, (item.durationMinutes / DAY_DURATION_MINUTES) * 100)}%` }}><span className="whitespace-nowrap">{task?.icon} {task?.name}</span></button>; })}
    {visibleNow && <div aria-label="Current time" className="absolute inset-y-0 z-20 w-0.5 bg-rose-500" style={{ left: `${minutesToPercent(now)}%` }}><span className="absolute -left-1.5 -top-0.5 size-3 rounded-full bg-rose-500" /></div>}
    <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-slate-400">6 AM</span><span className="absolute bottom-2 right-2 text-[10px] font-semibold text-slate-400">9 PM</span>
  </div></section>;
}
