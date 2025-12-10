"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

import { ArrowLeft, User, Calendar, Scale, Ruler } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const setUser = useUserStore((s) => s.setUser);

  const [form, setForm] = useState({
    nome: "",
    dataNascimento: "",
    sexo: "",
    peso: "",
    altura: "",
  });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setUser({
      nome: form.nome,
      sobrenome: "",
      dataNascimento: form.dataNascimento,
      sexo: form.sexo as "masculino" | "feminino",
      peso: Number(form.peso),
      altura: Number(form.altura),
    });

    alert("Perfil salvo com sucesso!");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 px-4">
      {/* VOLTAR */}
      <div className="w-full max-w-2xl mb-8">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>

      {/* LOGO */}
      <div className="flex flex-col items-center">
        <Logo size="lg" />

        <h1 className="text-2xl font-display font-bold text-foreground mt-4">Complete seu perfil</h1>

        <p className="text-muted-foreground mt-1">Esses dados serão usados para calcular sua TMB</p>
      </div>

      {/* CARD DO FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-lg bg-card border border-border p-8 rounded-2xl shadow-card flex flex-col gap-5"
      >
        {/* Nome */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Nome completo</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <User className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              placeholder="Seu nome"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Data de nascimento */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Data de nascimento</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={form.dataNascimento}
              onChange={(e) => handleChange("dataNascimento", e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Sexo */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Sexo</label>

          <select
            value={form.sexo}
            onChange={(e) => handleChange("sexo", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border bg-background outline-none"
            required
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>

        {/* Peso */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Peso (kg)</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              value={form.peso}
              onChange={(e) => handleChange("peso", e.target.value)}
              placeholder="Ex: 82"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Altura */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Altura (cm)</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              value={form.altura}
              onChange={(e) => handleChange("altura", e.target.value)}
              placeholder="Ex: 178"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* BOTÃO */}
        <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl">
          Salvar perfil
        </Button>

        {/* Ir para próxima etapa */}
        <p className="text-center text-muted-foreground text-sm mt-2">
          Pronto?{" "}
          <Link href="/lifestyle" className="text-primary font-medium hover:underline">
            Continuar para Estilo de Vida →
          </Link>
        </p>
      </form>
    </div>
  );
}
