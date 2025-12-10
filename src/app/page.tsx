// src/app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ArrowRight, Calendar, Dumbbell, Heart, Target, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto h-16 px-4 relative flex items-center justify-center">
          {/* LOGO - alinhada à esquerda */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Logo />
          </div>

          {/* NAV CENTRALIZADO */}
          <nav className="hidden md:flex items-center gap-8 text-center">
            <a href="#features" className="text text-foreground hover:text-foreground transition-colors">
              Funcionalidades
            </a>
            <a href="#how-it-works" className="text text-foreground hover:text-foreground transition-colors">
              Como funciona
            </a>
          </nav>

          {/* BOTÕES - alinhados à direita */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/register">Login</Link>
            </Button>

            <Button asChild variant="hero" size="sm">
              <Link href="/register">Começar grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-25 pb-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-primary border border-border/60 
                text-foreground text-sm font-medium mb-6 animate-fade-up"
            >
              <Target className="w-4 h-4" />
              Gerencie seus treinos de forma inteligente
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
              BroccoFit: organize seus treinos,
              <span className="text-gradient"> cardio</span> e <span className="text-gradient">calorias</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto animate-fade-up animation-delay-200">
              Cadastre seus treinos, acompanhe seu cardio e visualize seu progresso em um calendário intuitivo. Simples,
              rápido e eficiente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
              <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                <Link href="/register">
                  Começar agora
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3"></div>
              <Button asChild variant="ghost" size="xl" className="w-full sm:w-auto">
                <a href="#features">Ver funcionalidades</a>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-up animation-delay-400">
            {[
              { number: "100%", label: "Projeto pessoal" },
              { number: "5 min", label: "Para configurar o básico" },
              { number: "∞", label: "Treinos cadastrados" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card shadow-card">
                <div className="font-display text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Tudo que você precisa</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ferramentas simples e poderosas para você alcançar seus objetivos fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Dumbbell,
                title: "Cadastro de Treinos",
                description: "Registre seus treinos fixos da semana com calorias médias gastas.",
              },
              {
                icon: Heart,
                title: "Cardio Tracking",
                description: "Acompanhe suas sessões de cardio por minutos ou quilômetros.",
              },
              {
                icon: Calendar,
                title: "Calendário Inteligente",
                description: "Visualize e registre o que foi feito em cada dia de treino.",
              },
              {
                icon: TrendingUp,
                title: "Resumo e Progresso",
                description: "Veja o total de calorias gastas e acompanhe sua evolução.",
              },
              {
                icon: Target,
                title: "Baseado na sua TMB",
                description: "Use sua TMB e nível de atividade para entender seu gasto diário.",
              },
              {
                icon: ArrowRight,
                title: "Interface Simples",
                description: "Design limpo e intuitivo para você focar no que importa: treinar.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Como funciona</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Em poucos passos você já está pronto para acompanhar seus treinos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Crie seu perfil",
                description: "Cadastro básico com dados pessoais.",
              },
              {
                step: "02",
                title: "Defina seu estilo de vida",
                description: "Informações para calcular TMB e GCD.",
              },
              {
                step: "03",
                title: "Cadastre treinos e cardio",
                description: "Configure seus treinos fixos e tipos de cardio.",
              },
              {
                step: "04",
                title: "Acompanhe no calendário",
                description: "Registre seu dia e veja o gasto calórico.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-button">
                  <span className="font-display font-bold text-primary-foreground text-lg">{item.step}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {index < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="hero" size="xl">
              <Link href="/register">
                Começar agora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BroccoFit. Projeto pessoal do Leonardo Salazar.
          </p>
        </div>
      </footer>
    </div>
  );
}
