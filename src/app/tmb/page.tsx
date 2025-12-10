"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";

export default function TMBResultPage() {
  const user = useUserStore((state) => state.user);

  return (
    <main className="min-h-screen bg-[#0F172A] text-white px-6 py-10 flex flex-col items-center">
      {/* TÍTULO */}
      <h1 className="text-3xl font-bold text-[#3A86FF]">Seu Resultado</h1>
      <p className="mt-2 text-gray-300 text-center max-w-md">
        Aqui está uma estimativa da sua TMB e do seu gasto diário.
      </p>

      {/* CARD PRINCIPAL */}
      <div className="mt-8 w-full max-w-md bg-white/10 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-center mb-4 text-blue-300">Dados calculados</h2>

        {/* Idade */}
        <div className="flex justify-between py-2 border-b border-gray-700">
          <span className="text-gray-300">Idade</span>
          <span className="font-semibold">{user.idade} anos</span>
        </div>

        {/* TMB */}
        <div className="flex justify-between py-2 border-b border-gray-700">
          <span className="text-gray-300">TMB</span>
          <span className="font-semibold">{user.tmb} kcal</span>
        </div>

        {/* Nível de Atividade */}
        <div className="flex justify-between py-2 border-b border-gray-700">
          <span className="text-gray-300">Nível de atividade</span>
          <span className="font-semibold">{user.nivelAtividade}</span>
        </div>

        {/* Gasto Calórico Diário */}
        <div className="flex justify-between py-2">
          <span className="text-gray-300">Gasto diário estimado</span>
          <span className="font-semibold text-green-400">{user.gcd} kcal</span>
        </div>
      </div>

      {/* EXPLICAÇÃO */}
      <div className="mt-8 w-full max-w-md bg-white/5 border border-gray-700 rounded-xl p-5 text-gray-300 text-sm backdrop-blur-sm">
        <h3 className="font-semibold text-blue-200 mb-2">O que é TMB?</h3>
        <p>
          A Taxa Metabólica Basal (TMB) é a quantidade de energia que seu corpo gasta em repouso completo. Ela depende
          de fatores como idade, sexo, peso e altura.
        </p>

        <h3 className="font-semibold text-blue-200 mt-4 mb-2">Gasto Diário (GCD)</h3>
        <p>
          O Gasto Calórico Diário (GCD) é a TMB multiplicada pelo seu nível de atividade física. Ele estima quantas
          calorias você gasta por dia considerando seu estilo de vida.
        </p>
      </div>

      {/* BOTÃO PRÓXIMO */}
      <Link
        href="/setup-training"
        className="mt-10 rounded-lg bg-[#3A86FF] px-6 py-3 font-semibold hover:bg-blue-500 transition"
      >
        Continuar → Setup de Treinos
      </Link>
    </main>
  );
}
