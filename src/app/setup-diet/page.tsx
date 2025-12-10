"use client";

import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { ArrowLeft, Utensils, Check } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function DietPage() {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  const [selected, setSelected] = useState<string>("");

  const opcoes = [
    {
      id: "regular",
      titulo: "Regular",
      desc: "Sem restrições alimentares",
    },
    {
      id: "vegetariano",
      titulo: "Vegetariano",
      desc: "Sem carnes",
    },
    {
      id: "vegano",
      titulo: "Vegano",
      desc: "Sem produtos animais",
    },
    {
      id: "lowcarb",
      titulo: "Low Carb",
      desc: "Baixo carboidrato",
    },
  ];

  function handleSubmit() {
    if (!selected) {
      alert("Selecione uma opção!");
      return;
    }

    setUser({ dieta: selected });

    router.push("/setup-training"); // tela final ou home do app
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 px-4">
      {/* VOLTAR E LOGO */}
      <div className="w-full max-w-xl flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </a>

        <Logo />
      </div>

      {/* BARRA DE PROGRESSO */}
      <div className="mt-6 flex gap-3 w-full max-w-md">
        <div className="h-2 flex-1 rounded-full bg-primary"></div>
        <div className="h-2 flex-1 rounded-full bg-primary"></div>
        <div className="h-2 flex-1 rounded-full bg-border"></div>
      </div>

      {/* TÍTULO */}
      <h1 className="text-3xl font-display font-bold text-foreground mt-10">Alimentação</h1>

      <p className="text-muted-foreground mt-2 text-center max-w-md">Como é sua dieta?</p>

      {/* OPÇÕES */}
      <div className="mt-10 w-full max-w-lg flex flex-col gap-4">
        {opcoes.map((opt) => {
          const active = selected === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex items-center justify-between p-5 rounded-2xl border bg-card shadow-card text-left transition-all 
              ${active ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="font-display font-semibold text-foreground">{opt.titulo}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
              </div>

              {active && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* BOTÃO */}
      <button
        onClick={handleSubmit}
        className="mt-10 w-full max-w-lg py-3 rounded-2xl bg-primary text-primary-foreground font-display font-semibold shadow-button hover:opacity-90 transition"
      >
        Finalizar configuração →
      </button>
    </div>
  );
}
