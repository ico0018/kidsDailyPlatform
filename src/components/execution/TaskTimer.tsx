"use client";

import { useEffect, useState } from "react";

export function TaskTimer({ minutes, disabled }: { minutes: number; disabled: boolean }) {
  const [remaining, setRemaining] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => { if (!running || remaining === 0) return; const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, [remaining, running]);
  const display = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  return <div className="rounded-2xl bg-[#f5f0ff] p-5 text-center"><p className="text-5xl font-black tabular-nums text-[#533f76]">{display}</p><button type="button" disabled={disabled || remaining === 0} onClick={() => setRunning((value) => !value)} className="mt-4 rounded-full bg-[#725b9b] px-6 py-3 font-bold text-white disabled:opacity-50">{running ? "Pause" : "Start timer"}</button><button type="button" disabled={disabled} onClick={() => { setRunning(false); setRemaining(minutes * 60); }} className="ml-3 font-bold text-[#725b9b] disabled:opacity-50">Reset</button></div>;
}
