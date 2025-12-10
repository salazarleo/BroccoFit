"use client";

import { useState } from "react";
import { Dumbbell, Plus, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { useTrainingStore } from "@/store/trainingStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function SetupTrainingPage() {
  const { treinos, addTreino, addExerciseToTreino, renameTreino, removeTreino, removeExercise } = useTrainingStore();

  const [showNew, setShowNew] = useState(false);
  const [newTreinoName, setNewTreinoName] = useState("");
  const [newTreinoCalorias, setNewTreinoCalorias] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [renameMode, setRenameMode] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState("");

  const [exerciseForm, setExerciseForm] = useState({
    nome: "",
    series: "",
    reps: "",
    peso: "",
  });

  function handleCreateTreino() {
    if (!newTreinoName.trim() || !newTreinoCalorias.trim()) return alert("Preencha nome e calorias do treino.");

    const id = addTreino(newTreinoName.trim(), Number(newTreinoCalorias.trim()));

    setSelectedId(id);

    setNewTreinoName("");
    setNewTreinoCalorias("");
    setShowNew(false);
  }

  function handleAddExercise() {
    if (!selectedId) return;
    if (!exerciseForm.nome || !exerciseForm.series || !exerciseForm.reps) return;

    addExerciseToTreino(selectedId, {
      nome: exerciseForm.nome,
      series: Number(exerciseForm.series),
      reps: Number(exerciseForm.reps),
      peso: Number(exerciseForm.peso || 0),
    });

    setExerciseForm({ nome: "", series: "", reps: "", peso: "" });
  }

  const selectedTreino = treinos.find((t) => t.id === selectedId);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F3FDF8] to-[#E8FBF4] px-6 py-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-10">
        <Logo />

        <Link href="/setup-cardio">
          <Button variant="hero" className="rounded-full px-6 flex items-center gap-2">
            Próximo: Cardio
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <h1 className="text-center font-display text-4xl font-bold text-foreground">Cadastro de Treinos</h1>
      <p className="text-center text-muted-foreground mt-2 mb-10">
        Monte seus treinos personalizados com exercícios detalhados
      </p>

      <div className="max-w-5xl mx-auto flex gap-8">
        {/* LEFT — Meus Treinos */}
        <div className="w-80 p-5 bg-card rounded-2xl border shadow-card h-fit">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-lg">Meus Treinos</h2>

            <button
              onClick={() => setShowNew(true)}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/15 text-primary"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Criar novo treino */}
          {showNew && (
            <div className="mb-4 border rounded-xl p-3 flex flex-col gap-3">
              <input
                placeholder="Nome do treino"
                className="px-3 py-2 rounded-xl border bg-background"
                value={newTreinoName}
                onChange={(e) => setNewTreinoName(e.target.value)}
              />

              <input
                placeholder="Calorias médias (kcal)"
                className="px-3 py-2 rounded-xl border bg-background"
                value={newTreinoCalorias}
                onChange={(e) => setNewTreinoCalorias(e.target.value)}
              />

              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleCreateTreino}>
                  Adicionar
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowNew(false);
                    setNewTreinoName("");
                    setNewTreinoCalorias("");
                  }}
                >
                  X
                </Button>
              </div>
            </div>
          )}

          {/* Lista */}
          <div className="flex flex-col gap-3">
            {treinos.map((t) => (
              <div
                key={t.id}
                className={`w-full p-4 rounded-2xl border bg-background flex gap-3 justify-between ${
                  selectedId === t.id ? "border-primary bg-primary/10" : ""
                }`}
              >
                <button onClick={() => setSelectedId(t.id)} className="flex gap-3 text-left flex-1">
                  <Dumbbell className="w-5 h-5 text-primary mt-1" />

                  <div>
                    {renameMode === t.id ? (
                      <input
                        className="px-2 py-1 rounded-md border bg-card w-full"
                        value={renameInput}
                        onChange={(e) => setRenameInput(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <>
                        <p className="font-medium">{t.nome}</p>
                        <p className="text-muted-foreground text-sm">{t.exercicios.length} exercícios</p>
                        <p className="text-muted-foreground text-xs">{t.calorias} kcal</p>
                      </>
                    )}
                  </div>
                </button>

                {/* Ações */}
                <div className="flex gap-2 items-center">
                  {renameMode === t.id ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        renameTreino(t.id, renameInput.trim());
                        setRenameMode(null);
                      }}
                    >
                      Salvar
                    </Button>
                  ) : (
                    <button
                      onClick={() => {
                        setRenameMode(t.id);
                        setRenameInput(t.nome);
                      }}
                      className="p-2 rounded-md hover:bg-muted"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}

                  <button onClick={() => removeTreino(t.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-md">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Conteúdo */}
        <div className="flex-1 bg-card rounded-2xl border shadow-card p-8">
          {!selectedTreino ? (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
              <Dumbbell className="w-12 h-12 mb-3 opacity-60" />
              <p>Selecione ou crie um treino para começar</p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-semibold mb-6">{selectedTreino.nome}</h2>

              {/* Form de Exercício */}
              <div className="rounded-2xl border p-5 bg-background mb-6">
                <p className="mb-3 font-medium">Adicionar Exercício</p>

                <div className="grid grid-cols-4 gap-3">
                  <input
                    placeholder="Nome"
                    className="px-3 py-2 rounded-xl border bg-card"
                    value={exerciseForm.nome}
                    onChange={(e) => setExerciseForm((prev) => ({ ...prev, nome: e.target.value }))}
                  />

                  <input
                    placeholder="Séries"
                    className="px-3 py-2 rounded-xl border bg-card"
                    value={exerciseForm.series}
                    onChange={(e) => setExerciseForm((prev) => ({ ...prev, series: e.target.value }))}
                  />

                  <input
                    placeholder="Reps"
                    className="px-3 py-2 rounded-xl border bg-card"
                    value={exerciseForm.reps}
                    onChange={(e) => setExerciseForm((prev) => ({ ...prev, reps: e.target.value }))}
                  />

                  <input
                    placeholder="Peso (kg)"
                    className="px-3 py-2 rounded-xl border bg-card"
                    value={exerciseForm.peso}
                    onChange={(e) => setExerciseForm((prev) => ({ ...prev, peso: e.target.value }))}
                  />
                </div>

                <Button className="mt-4" onClick={handleAddExercise}>
                  + Adicionar
                </Button>
              </div>

              {/* Lista de Exercícios */}
              {selectedTreino.exercicios.length === 0 ? (
                <p className="text-muted-foreground text-center">Nenhum exercício cadastrado ainda</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectedTreino.exercicios.map((ex, i) => (
                    <div key={ex.id} className="p-4 bg-background border rounded-xl flex justify-between items-center">
                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                          {i + 1}
                        </div>

                        <div>
                          <p className="font-semibold">{ex.nome}</p>
                          <p className="text-muted-foreground text-sm">
                            {ex.series} séries × {ex.reps} reps • {ex.peso}kg
                          </p>
                        </div>
                      </div>

                      {/* Excluir exercício */}
                      <button
                        onClick={() => removeExercise(selectedTreino.id, ex.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
