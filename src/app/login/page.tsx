"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ⭐ Aqui futuramente entra a lógica real de login
    if (!form.email || !form.senha) {
      alert("Preencha os campos corretamente.");
      return;
    }

    alert("Login realizado (demo). Redirecionando...");
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

        <h1 className="text-2xl font-display font-bold text-foreground mt-4">Fazer login</h1>

        <p className="text-muted-foreground mt-1">Entre para acessar seu painel e registrar seus treinos</p>
      </div>

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-lg bg-card border border-border p-8 rounded-2xl shadow-card flex flex-col gap-5"
      >
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-foreground">E-mail</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>

        {/* Senha */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Senha</label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={form.senha}
              onChange={(e) => handleChange("senha", e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Botão */}
        <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl">
          Entrar
        </Button>

        {/* Criar conta */}
        <p className="text-center text-muted-foreground text-sm mt-2">
          Ainda não tem conta?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}
