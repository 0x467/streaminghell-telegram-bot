import { I18n } from "@grammyjs/i18n";
import { BotContext } from "../types.js";

export const i18n = new I18n<BotContext>({
  defaultLocale: "en",
  directory: "locales",
  useSession: true,
  localeNegotiator: (ctx) =>
    ctx.session.locale ?? ctx.from?.language_code ?? "en",
});
