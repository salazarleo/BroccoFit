"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

import { ArrowLeft, Briefcase, Moon, Activity, Flame, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function LifestylePage() {
  const router = useRouter();

  const setUser = useUserStore((s) => s.setUser);
  const calcularTudo = useUserStore((s) => s.calcularTudo);

  const [selected, setSelected] = useState<string | null>(null);

  const niveis = [
    {
      id: "sedentario",
      title: "Sedentário",
      desc: "Trabalho de escritório, pouca atividade",
      fator: 1.2,
      icon: Briefcase,
    },
    {
      id: "leve",
      title: "Levemente ativo",
      desc: "Exercício 1-2x por semana",
      fator: 1.375,
      icon: Moon,
    },
    {
      id: "moderado",
      title: "Moderadamente ativo",
      desc: "Exercício 3-5x por semana",
      fator: 1.55,
      icon: Activity,
    },
    {
      id: "alto",
      title: "Muito ativo",
      desc: "Exercício intenso 6-7x por semana",
      fator: 1.725,
      icon: Flame,
    },
  ];

  function handleContinue() {
    if (!selected) return;

    const nivel = niveis.find((n) => n.id === selected);
    if (!nivel) return;

    setUser({ nivelAtividade: nivel.fator });

    calcularTudo();

    router.push("/objective"); // PRÓXIMA ETAPA
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 px-4">
      {/* VOLTAR + LOGO */}
      <div className="w-full max-w-xl flex items-center justify-between">
        <LinkVoltar />
        <Logo size="lg" />
      </div>

      {/* Barra de progresso */}
      <div className="mt-6 flex gap-3 w-full max-w-md">
        <div className="h-2 flex-1 rounded-full bg-primary"></div>
        <div className="h-2 flex-1 rounded-full bg-border"></div>
        <div className="h-2 flex-1 rounded-full bg-border"></div>
      </div>

      {/* TÍTULO */}
      <h1 className="text-3xl font-display font-bold text-foreground mt-10">Nível de atividade</h1>

      <p className="text-muted-foreground mt-2 text-center max-w-md">Qual seu nível de atividade física atual?</p>

      {/* CARDS */}
      <div className="mt-10 w-full max-w-md flex flex-col gap-4">
        {niveis.map((item) => {
          const Icon = item.icon;

          const ativo = selected === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full text-left p-5 rounded-2xl border bg-card shadow-card transition-all
                flex items-center gap-4
                ${ativo ? "border-primary bg-primary/10" : "hover:bg-secondary border-border"}
              `}
            >
              {/* Ícone */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center
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

function LinkVoltar() {
  return (
    <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
      <ArrowLeft className="w-4 h-4" />
      Voltar
    </a>
  );
}
