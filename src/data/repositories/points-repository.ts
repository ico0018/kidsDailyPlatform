import type { PointTransaction } from "@/types/domain";

const prefix = "kids-daily-planner:points:";

function isTransaction(value: unknown): value is PointTransaction {
  return typeof value === "object" && value !== null && "id" in value && "childId" in value
    && "type" in value && "points" in value && "sourceId" in value && "createdAt" in value;
}

export function loadPointTransactions(childId: string): PointTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(`${prefix}${childId}`) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(isTransaction) : [];
  } catch { return []; }
}

export function savePointTransactions(childId: string, transactions: PointTransaction[]): void {
  window.localStorage.setItem(`${prefix}${childId}`, JSON.stringify(transactions));
}
