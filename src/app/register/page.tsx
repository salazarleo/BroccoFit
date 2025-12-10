"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Callback chamado pelo Google
  async function handleGoogleResponse(response: any) {
    try {
      setIsLoading(true);

      const token = response.credential;
      if (!token) {
        alert("Token do Google não recebido.");
        return;
      }

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: token }),
      });

      if (!res.ok) {
        alert("Erro ao autenticar. Tente novamente.");
        return;
      }

      const data = await res.json();
      const user = data.user;

      localStorage.setItem("broccofit_user", JSON.stringify(user));

      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Erro inesperado ao logar.");
    } finally {
      setIsLoading(false);
    }
  }

  // Ação do botão
  function loginWithGoogle() {
    if (!window.google?.accounts?.id) {
      alert("Google API ainda não carregou.");
      return;
    }

    window.google.accounts.id.prompt();
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Google script loaded!");

          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: handleGoogleResponse,
            ux_mode: "popup",
          });
        }}
      />

      <div className="min-h-screen bg-background flex flex-col items-center px-4 py-14">

        {/* VOLTAR */}
        <div className="w-full max-w-2xl mb-10">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>

        {/* CONTAINER */}
        <div className="w-full max-w-2xl border border-border rounded-3xl bg-card shadow-card p-10 flex flex-col items-center text-center gap-8">

          <h1 className="text-4xl font-display font-bold mt-9">
            Boas vindas ao <span className="text-primary">BroccoFit</span>.
          </h1>

          <p className="text-foreground mt-5 text-base max-w-md">
            Teste gratuitamente entrando com a sua conta Google.
          </p>

          <div className="w-full max-w-lg bg-card p-4 rounded-2xl flex flex-col items-center gap-6">

            <Button
              onClick={loginWithGoogle}
              size="lg"
              variant="secondary"
              disabled={isLoading}
              className="w-full rounded-xl flex items-center justify-center gap-3"
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              {isLoading ? "Conectando..." : "Entrar com o Google"}
            </Button>

          </div>
        </div>
      </div>
    </>
  );
}
