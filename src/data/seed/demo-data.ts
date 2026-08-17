import type { Child, FixedSchedule, Reward, TaskAssignment, TaskTemplate } from "@/types/domain";

export const demoChild: Child = { id: "child-nora", name: "Nora", avatar: "🌟", totalPoints: 235, createdAt: "2026-08-15T00:00:00.000Z" };
export const demoTasks: TaskTemplate[] = [
  { id: "task-raz-1-book", name: "RAZ 1本", icon: "📚", description: "Read 1 RAZ book", durationMinutes: 15, points: 10, taskType: "ONLINE", active: true },
  { id: "task-math-calculation", name: "数学计算", icon: "➗", description: "Timed calculation practice", durationMinutes: 20, points: 15, taskType: "OFFLINE", active: true },
  { id: "task-chinese-poem", name: "语文古诗", icon: "📜", description: "Read and review today's poem", durationMinutes: 10, points: 5, taskType: "ONLINE", active: true },
  { id: "task-chinese-vocab", name: "语文字词", icon: "✏️", description: "Complete Chinese character and vocabulary practice", durationMinutes: 15, points: 10, taskType: "ONLINE", active: true },
  { id: "task-math-thinking", name: "数学思维", icon: "🧩", description: "Timed math thinking practice", durationMinutes: 30, points: 20, taskType: "OFFLINE", active: true },
];
export const demoAssignments: TaskAssignment[] = [
  { id: "assignment-mon-raz", childId: demoChild.id, taskTemplateId: "task-raz-1-book", weekdays: [1] },
  { id: "assignment-mon-calculation", childId: demoChild.id, taskTemplateId: "task-math-calculation", weekdays: [1] },
  { id: "assignment-mon-poem", childId: demoChild.id, taskTemplateId: "task-chinese-poem", weekdays: [1] },
  { id: "assignment-mon-vocab", childId: demoChild.id, taskTemplateId: "task-chinese-vocab", weekdays: [1] },
  { id: "assignment-mon-thinking", childId: demoChild.id, taskTemplateId: "task-math-thinking", weekdays: [1] },
];
export const demoFixedSchedules: FixedSchedule[] = [
  { id: "monday-school-morning", childId: demoChild.id, title: "School", category: "SCHOOL", weekdays: [1], startMinutes: 480, endMinutes: 720 },
  { id: "monday-lunch-play", childId: demoChild.id, title: "Lunch / Play", category: "MEAL", weekdays: [1], startMinutes: 720, endMinutes: 765 },
  { id: "monday-school-afternoon", childId: demoChild.id, title: "School", category: "SCHOOL", weekdays: [1], startMinutes: 840, endMinutes: 1020 },
];
export const demoRewards: Reward[] = [
  { id: "ice-cream", name: "Ice Cream", emoji: "🍦", description: "Pick a favourite ice cream.", costPoints: 100, active: true },
  { id: "movie-night", name: "Movie Night", emoji: "🎬", description: "Choose a family movie.", costPoints: 200, active: true },
  { id: "small-toy", name: "Small Toy", emoji: "🧸", description: "Choose a small toy.", costPoints: 500, active: true },
];
