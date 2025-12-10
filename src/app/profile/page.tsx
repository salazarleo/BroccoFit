"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft, User, Calendar, Scale, Ruler } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

type LoggedUser = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  birthDate?: string | null;
  sex?: string | null;
  weightKg?: number | null;
  heightCm?: number | null;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<LoggedUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    dataNascimento: "",
    sexo: "",
    peso: "",
    altura: "",
  });

  // Carrega usuário do localStorage ao abrir a página
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("broccofit_user");

    if (!stored) {
      // Se não tiver usuário logado, volta pra tela de registro
      router.push("/register");
      return;
    }

    try {
      const parsed: LoggedUser = JSON.parse(stored);
      setUser(parsed);

      // Pré-preenche o formulário com o que tivermos
      setForm((prev) => ({
        ...prev,
        nome: parsed.name || "",
        // se um dia você buscar birthDate do backend, pode converter aqui
        peso: parsed.weightKg ? String(parsed.weightKg) : "",
        altura: parsed.heightCm ? String(parsed.heightCm) : "",
        sexo: parsed.sex || "",
        // dataNascimento: se já tiver no backend, converter Date -> yyyy-mm-dd
        dataNascimento: "",
      }));
    } catch (err) {
      console.error("Erro ao ler usuário do localStorage:", err);
      router.push("/register");
    }
  }, [router]);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSaving(true);

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          name: form.nome,
          birthDate: form.dataNascimento, // yyyy-mm-dd
          sex: form.sexo,
          weightKg: Number(form.peso),
          heightCm: Number(form.altura),
        }),
      });

      if (!res.ok) {
        console.error("Erro ao salvar perfil");
        alert("Erro ao salvar perfil. Tente novamente.");
        return;
      }

      const data = await res.json();
      const updatedUser: LoggedUser = data.user;

      // Atualiza o localStorage com o usuário atualizado
      if (typeof window !== "undefined") {
        localStorage.setItem("broccofit_user", JSON.stringify(updatedUser));
      }

      alert("Perfil salvo com sucesso!");
      // se quiser já mandar pra próxima etapa:
      // router.push("/lifestyle");
    } catch (err) {
      console.error("Erro inesperado ao salvar perfil:", err);
      alert("Erro inesperado ao salvar perfil.");
    } finally {
      setIsSaving(false);
    }
  }

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
          Complete seu perfil
        </h1>

        <p className="text-muted-foreground mt-1">
          Esses dados serão usados para calcular sua TMB
        </p>
      </div>

      {/* CARD DO FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-lg bg-card border border-border p-8 rounded-2xl shadow-card flex flex-col gap-5"
      >
        {/* Nome */}
        <div>
          <label className="block mb-1 font-medium text-foreground">
            Nome completo
          </label>

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
          <label className="block mb-1 font-medium text-foreground">
            Data de nascimento
          </label>

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
          <label className="block mb-1 font-medium text-foreground">
            Peso (kg)
          </label>

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
          <label className="block mb-1 font-medium text-foreground">
            Altura (cm)
          </label>

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
        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full rounded-xl"
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar perfil"}
        </Button>

        {/* Ir para próxima etapa */}
        <p className="text-center text-muted-foreground text-sm mt-2">
          Pronto?{" "}
          <Link
            href="/lifestyle"
            className="text-primary font-medium hover:underline"
          >
            Continuar para Estilo de Vida →
          </Link>
        </p>
      </form>
    </div>
  );
}
