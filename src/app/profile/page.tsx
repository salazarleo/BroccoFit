"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

import { ArrowLeft, User, Calendar, Scale, Ruler } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("broccofit_user");
    if (!stored) return;

    const user = JSON.parse(stored);

    async function load() {
      try {
        const res = await fetch(`/api/profile?id=${user.id}`);
        const data = await res.json();
        setProfile(data.user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function saveProfile() {
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: profile.id,
          name: profile.name,
          birthDate: profile.birthDate,
          sex: profile.sex,
          weightKg: profile.weightKg,
          heightCm: profile.heightCm,
        }),
      });

      if (!res.ok) {
        alert("Erro ao salvar perfil");
        return;
      }

      alert("Perfil salvo com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 px-4">
      {/* VOLTAR */}
      <div className="w-full max-w-2xl mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>

      {/* LOGO */}
      <div className="flex flex-col items-center">
        <Logo size="lg" />

        <h1 className="text-2xl font-display font-bold text-foreground mt-4">
          Editar Perfil
        </h1>

        <p className="text-muted-foreground mt-1">
          Atualize suas informações pessoais
        </p>
      </div>

      {/* CARD DO FORMULÁRIO */}
      <div className="mt-8 w-full max-w-lg bg-card border border-border p-8 rounded-2xl shadow-card flex flex-col gap-5">
        
        {/* Nome */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Nome</label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <User className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={profile?.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              placeholder="Seu nome"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Data de nascimento */}
        <div>
          <label className="block mb-1 font-medium text-foreground">
            Data de nascimento
          </label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={profile?.birthDate?.split("T")[0] || ""}
              onChange={(e) =>
                setProfile({ ...profile, birthDate: e.target.value })
              }
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Peso */}
        <div>
          <label className="block mb-1 font-medium text-foreground">
            Peso (kg)
          </label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              placeholder="Ex: 82"
              value={profile?.weightKg || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  weightKg: Number(e.target.value),
                })
              }
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Altura */}
        <div>
          <label className="block mb-1 font-medium text-foreground">
            Altura (cm)
          </label>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-background">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              placeholder="Ex: 178"
              value={profile?.heightCm || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  heightCm: Number(e.target.value),
                })
              }
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Sexo */}
        <div>
          <label className="block mb-1 font-medium text-foreground">Sexo</label>

          <select
            value={profile?.sex || ""}
            onChange={(e) =>
              setProfile({ ...profile, sex: e.target.value })
            }
            className="w-full px-3 py-2 rounded-xl border bg-background outline-none"
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>

        {/* BOTÃO */}
        <Button
          onClick={saveProfile}
          variant="hero"
          size="lg"
          className="w-full rounded-xl"
          disabled={saving}
        >
          {saving ? "Salvando..." : "Salvar perfil"}
        </Button>

      </div>
    </div>
  );
}
