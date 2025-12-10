"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCardioStore } from "@/store/cardioStore";

import { Flame, Heart, Bike, Activity, Trash2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function SetupCardioPage() {
  const { sessoes, addSessao, removeSessao } = useCardioStore();

  const [tipo, setTipo] = useState<"corrida" | "ciclismo" | "hiit" | "outro">("corrida");

  const [form, setForm] = useState({
    duracao: "",
    distancia: "",
    calorias: "",
    obs: "",
  });

  function handleAdd() {
    if (!form.duracao || !form.calorias) return alert("Preencha duração e calorias!");

    addSessao({
      tipo,
      duracao: Number(form.duracao),
      distancia: Number(form.distancia || 0),
      calorias: Number(form.calorias),
      observacao: form.obs,
    });

    setForm({ duracao: "", distancia: "", calorias: "", obs: "" });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F3FDF8] to-[#E8FBF4] px-6 py-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-10">
        <Logo />

        <Link href="/calendar">
          <Button variant="hero" className="rounded-full px-6 flex items-center gap-2">
            Ver Calendário
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <h1 className="text-center font-display text-4xl font-bold text-foreground">Cadastro de Cardio</h1>
      <p className="text-center text-muted-foreground mt-2 mb-10">
        Registre suas sessões de cardio e acompanhe seu condicionamento
      </p>

      {/* CARD PRINCIPAL */}
      <div className="max-w-5xl mx-auto bg-card rounded-2xl border shadow-card p-8 mb-10">
        <h2 className="font-semibold text-lg mb-4">Nova Sessão de Cardio</h2>

        {/* Tipo */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <CardioTypeButton
            label="Corrida"
            icon={<Activity className="w-5 h-5" />}
            active={tipo === "corrida"}
            onClick={() => setTipo("corrida")}
          />

          <CardioTypeButton
            label="Ciclismo"
            icon={<Bike className="w-5 h-5" />}
            active={tipo === "ciclismo"}
            onClick={() => setTipo("ciclismo")}
          />

          <CardioTypeButton
            label="HIIT"
            icon={<Flame className="w-5 h-5" />}
            active={tipo === "hiit"}
            onClick={() => setTipo("hiit")}
          />

          <CardioTypeButton
            label="Outro"
            icon={<Heart className="w-5 h-5" />}
            active={tipo === "outro"}
            onClick={() => setTipo("outro")}
          />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <InputCard
            label="Duração (min)"
            value={form.duracao}
            onChange={(v) => setForm((p) => ({ ...p, duracao: v }))}
          />

          <InputCard
            label="Distância (km)"
            value={form.distancia}
            onChange={(v) => setForm((p) => ({ ...p, distancia: v }))}
          />

          <InputCard label="Calorias" value={form.calorias} onChange={(v) => setForm((p) => ({ ...p, calorias: v }))} />
        </div>

        {/* Observações */}
        <input
          placeholder="Observações (opcional)"
          className="w-full px-4 py-3 rounded-xl border bg-background mb-6"
          value={form.obs}
          onChange={(e) => setForm((p) => ({ ...p, obs: e.target.value }))}
        />

        <Button className="rounded-xl" onClick={handleAdd}>
          + Adicionar Sessão
        </Button>
      </div>

      {/* LISTA DE SESSÕES */}
      <div className="max-w-5xl mx-auto mt-4">
        <h2 className="font-semibold mb-4">Sessões Cadastradas</h2>

        {sessoes.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma sessão cadastrada ainda</p>
        ) : (
          <div className="flex flex-col gap-4">
            {sessoes.map((s) => (
              <div key={s.id} className="p-5 bg-card border rounded-2xl shadow-sm flex justify-between items-center">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {s.tipo === "corrida" && <Activity className="w-5 h-5" />}
                    {s.tipo === "ciclismo" && <Bike className="w-5 h-5" />}
                    {s.tipo === "hiit" && <Flame className="w-5 h-5" />}
                    {s.tipo === "outro" && <Heart className="w-5 h-5" />}
                  </div>

                  <div>
                    <p className="font-medium capitalize">{s.tipo}</p>
                    <p className="text-muted-foreground text-sm">
                      ⏱ {s.duracao} min •{s.distancia > 0 && ` 🚴‍♂️ ${s.distancia} km • `}
                      🔥 {s.calorias} kcal
                    </p>
                    {s.observacao && <p className="text-muted-foreground text-sm mt-1">{s.observacao}</p>}
                  </div>
                </div>

                <button onClick={() => removeSessao(s.id)} className="text-red-500 hover:bg-red-100 p-2 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function CardioTypeButton({ label, icon, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-4 rounded-xl border 
        ${active ? "bg-primary text-white border-primary" : "bg-background text-foreground"}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface InputCardProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function InputCard({ label, value, onChange }: InputCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-muted-foreground">{label}</label>
      <input
        className="px-4 py-3 rounded-xl border bg-background"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
