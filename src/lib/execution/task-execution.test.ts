import { describe, expect, it } from "vitest";
import { completeOnce, isCompleted, type CompletionLedgerEntry } from "@/lib/execution/task-execution";

const entry: CompletionLedgerEntry = { id: "ledger-1", scheduledTaskId: "scheduled-1", points: 10, completedAt: "2026-08-17T12:00:00.000Z" };

describe("task execution completion", () => {
  it("adds the first completion and recognizes it", () => {
    const result = completeOnce([], entry);
    expect(result).toEqual([entry]);
    expect(isCompleted(result, "scheduled-1")).toBe(true);
  });

  it("never adds points twice for the same scheduled task", () => {
    expect(completeOnce([entry], { ...entry, id: "ledger-2", points: 100 })).toEqual([entry]);
  });
});
