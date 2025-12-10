import { create } from "zustand";

// 1. Tipamos todos os dados do usuário (TypeScript)
interface UserData {
  nome: string;
  sobrenome: string;
  dataNascimento: string; // formato YYYY-MM-DD
  sexo: "masculino" | "feminino" | "";
  peso: number; // em kg
  altura: number; // em cm
  diasTreino: number;
  trabalhaSentado: boolean;
  trabalhaEmPe: boolean;
  atividadesExtras: boolean;
  objetivo?: string;
  dieta?: string;
  idade: number; // calculada
  nivelAtividade: number; // multiplicador
  tmb: number; // Taxa Metabólica Basal
  gcd: number; // Gasto Calórico Diário
}

// 2. Tipamos todas as funções que o store vai ter
interface UserStore {
  user: UserData;

  // Funções para atualizar os dados
  setUser: (data: Partial<UserData>) => void;

  // Funções de cálculo
  calcularIdade: () => void;
  calcularNivelAtividade: () => void;
  calcularTMB: () => void;
  calcularGCD: () => void;

  calcularTudo: () => void; // função final para calcular tudo
}

// 3. Criamos o store Zustand
export const useUserStore = create<UserStore>((set, get) => ({
  // 3.1 Estado inicial (todos os campos começam vazios ou zero)
  user: {
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    sexo: "",
    peso: 0,
    altura: 0,
    diasTreino: 0,
    trabalhaSentado: false,
    trabalhaEmPe: false,
    atividadesExtras: false,
    objetivo: "",
    dieta: "",
    idade: 0,
    nivelAtividade: 1.2,
    tmb: 0,
    gcd: 0,
  },

  // 3.2 Atualizar dados do usuário
  setUser: (data) =>
    set((state) => ({
      user: { ...state.user, ...data },
    })),

  // 3.3 CALCULAR IDADE
  calcularIdade: () => {
    const nascimento = get().user.dataNascimento;
    if (!nascimento) return;

    const hoje = new Date();
    const dataNasc = new Date(nascimento);

    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();

    // Se ainda não fez aniversário no ano atual
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }

    set((state) => ({
      user: { ...state.user, idade },
    }));
  },

  // 3.4 CALCULAR NIVEL DE ATIVIDADE
  calcularNivelAtividade: () => {
    const u = get().user;

    let multiplicador = 1.2; // base: sedentário

    if (u.trabalhaEmPe) multiplicador += 0.1;
    if (u.diasTreino >= 3) multiplicador += 0.15;
    if (u.diasTreino >= 5) multiplicador += 0.2;
    if (u.atividadesExtras) multiplicador += 0.1;

    // limite máximo igual ao da tabela padrão
    if (multiplicador > 1.9) multiplicador = 1.9;

    set((state) => ({
      user: { ...state.user, nivelAtividade: multiplicador },
    }));
  },

  // 3.5 CALCULAR TMB (Harris-Benedict)
  calcularTMB: () => {
    const u = get().user;

    let tmb = 0;

    if (u.sexo === "masculino") {
      tmb = 88.362 + 13.397 * u.peso + 4.799 * u.altura - 5.677 * u.idade;
    } else if (u.sexo === "feminino") {
      tmb = 447.593 + 9.247 * u.peso + 3.098 * u.altura - 4.33 * u.idade;
    }

    set((state) => ({
      user: { ...state.user, tmb: Math.round(tmb) },
    }));
  },

  // 3.6 CALCULAR GCD
  calcularGCD: () => {
    const u = get().user;

    const gcd = u.tmb * u.nivelAtividade;

    set((state) => ({
      user: { ...state.user, gcd: Math.round(gcd) },
    }));
  },

  // 3.7 CALCULAR TUDO
  calcularTudo: () => {
    const s = get();
    s.calcularIdade();
    s.calcularNivelAtividade();
    s.calcularTMB();
    s.calcularGCD();
  },
}));

// Somente para debug no navegador:
if (typeof window !== "undefined") {
  (window as any).userStore = useUserStore;
}
