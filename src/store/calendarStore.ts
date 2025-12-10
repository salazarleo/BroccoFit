"use client";

import { create } from "zustand";
import { v4 as uuid } from "uuid";

export interface CalendarEntry {
  id: string;
  tipo: "treino" | "cardio";
  nome: string;
  calorias?: number;
  duracao?: number;
  distancia?: number;
}

export interface DayData {
  date: string; // "2025-12-18"
  entries: CalendarEntry[];
}

interface CalendarStore {
  days: DayData[];

  addEntry: (date: string, entry: Omit<CalendarEntry, "id">) => void;
  removeEntry: (date: string, id: string) => void;

  getDay: (date: string) => DayData | null;
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  days: [],

  addEntry: (date, entry) =>
    set((state) => {
      const existing = state.days.find((d) => d.date === date);

      if (existing) {
        existing.entries.push({ id: uuid(), ...entry });
        return { days: [...state.days] };
      }

      return {
        days: [
          ...state.days,
          {
            date,
            entries: [{ id: uuid(), ...entry }],
          },
        ],
      };
    }),

  removeEntry: (date, id) =>
    set((state) => ({
      days: state.days.map((d) => (d.date === date ? { ...d, entries: d.entries.filter((e) => e.id !== id) } : d)),
    })),

  getDay: (date) => get().days.find((d) => d.date === date) || null,
}));
