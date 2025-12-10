import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { error: "Credencial do Google não enviada" },
        { status: 400 }
      );
    }

    // Verifica se o token é válido e foi emitido para o seu app
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Token do Google inválido ou sem e-mail" },
        { status: 400 }
      );
    }

    const email = payload.email;
    const name = payload.name || null;
    const image = payload.picture || null;

    // Cria (ou atualiza) o usuário no banco
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, image },
      create: {
        email,
        name,
        image,
      },
    });

    // Retorna os dados básicos do usuário
    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no login com Google:", error);
    return NextResponse.json(
      { error: "Erro no login com Google" },
      { status: 500 }
    );
  }
}
