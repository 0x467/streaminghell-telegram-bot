import "dotenv/config";
import { Bot, GrammyError, HttpError } from "grammy";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { session } from "./middlewares/session.js";
import { i18n } from "./middlewares/i18n.js";
import { commands } from "./handlers/commands.js";
import { links } from "./handlers/links.js";

Sentry.init({
  dsn: process.env.SENTRY_DSN!,
  integrations: [new ProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

const bot = new Bot(process.env.BOT_TOKEN!);

bot.catch((err) => {
  Sentry.captureException(err);
  console.log(err.ctx);
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.use(session);
bot.use(i18n);
bot.use(commands);
bot.use(links);

bot.start();
