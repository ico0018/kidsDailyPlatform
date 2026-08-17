import { describe, expect, it } from "vitest";
import { awardTaskPointsOnce, pointBalance } from "@/lib/points/point-ledger";
import type { PointTransaction } from "@/types/domain";

const award: PointTransaction = { id: "award-1", childId: "nora", type: "TASK_COMPLETION", points: 10, sourceId: "scheduled-raz", createdAt: "2026-08-17T12:00:00.000Z" };

describe("point ledger", () => {
  it("adds a completion award to the visible balance", () => {
    const transactions = awardTaskPointsOnce([], award);
    expect(pointBalance(235, transactions)).toBe(245);
  });

  it("does not award the same scheduled task twice", () => {
    expect(awardTaskPointsOnce([award], { ...award, id: "award-2", points: 50 })).toEqual([award]);
  });
});
