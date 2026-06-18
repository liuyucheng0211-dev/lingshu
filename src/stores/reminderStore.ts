import { create } from 'zustand';
import type { Reminder } from '@/data/mockReminders';
import { mockReminders } from '@/data/mockReminders';

interface ReminderState {
  reminders: Reminder[];
  addReminder: (r: Reminder) => void;
  markComplete: (id: string) => void;
  getLifeReminders: () => Reminder[];
  getOfficeReminders: () => Reminder[];
  getImportantCrossSpace: (space: 'life' | 'office') => Reminder[];
}

export const useReminderStore = create<ReminderState>((set, get) => ({
  reminders: mockReminders,
  addReminder: (r) => set((state) => ({ reminders: [...state.reminders, r] })),
  markComplete: (id) =>
    set((state) => ({
      reminders: state.reminders.map((r) =>
        r.id === id ? { ...r, status: 'done' as const } : r
      ),
    })),
  getLifeReminders: () =>
    get().reminders.filter((r) => r.space === 'life' && r.status !== 'done'),
  getOfficeReminders: () =>
    get().reminders.filter((r) => r.space === 'office' && r.status !== 'done'),
  getImportantCrossSpace: (space) =>
    get().reminders.filter(
      (r) => r.importance === 'important' && r.space !== space && r.status !== 'done'
    ),
}));