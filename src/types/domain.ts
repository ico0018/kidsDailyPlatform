export type TaskType = "ONLINE" | "OFFLINE";
/** JavaScript-compatible convention: 0 is Sunday and 6 is Saturday. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type FixedScheduleCategory = "SCHOOL" | "MEAL" | "CLASS" | "ACTIVITY" | "OTHER";
export interface Child { id: string; name: string; avatar: string; totalPoints: number; createdAt: string; }
export interface TaskTemplate { id: string; name: string; icon: string; description: string; durationMinutes: number; points: number; taskType: TaskType; url?: string; instructions?: string; active: boolean; }
export interface TaskAssignment { id: string; childId: string; taskTemplateId: string; weekdays: Weekday[]; }
export interface FixedSchedule { id: string; childId: string; title: string; weekdays: Weekday[]; startMinutes: number; endMinutes: number; category: FixedScheduleCategory; }
export interface Reward { id: string; name: string; emoji: string; description: string; costPoints: number; active: boolean; }
