"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

import { ArrowLeft, ArrowRight, Scale, Activity, Dumbbell, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function ObjectivePage() {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  const [selected, setSelected] = useState<string | null>(null);

  const objetivos = [
    {
      id: "perder",
      title: "Perder peso",
      desc: "Emagrecer e definir",
      icon: ArrowRight,
    },
    {
      id: "manter",
      title: "Manter peso",
      desc: "Manter condicionamento atual",
      icon: Scale,
    },
    {
      id: "ganhar",
      title: "Ganar massa",
      desc: "Hipertrofia e força",
      icon: Dumbbell,
    },
  ];

  function handleContinue() {
    if (!selected) return;

    setUser({ objetivo: selected });

    router.push("/setup-diet"); // PRÓXIMA ETAPA
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 px-4">
      {/* VOLTAR E LOGO */}
      <div className="w-full max-w-xl flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </a>

        <Logo size="lg" />
      </div>

      {/* BARRA DE PROGRESSO */}
      <div className="mt-6 flex gap-3 w-full max-w-md">
        <div className="h-2 flex-1 rounded-full bg-primary"></div>
        <div className="h-2 flex-1 rounded-full bg-primary"></div>
        <div className="h-2 flex-1 rounded-full bg-border"></div>
      </div>

      {/* TÍTULO */}
      <h1 className="text-3xl font-display font-bold text-foreground mt-10">Seu objetivo</h1>

      <p className="text-muted-foreground mt-2 text-center max-w-md">O que você quer alcançar?</p>

      {/* CARDS */}
      <div className="mt-10 w-full max-w-md flex flex-col gap-4">
        {objetivos.map((item) => {
          const Icon = item.icon;
          const ativo = selected === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`
                w-full text-left p-5 rounded-2xl border bg-card shadow-card transition-all
                flex items-center gap-4
                ${ativo ? "border-primary bg-primary/10" : "hover:bg-secondary border-border"}
              `}
            >
              {/* Ícone */}
              <div
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${ativo ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                `}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Texto */}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>

              {/* Check */}
              {ativo && (
                <div className="text-primary">
                  <Check className="w-6 h-6" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* BOTÃO CONTINUAR */}
      <Button
        onClick={handleContinue}
        variant="hero"
        size="xl"
        className="mt-10 w-full max-w-md rounded-xl disabled:opacity-50"
        disabled={!selected}
      >
        Continuar →
      </Button>
    </div>
  );
}
