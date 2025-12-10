"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  function loginWithGoogle() {
    alert("Login com Google...");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-14">
      {/* VOLTAR */}
      <div className="w-full max-w-2xl mb-10">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>

      {/* CONTAINER COM BORDA EM VOLTA DE TUDO */}
      <div
        className="
        w-full max-w-2xl 
        border border-border rounded-3xl 
        bg-card shadow-card 
        p-10 flex flex-col items-center text-center gap-8
      "
      >
        {/* LOGO + TÍTULO */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-display font-bold mt-9 leading-tight">
            Boas vindas ao <span className="text-primary font-display">BroccoFit</span>.
          </h1>
          <p className="text-foreground mt-5 text-base max-w-md leading-relaxed">
            Teste gratuitamente entrando com a sua conta Google para começar a aproveitar nossa plataforma.
          </p>
        </div>

        {/* CARD INTERNO */}
        <div className="w-full max-w-lg bg-card  p-4 rounded-2xl  flex flex-col items-center gap-6">
          {/* Botão Google */}
          <Button
            onClick={loginWithGoogle}
            size="lg"
            variant="secondary"
            className="w-full rounded-xl flex items-center justify-center gap-3 font-medium text-foreground shadow-button hover:scale-[1.01] transition-transform"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Entrar com o Google
          </Button>

          {/* Divisor */}
          <div className="w-full flex items-center gap-2 opacity-70">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-xs">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Termos */}
          <p className="text-center text-muted-foreground text-sm leading-relaxed">
            Ao continuar, você concorda com nossos{" "}
            <Link href="/termos" className="text-primary font-medium hover:underline">
              termos e condições
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
