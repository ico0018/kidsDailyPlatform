export type ExecutionMode = "TIMER" | "EMBED";

export interface ExecutionTask {
  id: string;
  scheduledTaskId: string;
  name: string;
  icon: string;
  points: number;
  durationMinutes: number;
  mode: ExecutionMode;
  requiresPhoto: boolean;
  embedUrl?: string;
  recordsWrongAnswers: boolean;
}

export interface CompletionLedgerEntry {
  id: string;
  scheduledTaskId: string;
  points: number;
  completedAt: string;
  photoDataUrl?: string;
  wrongAnswerCount?: number;
}

export function completeOnce(entries: CompletionLedgerEntry[], entry: CompletionLedgerEntry): CompletionLedgerEntry[] {
  return entries.some((item) => item.scheduledTaskId === entry.scheduledTaskId) ? entries : [...entries, entry];
}

export function isCompleted(entries: CompletionLedgerEntry[], scheduledTaskId: string): boolean {
  return entries.some((entry) => entry.scheduledTaskId === scheduledTaskId);
}
