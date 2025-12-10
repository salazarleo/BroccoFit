import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =======================
// GET → Buscar perfil
// =======================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Erro no GET /profile:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// =======================
// POST → Atualizar perfil
// =======================
export async function POST(req: Request) {
  try {
    const { id, name, birthDate, sex, weightKg, heightCm } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });
    }

    let parsedDate: Date | null = null;
    if (birthDate) {
      parsedDate = new Date(birthDate);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "Data inválida" }, { status: 400 });
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: name ?? undefined,
        birthDate: parsedDate ?? undefined,
        sex: sex ?? undefined,
        weightKg: weightKg ?? undefined,
        heightCm: heightCm ?? undefined,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Erro no POST /profile:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
