"use client";

import { useEffect, useState } from "react";

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold">Seu Perfil</h1>

      {/* Nome */}
      <input
        className="input"
        type="text"
        value={profile?.name || ""}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />

      {/* Data de nascimento */}
      <input
        className="input"
        type="date"
        value={profile?.birthDate?.split("T")[0] || ""}
        onChange={(e) =>
          setProfile({ ...profile, birthDate: e.target.value })
        }
      />

      {/* Peso */}
      <input
        className="input"
        type="number"
        placeholder="Peso (kg)"
        value={profile?.weightKg || ""}
        onChange={(e) =>
          setProfile({ ...profile, weightKg: Number(e.target.value) })
        }
      />

      {/* Altura */}
      <input
        className="input"
        type="number"
        placeholder="Altura (cm)"
        value={profile?.heightCm || ""}
        onChange={(e) =>
          setProfile({ ...profile, heightCm: Number(e.target.value) })
        }
      />

      {/* Sexo */}
      <select
        className="input"
        value={profile?.sex || ""}
        onChange={(e) =>
          setProfile({ ...profile, sex: e.target.value })
        }
      >
        <option value="">Selecione</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
      </select>

      <button
        onClick={saveProfile}
        className="btn-primary"
        disabled={saving}
      >
        {saving ? "Salvando..." : "Salvar perfil"}
      </button>
    </div>
  );
}
