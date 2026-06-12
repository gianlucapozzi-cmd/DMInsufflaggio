import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "https://automations.wolfoncloud.com/webhook/0dbaf1af-0413-4723-b8a9-b086194c025b";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = {
      nome: String(body.nome ?? ""),
      telefono: String(body.telefono ?? ""),
      email: String(body.email ?? ""),
      comune: String(body.comune ?? ""),
      tipo: String(body.tipo ?? ""),
      messaggio: String(body.messaggio ?? ""),
      data: new Date().toISOString(),
      sorgente: "dm-insufflaggio.it",
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Il servizio di invio non è disponibile." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Errore durante l'invio della richiesta." }, { status: 500 });
  }
}
