// src/app/api/auth/google/route.ts
import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";

const clientId = process.env.GOOGLE_CLIENT_ID;
console.log("DATABASE_URL da Vercel →", process.env.DATABASE_URL);

if (!clientId) {
  // Isso aparece só no LOG do servidor (Vercel)
  console.error("❌ GOOGLE_CLIENT_ID não definido no ambiente do servidor");
}

const client = new OAuth2Client(clientId);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const credential = body?.credential;

    console.log("🔹 [/api/auth/google] body recebido:", body ? "ok" : "vazio");

    if (!credential) {
      console.error("❌ Nenhuma credential recebida do frontend");
      return NextResponse.json(
        { error: "Credencial do Google não enviada" },
        { status: 400 }
      );
    }

    if (!clientId) {
      return NextResponse.json(
        { error: "Servidor sem GOOGLE_CLIENT_ID configurado" },
        { status: 500 }
      );
    }

    // 1) Validar token do Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    console.log("✅ Token Google validado. Payload:", {
      email: payload?.email,
      name: payload?.name,
    });

    if (!payload || !payload.email) {
      console.error("❌ Payload sem e-mail:", payload);
      return NextResponse.json(
        { error: "Token do Google inválido ou sem e-mail" },
        { status: 400 }
      );
    }

    const email = payload.email;
    const name = payload.name || null;
    const image = payload.picture || null;

    // 2) Upsert no banco (Prisma + Supabase)
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, image },
      create: {
        email,
        name,
        image,
      },
    });

    console.log("✅ Usuário salvo/atualizado no banco:", {
      id: user.id,
      email: user.email,
    });

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
  } catch (error: any) {
    console.error("🔥 Erro no login com Google:", error);

    // Devolve a mensagem também pra gente enxergar no Network -> Response
    return NextResponse.json(
      {
        error: "Erro no login com Google",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
