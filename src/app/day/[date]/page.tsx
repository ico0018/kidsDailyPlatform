import Link from "next/link";
import { DailyPlanner } from "@/components/planner/DailyPlanner";
import { demoAssignments, demoChild, demoFixedSchedules, demoTasks } from "@/data/seed/demo-data";
import { parseLocalDate } from "@/lib/date/local-date";

export default async function DayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date: dateValue } = await params;
  const date = parseLocalDate(dateValue);
  if (!date) return <main className="grid min-h-screen place-items-center bg-[#fff7ed] p-6 text-center"><section className="rounded-[28px] border border-[#f0dfcd] bg-[#fffdf9] p-10 shadow-sm"><p className="text-4xl">🌤️</p><h1 className="mt-4 text-3xl font-extrabold text-[#4d4239]">Oops! That day doesn&apos;t exist.</h1><Link href="/" className="mt-6 inline-block rounded-full bg-[#d98762] px-5 py-3 font-bold text-white">Back to My Week</Link></section></main>;
  return <DailyPlanner date={date} schedules={demoFixedSchedules} childId={demoChild.id} taskTemplates={demoTasks} taskAssignments={demoAssignments} />;
}
