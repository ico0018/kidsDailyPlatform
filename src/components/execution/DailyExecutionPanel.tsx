"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { LivePlanStrip } from "@/components/execution/LivePlanStrip";
import { TaskTimer } from "@/components/execution/TaskTimer";
import { loadCompletionLedger, saveCompletionLedger } from "@/data/repositories/execution-repository";
import { loadPointTransactions, savePointTransactions } from "@/data/repositories/points-repository";
import { loadScheduledTasks } from "@/data/repositories/schedule-repository";
import { completeOnce, isCompleted, type CompletionLedgerEntry } from "@/lib/execution/task-execution";
import { executionTasksForPlan } from "@/lib/execution/execution-tasks";
import { formatLocalDate } from "@/lib/date/local-date";
import { awardTaskPointsOnce, pointBalance } from "@/lib/points/point-ledger";
import type { ScheduledTask } from "@/lib/scheduling/placement";
import type { PointTransaction, TaskTemplate } from "@/types/domain";

function readPhoto(event: ChangeEvent<HTMLInputElement>, onRead: (dataUrl: string) => void): void {
  const photo = event.target.files?.[0];
  if (!photo) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => { if (typeof reader.result === "string") onRead(reader.result); });
  reader.readAsDataURL(photo);
}

export function DailyExecutionPanel({ date, childId, templates, startingPoints }: { date: Date; childId: string; templates: TaskTemplate[]; startingPoints: number }) {
  const dateKey = formatLocalDate(date);
  const [scheduled, setScheduled] = useState<ScheduledTask[]>([]);
  const [ledger, setLedger] = useState<CompletionLedgerEntry[]>([]);
  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | undefined>();
  const [wrongAnswers, setWrongAnswers] = useState(0);
  useEffect(() => { queueMicrotask(() => { const tasks = loadScheduledTasks(childId, dateKey); setScheduled(tasks); setLedger(loadCompletionLedger(childId, dateKey)); setPointTransactions(loadPointTransactions(childId)); setSelectedId(tasks[0]?.id ?? null); }); }, [childId, dateKey]);
  const tasks = useMemo(() => executionTasksForPlan(scheduled, templates), [scheduled, templates]);
  const selected = tasks.find((task) => task.scheduledTaskId === selectedId) ?? null;
  const completed = selected ? isCompleted(ledger, selected.scheduledTaskId) : false;
  const choose = (id: string) => { setSelectedId(id); setPhoto(undefined); setWrongAnswers(0); };
  const finish = () => {
    if (!selected || completed || (selected.requiresPhoto && !photo)) return;
    const entry: CompletionLedgerEntry = { id: `${selected.scheduledTaskId}:${Date.now()}`, scheduledTaskId: selected.scheduledTaskId, points: selected.points, completedAt: new Date().toISOString(), photoDataUrl: photo, wrongAnswerCount: selected.recordsWrongAnswers ? wrongAnswers : undefined };
    const next = completeOnce(ledger, entry); setLedger(next); saveCompletionLedger(childId, dateKey, next);
    const award: PointTransaction = { id: `task-award:${selected.scheduledTaskId}`, childId, type: "TASK_COMPLETION", points: selected.points, sourceId: selected.scheduledTaskId, createdAt: entry.completedAt };
    const nextTransactions = awardTaskPointsOnce(pointTransactions, award); setPointTransactions(nextTransactions); savePointTransactions(childId, nextTransactions);
  };
  const balance = pointBalance(startingPoints, pointTransactions);
  return <main className="min-h-screen bg-[#fff7ed] px-3 py-6 text-slate-800 sm:px-8 sm:py-10"><div className="mx-auto max-w-6xl rounded-[32px] border border-[#f0dfcd] bg-[#fffdf9] p-5 shadow-[0_18px_50px_rgba(130,94,65,0.12)] sm:p-8"><header className="mb-6 flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#9a765e]">Daily mission</p><h1 className="text-3xl font-black">Let&apos;s do today&apos;s plan!</h1></div><p aria-label={`${balance} points`} className="rounded-full bg-amber-100 px-4 py-2 font-black text-amber-900">⭐ {balance}</p></header><LivePlanStrip scheduledTasks={scheduled} templates={templates} selectedId={selectedId} onSelect={choose} />
  {tasks.length === 0 ? <p className="mt-8 rounded-2xl bg-[#fff4e8] p-6 text-center font-semibold">Plan some task blocks first, then come back here to start your day. 🌤️</p> : <div className="mt-6 grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]"><nav aria-label="Task tabs" className="flex gap-2 overflow-x-auto md:flex-col">{tasks.map((task) => <button type="button" key={task.scheduledTaskId} onClick={() => choose(task.scheduledTaskId)} className={`min-w-40 rounded-2xl border p-3 text-left font-bold ${task.scheduledTaskId === selectedId ? "border-indigo-400 bg-indigo-50 text-indigo-950" : "border-[#eadfce] bg-white"}`}><span>{task.icon} {task.name}</span>{isCompleted(ledger, task.scheduledTaskId) && <span className="float-right">✓</span>}</button>)}</nav>
  {selected && <section className="rounded-3xl border border-[#eadfce] bg-white p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="text-2xl font-black">{selected.icon} {selected.name}</h2><p className="mt-1 text-slate-500">Earn ⭐ {selected.points}</p></div>{completed && <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">Completed</span>}</div>{selected.mode === "EMBED" && selected.embedUrl ? <iframe className="mt-5 h-[360px] w-full rounded-2xl border border-slate-200" src={selected.embedUrl} title={`${selected.name} lesson`} /> : <div className="mt-5"><TaskTimer minutes={selected.durationMinutes} disabled={completed} /></div>}{selected.recordsWrongAnswers && <label className="mt-5 block font-bold">Wrong answers<input type="number" min="0" value={wrongAnswers} onChange={(event) => setWrongAnswers(Math.max(0, Number(event.target.value)))} disabled={completed} className="ml-3 w-20 rounded-lg border p-2" /></label>}{selected.requiresPhoto && !completed && <div className="mt-5 rounded-2xl bg-[#fff5ed] p-4"><p className="font-bold">Photo check-in required</p><label className="mt-2 inline-block cursor-pointer rounded-full bg-[#d98762] px-4 py-2 font-bold text-white">Take / upload photo<input className="sr-only" type="file" accept="image/*" capture="environment" onChange={(event) => readPhoto(event, setPhoto)} /></label>{photo && <img className="mt-3 max-h-44 rounded-xl" src={photo} alt="Task check-in preview" />}</div>}<button type="button" disabled={completed || (selected.requiresPhoto && !photo)} onClick={finish} className="mt-6 rounded-full bg-[#2f8b72] px-6 py-3 font-extrabold text-white disabled:opacity-50">{completed ? "Points awarded" : selected.requiresPhoto && !photo ? "Add photo to complete" : "Mark complete + earn points"}</button></section>}</div>}</div></main>;
}
