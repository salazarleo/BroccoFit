export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-[#3A86FF]">Dashboard</h1>
      <p className="mt-2 text-gray-300 text-center max-w-md">
        A tela de dashboard exibe um resumo dos principais indicadores: TMB, gasto calórico diário estimado, total de
        calorias gastas na semana com treinos e cardio, e outras métricas que ajudarão o usuário a ter clareza do seu
        progresso.
      </p>
    </main>
  );
}
