"use client";

import { useParams, useRouter } from "next/navigation";
import { useTrainingStore } from "@/store/trainingStore";
import { useCardioStore } from "@/store/cardioStore";
import { useCalendarStore } from "@/store/calendarStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Dumbbell, Flame, Bike, Activity, Heart } from "lucide-react";

export default function SelectDayPage() {
  const params = useParams();
  const router = useRouter();

  const date = params.date as string; // YYYY-MM-DD

  const { treinos } = useTrainingStore();
  const { sessoes: cardios } = useCardioStore();
  const { addEntry } = useCalendarStore();

  function addTreino(t: any) {
    addEntry(date, {
      tipo: "treino",
      nome: t.nome,
      calorias: t.calorias,
    });

    router.push("/calendar");
  }

  function addCardio(c: any) {
    addEntry(date, {
      tipo: "cardio",
      nome: c.tipo,
      calorias: c.calorias,
      duracao: c.duracao,
      distancia: c.distancia,
    });

    router.push("/calendar");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F3FDF8] to-[#E8FBF4] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* VOLTAR */}
        <button onClick={() => router.push("/calendar")} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao calendário
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Adicionar atividade</h1>

        <p className="text-muted-foreground mb-8">
          Data selecionada:{" "}
          {new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* TREINOS */}
        <h2 className="text-xl font-semibold mb-3">Treinos cadastrados</h2>

        {treinos.length === 0 ? (
          <p className="text-muted-foreground mb-6">Nenhum treino cadastrado ainda.</p>
        ) : (
          <div className="flex flex-col gap-3 mb-10">
            {treinos.map((t) => (
              <button
                key={t.id}
                onClick={() => addTreino(t)}
                className="p-4 bg-card border shadow-sm rounded-xl flex items-center gap-3 hover:bg-primary/10 transition"
              >
                <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl">
                  <Dumbbell className="w-5 h-5" />
                </div>

                <div className="text-left">
                  <p className="font-medium">{t.nome}</p>
                  <p className="text-muted-foreground text-sm">{t.calorias} kcal</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* CARDIOS */}
        <h2 className="text-xl font-semibold mb-3">Sessões de Cardio</h2>

        {cardios.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma sessão de cardio cadastrada.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cardios.map((c) => (
              <button
                key={c.id}
                onClick={() => addCardio(c)}
                className="p-4 bg-card border shadow-sm rounded-xl flex items-center gap-3 hover:bg-primary/10 transition"
              >
                <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl">
                  {c.tipo === "corrida" && <Activity className="w-5 h-5" />}
                  {c.tipo === "ciclismo" && <Bike className="w-5 h-5" />}
                  {c.tipo === "hiit" && <Flame className="w-5 h-5" />}
                  {c.tipo === "outro" && <Heart className="w-5 h-5" />}
                </div>

                <div className="text-left">
                  <p className="font-medium capitalize">{c.tipo}</p>
                  <p className="text-muted-foreground text-sm">
                    {c.duracao} min • {c.calorias} kcal
                    {c.distancia > 0 && ` • ${c.distancia} km`}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
