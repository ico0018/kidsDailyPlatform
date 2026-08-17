import Link from "next/link";
import { DailyExecutionPanel } from "@/components/execution/DailyExecutionPanel";
import { demoChild, demoTasks } from "@/data/seed/demo-data";
import { parseLocalDate } from "@/lib/date/local-date";

export default async function ExecuteDayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date: dateValue } = await params;
  const date = parseLocalDate(dateValue);
  if (!date) return <main className="grid min-h-screen place-items-center"><Link href="/">Back to My Week</Link></main>;
  return <DailyExecutionPanel date={date} childId={demoChild.id} templates={demoTasks} startingPoints={demoChild.totalPoints} />;
}
