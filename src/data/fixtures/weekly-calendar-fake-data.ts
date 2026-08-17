import type { ScheduledTask } from "@/lib/scheduling/placement";
import type { FixedSchedule } from "@/types/domain";

export type WeeklyCalendarFakeTask = ScheduledTask & {
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  colorCategory: "LEARNING" | "MATH" | "READING" | "CREATIVE" | "MOVEMENT" | "FAMILY" | "FREE";
  title: string;
  icon: string;
  points: number;
};

const childId = "fake-week-child";

function schedule(id: string, weekday: FixedSchedule["weekdays"][number], title: string, category: FixedSchedule["category"], startMinutes: number, endMinutes: number): FixedSchedule {
  return { id, childId, title, category, weekdays: [weekday], startMinutes, endMinutes };
}

function task(id: string, weekday: WeeklyCalendarFakeTask["weekday"], colorCategory: WeeklyCalendarFakeTask["colorCategory"], title: string, icon: string, startMinutes: number, durationMinutes: number, points: number): WeeklyCalendarFakeTask {
  return { id, dailyTaskId: `${id}-daily`, taskTemplateId: `${id}-template`, weekday, colorCategory, title, icon, startMinutes, durationMinutes, points };
}

export const weeklyCalendarFakeSchedules: FixedSchedule[] = [
  schedule("fake-mon-school-am", 1, "School", "SCHOOL", 480, 720), schedule("fake-mon-lunch", 1, "Lunch", "MEAL", 720, 765), schedule("fake-mon-school-pm", 1, "School", "SCHOOL", 840, 1020),
  schedule("fake-tue-school", 2, "School", "SCHOOL", 480, 720), schedule("fake-tue-lunch", 2, "Lunch", "MEAL", 720, 765),
  schedule("fake-wed-school", 3, "School", "SCHOOL", 480, 720), schedule("fake-wed-activity", 3, "Art Club", "ACTIVITY", 870, 1020),
  schedule("fake-thu-school-am", 4, "School", "SCHOOL", 480, 720), schedule("fake-thu-lunch", 4, "Lunch", "MEAL", 720, 765), schedule("fake-thu-class", 4, "Piano", "CLASS", 840, 900),
  schedule("fake-fri-school", 5, "School", "SCHOOL", 480, 720), schedule("fake-fri-lunch", 5, "Lunch", "MEAL", 720, 765), schedule("fake-fri-outdoors", 5, "Outdoor Time", "ACTIVITY", 900, 945),
  schedule("fake-sat-family", 6, "Family Outing", "ACTIVITY", 600, 660), schedule("fake-sat-lunch", 6, "Lunch", "MEAL", 720, 765),
  schedule("fake-sun-breakfast", 0, "Breakfast", "MEAL", 510, 540), schedule("fake-sun-family", 0, "Family Time", "ACTIVITY", 870, 960),
];

export const weeklyCalendarFakeTasks: WeeklyCalendarFakeTask[] = [
  task("fake-mon-poem", 1, "CREATIVE", "Poem", "📜", 1020, 5, 5), task("fake-mon-raz", 1, "LEARNING", "RAZ", "📘", 1050, 15, 10), task("fake-mon-math", 1, "MATH", "Math", "🧮", 1080, 40, 20),
  task("fake-tue-reading", 2, "READING", "Reading", "📖", 990, 30, 15), task("fake-tue-exercise", 2, "MOVEMENT", "Exercise", "🏃", 1050, 30, 10),
  task("fake-wed-raz", 3, "LEARNING", "RAZ", "📘", 1050, 15, 10), task("fake-wed-reading", 3, "READING", "Reading", "📖", 1080, 30, 15),
  task("fake-thu-poem", 4, "CREATIVE", "Poem", "📜", 780, 5, 5), task("fake-thu-raz", 4, "LEARNING", "RAZ", "📘", 800, 15, 10), task("fake-thu-math", 4, "MATH", "Math", "🧮", 930, 40, 20), task("fake-thu-reading", 4, "READING", "Reading", "📖", 990, 30, 15),
  task("fake-fri-piano", 5, "CREATIVE", "Piano", "🎹", 960, 30, 15), task("fake-fri-free", 5, "FREE", "Free Time", "🌈", 1020, 60, 0),
  task("fake-sat-piano", 6, "CREATIVE", "Piano", "🎹", 675, 30, 15), task("fake-sat-outdoor", 6, "MOVEMENT", "Outdoor Time", "🚲", 810, 60, 10), task("fake-sat-raz", 6, "LEARNING", "RAZ", "📘", 900, 15, 10),
  task("fake-sun-poem", 0, "CREATIVE", "Poem", "📜", 600, 5, 5), task("fake-sun-math", 0, "MATH", "Math", "🧮", 630, 40, 20), task("fake-sun-reading", 0, "READING", "Reading", "📖", 720, 30, 15), task("fake-sun-free", 0, "FREE", "Free Time", "🌈", 1020, 60, 0),
];
