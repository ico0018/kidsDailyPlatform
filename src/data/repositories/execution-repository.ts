import type { CompletionLedgerEntry } from "@/lib/execution/task-execution";

const prefix = "kids-daily-planner:execution:";

function key(childId: string, localDate: string): string { return `${prefix}${childId}:${localDate}`; }

function isEntry(value: unknown): value is CompletionLedgerEntry {
  return typeof value === "object" && value !== null
    && "id" in value && "scheduledTaskId" in value && "points" in value && "completedAt" in value;
}

export function loadCompletionLedger(childId: string, localDate: string): CompletionLedgerEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(key(childId, localDate)) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(isEntry) : [];
  } catch { return []; }
}

export function saveCompletionLedger(childId: string, localDate: string, entries: CompletionLedgerEntry[]): void {
  window.localStorage.setItem(key(childId, localDate), JSON.stringify(entries));
}
