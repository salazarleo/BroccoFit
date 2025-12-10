import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      name,
      birthDate,
      sex,
      weightKg,
      heightCm,
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId é obrigatório" },
        { status: 400 }
      );
    }

    // Converte a data (string yyyy-mm-dd) para Date, se vier
    let parsedBirthDate: Date | null = null;
    if (birthDate) {
      parsedBirthDate = new Date(birthDate);
      if (isNaN(parsedBirthDate.getTime())) {
        return NextResponse.json(
          { error: "Data de nascimento inválida" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name ?? undefined,
        birthDate: parsedBirthDate ?? undefined,
        sex: sex ?? undefined,
        weightKg: weightKg ?? undefined,
        heightCm: heightCm ?? undefined,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
          // devolvemos os campos de perfil também
          birthDate: updatedUser.birthDate,
          sex: updatedUser.sex,
          weightKg: updatedUser.weightKg,
          heightCm: updatedUser.heightCm,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao salvar perfil:", error);
    return NextResponse.json(
      { error: "Erro ao salvar perfil" },
      { status: 500 }
    );
  }
}
