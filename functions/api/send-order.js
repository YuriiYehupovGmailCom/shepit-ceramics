import { sendOrderToTelegram } from "../../api/telegram-order.js";

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
      status: 405,
      headers: {
        Allow: "POST",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }

  try {
    const order = await request.json();
    await sendOrderToTelegram(order, env);

    return json({ ok: true });
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Некоректні дані замовлення.",
      },
      error.statusCode || 400,
    );
  }
}
