import type { IncomingMessage, ServerResponse } from "node:http";

type OrderEnv = {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
};

export function formatOrderMessage(order: unknown): string;

export function sendOrderToTelegram(order: unknown, env?: OrderEnv): Promise<void>;

export function localSendOrderHandler(
  req: IncomingMessage,
  res: ServerResponse,
  env?: OrderEnv,
): Promise<void>;
