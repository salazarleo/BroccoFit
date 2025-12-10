import { create } from "zustand";
import { v4 as uuid } from "uuid";

export interface Exercise {
  id: string;
  nome: string;
  series: number;
  reps: number;
  peso: number;
}

export interface Training {
  id: string;
  nome: string;
  calorias: number;
  exercicios: Exercise[];
}

interface TrainingStore {
  treinos: Training[];

  addTreino: (nome: string, calorias: number) => string;
  renameTreino: (id: string, nome: string) => void;
  removeTreino: (id: string) => void;

  addExerciseToTreino: (treinoId: string, exercise: Omit<Exercise, "id">) => void;
  removeExercise: (treinoId: string, exerciseId: string) => void;
}

export const useTrainingStore = create<TrainingStore>((set) => ({
  treinos: [],

  addTreino: (nome, calorias) => {
    const id = uuid();
    set((state) => ({
      treinos: [
        ...state.treinos,
        {
          id,
          nome,
          calorias,
          exercicios: [],
        },
      ],
    }));
    return id;
  },

  renameTreino: (id, nome) =>
    set((state) => ({
      treinos: state.treinos.map((t) => (t.id === id ? { ...t, nome } : t)),
    })),

  removeTreino: (id) =>
    set((state) => ({
      treinos: state.treinos.filter((t) => t.id !== id),
    })),

  addExerciseToTreino: (treinoId, exercise) =>
    set((state) => ({
      treinos: state.treinos.map((t) =>
        t.id === treinoId
          ? {
              ...t,
              exercicios: [...t.exercicios, { id: uuid(), ...exercise }],
            }
          : t
      ),
    })),

  removeExercise: (treinoId, exerciseId) =>
    set((state) => ({
      treinos: state.treinos.map((t) =>
        t.id === treinoId
          ? {
              ...t,
              exercicios: t.exercicios.filter((ex) => ex.id !== exerciseId),
            }
          : t
      ),
    })),
}));
