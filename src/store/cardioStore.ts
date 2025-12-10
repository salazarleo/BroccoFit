import { create } from "zustand";
import { v4 as uuid } from "uuid";

export interface CardioSession {
  id: string;
  tipo: "corrida" | "ciclismo" | "hiit" | "outro";
  duracao: number;
  distancia: number;
  calorias: number;
  observacao?: string;
}

interface CardioStore {
  sessoes: CardioSession[];

  addSessao: (data: Omit<CardioSession, "id">) => void;
  removeSessao: (id: string) => void;
}

export const useCardioStore = create<CardioStore>((set) => ({
  sessoes: [], // ← IMPORTANTE!

  addSessao: (data) =>
    set((state) => ({
      sessoes: [...state.sessoes, { id: uuid(), ...data }],
    })),

  removeSessao: (id) =>
    set((state) => ({
      sessoes: state.sessoes.filter((s) => s.id !== id),
    })),
}));
