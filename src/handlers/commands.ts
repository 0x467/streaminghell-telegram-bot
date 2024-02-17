import { Composer } from "grammy";
import { type BotContext, LinksLayout } from "../types.js";
import { i18n } from "../middlewares/i18n.js";

const c = new Composer<BotContext>();

c.command("start", async (ctx) => {
  await ctx.reply(ctx.t("cmd_start"));
});

c.command("services", async (ctx) => {
  await ctx.reply(ctx.t("cmd_services"));
});

c.command("contacts", async (ctx) => {
  await ctx.reply(ctx.t("cmd_contacts"));
});

c.command("lang", async (ctx) => {
  if (ctx.match === "") {
    return await ctx.reply(
      ctx.t("cmd_lang", { currentLanguage: ctx.session.locale }),
      { parse_mode: "HTML" },
    );
  }

  // `i18n.locales` contains all the locales that have been registered
  if (!i18n.locales.includes(ctx.match)) {
    return await ctx.reply(ctx.t("cmd_lang_unsupported"), {
      parse_mode: "HTML",
    });
  }

  // `ctx.i18n.getLocale` returns the locale currently using.
  // if ((await ctx.i18n.getLocale()) === ctx.match) {
  //   return await ctx.reply(ctx.t("language.already-set"));
  // }

  ctx.session.locale = ctx.match;
  await ctx.i18n.renegotiateLocale();
  await ctx.reply(ctx.t("cmd_lang_installed"));
});

c.command("layout", async (ctx) => await ctx.reply(ctx.t("cmd_layout")));

c.command("set_layout_separate", async (ctx) => {
  ctx.session.links_layout = LinksLayout.SEPARATE;
  await ctx.reply(ctx.t("cmd_layout_installed"));
});

c.command("set_layout_combined", async (ctx) => {
  ctx.session.links_layout = LinksLayout.COMBINED;
  await ctx.reply(ctx.t("cmd_layout_installed"));
});

c.command("set_layout_minimal", async (ctx) => {
  ctx.session.links_layout = LinksLayout.MINIMAL;
  await ctx.reply(ctx.t("cmd_layout_installed"));
});

export { c as commands };
