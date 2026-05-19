const TELEGRAM_API_BASE_URL = "https://api.telegram.org";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const readJsonBody = async (req) => {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
};

const getLocalEnv = () => {
  if (typeof process === "undefined") {
    return {};
  }

  return process.env;
};

export const formatOrderMessage = (order) => {
  const customer = order.customer || {};
  const delivery = order.delivery || {};
  const items = Array.isArray(order.items) ? order.items : [];

  const itemLines = items
    .map((item, index) => {
      const lineTotal = Number(item.total || 0);
      return `${index + 1}. <a href="https://shepit-ceramics.com/admin/structure/product;legacy-product-${item.slug}">${escapeHtml(item.name)}</a> - ${escapeHtml(item.quantity)} x ${escapeHtml(item.price)} грн = ${escapeHtml(lineTotal)} грн`;
    })
    .join("\n");

  return [
    "<b>Нове замовлення Shepit Ceramics</b>",
    "",
    `<b>Сума:</b> ${escapeHtml(order.totalPrice)} грн`,
    "",
    "<b>Клієнт</b>",
    `Ім'я: ${escapeHtml(customer.firstName)} ${escapeHtml(customer.lastName)}`,
    `Телефон: ${escapeHtml(customer.phone)}`,
    `Email: ${escapeHtml(customer.email || "Не вказано")}`,
    "",
    "<b>Доставка</b>",
    `Спосіб: ${escapeHtml(delivery.method || "Нова пошта")}`,
    `Місто: ${escapeHtml(delivery.city)}`,
    `Відділення: ${escapeHtml(delivery.warehouse)}`,
    `Номер відділення: ${escapeHtml(delivery.warehouseNumber || "Не визначено")}`,
    "",
    "<b>Товари</b>",
    itemLines || "Товари не передані",
    "",
    `<b>Коментар:</b> ${escapeHtml(customer.comment || "Без коментаря")}`,
  ].join("\n");
};

export const sendOrderToTelegram = async (order, env = getLocalEnv()) => {
  const localEnv = getLocalEnv();
  const botToken = env.TELEGRAM_BOT_TOKEN || localEnv.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID || localEnv.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    const error = new Error("Відправку в Telegram не налаштовано.");
    error.statusCode = 500;
    throw error;
  }

  const text = formatOrderMessage(order);
  const telegramResponse = await fetch(`${TELEGRAM_API_BASE_URL}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const telegramResult = await telegramResponse.json();

  if (!telegramResponse.ok || !telegramResult.ok) {
    const error = new Error(telegramResult.description || "Telegram не прийняв замовлення.");
    error.statusCode = 502;
    throw error;
  }
};

export const localSendOrderHandler = async (req, res, env) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return sendJson(res, 405, { ok: false, error: "Method not allowed" });
    }

    const order = await readJsonBody(req);
    await sendOrderToTelegram(order, env);

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return sendJson(res, error.statusCode || 400, {
      ok: false,
      error: error instanceof Error ? error.message : "Некоректні дані замовлення.",
    });
  }
};
