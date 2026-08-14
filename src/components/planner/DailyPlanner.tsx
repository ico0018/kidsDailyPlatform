import { DailyPlannerHeader } from "@/components/planner/DailyPlannerHeader";
import { SchedulingBoard } from "@/components/planner/SchedulingBoard";
import type { FixedSchedule, TaskAssignment, TaskTemplate } from "@/types/domain";
function sameDate(a: Date, b: Date): boolean { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
export function DailyPlanner({ date, schedules, childId, taskTemplates, taskAssignments }: { date: Date; schedules: FixedSchedule[]; childId: string; taskTemplates: TaskTemplate[]; taskAssignments: TaskAssignment[] }) {
  const daySchedules = schedules.filter((schedule) => schedule.weekdays.includes(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6));
  return <main className="min-h-screen bg-[#fff7ed] px-3 py-6 text-slate-800 sm:px-8 sm:py-10"><div className="mx-auto max-w-7xl rounded-[32px] border border-[#f0dfcd] bg-[#fffdf9] p-5 shadow-[0_18px_50px_rgba(130,94,65,0.12)] sm:p-8"><DailyPlannerHeader date={date} isToday={sameDate(date, new Date())} /><SchedulingBoard date={date} childId={childId} schedules={daySchedules} templates={taskTemplates} assignments={taskAssignments} /></div></main>;
}
