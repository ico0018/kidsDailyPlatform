import type { PointTransaction } from "@/types/domain";

export function awardTaskPointsOnce(transactions: PointTransaction[], transaction: PointTransaction): PointTransaction[] {
  return transactions.some((item) => item.type === "TASK_COMPLETION" && item.sourceId === transaction.sourceId)
    ? transactions
    : [...transactions, transaction];
}

export function pointBalance(startingPoints: number, transactions: PointTransaction[]): number {
  return startingPoints + transactions.reduce((total, transaction) => total + transaction.points, 0);
}
