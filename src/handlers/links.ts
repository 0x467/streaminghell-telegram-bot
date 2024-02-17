import { Composer } from "grammy";
import { type BotContext, LinksLayout } from "../types.js";
import { LinksService } from "../links-service.js";

const c = new Composer<BotContext>();
const linksService = new LinksService();

c.on("message:entities:url", async (ctx) => {
  let url = "";

  const inlineLink = ctx.message.entities.find(
    (entity) => entity.type === "text_link",
  );
  const link = ctx.message.entities.find((entity) => entity.type === "url");

  // @ts-expect-error wrong typing in grammy
  if (inlineLink) url = inlineLink!.url;
  if (link) {
    url = ctx.message.text.slice(link.offset, link.offset + link.length);
  }

  if (!linksService.isLinkSupported(url)) {
    if (ctx.chat.type === "private") {
      return await ctx.reply(ctx.t("no_links"));
    }
    return;
  }

  await ctx.replyWithChatAction("typing");

  try {
    const { entity, pageUrl, links } = await linksService.getLinks({ url });

    let message: string[] = [];

    message.push(
      `<a href="${pageUrl}">${entity.artistName} - ${entity.title}</a>\n`,
    );

    // Compose message text for 'SEPARATE' layout
    if (ctx.session.links_layout === LinksLayout.SEPARATE) {
      message.push("\n<strong>🎧 Listen</strong>\n");
      message = [
        ...message,
        ...links[0].map((link) => `<a href="${link.url}">${link.name}</a>\n`),
      ];

      if (links[1].length > 0) {
        message.push("\n<strong>🛍 Buy</strong>\n");
        message = [
          ...message,
          ...links[1].map((link) => `<a href="${link.url}">${link.name}</a>\n`),
        ];
      }
    }

    const allLinks = [...links[0], ...links[1]];

    // Compose message text for 'COMBINED' layout
    if (ctx.session.links_layout === LinksLayout.COMBINED) {
      allLinks.forEach(({ name, url }, index) => {
        message.push(
          `${index === 0 ? "\n" : ""}<a href="${url}">${name}</a>\n`,
        );
      });
    }

    // Compose message text for 'MINIMAL' layout
    if (ctx.session.links_layout === LinksLayout.MINIMAL) {
      allLinks.forEach(({ name, url }, index) => {
        message.push(
          `<a href="${url}">${name}</a>${
            allLinks.length - 1 === index ? "" : " | "
          }`,
        );
      });
    }

    // Send message
    if (entity.thumbnailUrl) {
      await ctx.replyWithPhoto(entity.thumbnailUrl, {
        caption: message.join(""),
        parse_mode: "HTML",
      });
    } else {
      await ctx.reply(message.join(""), { parse_mode: "HTML" });
    }
  } catch (error) {
    console.error(error);
    return await ctx.reply(ctx.t("no_data_by_link"));
  }
});

c.on("message").filter(
  (ctx) => ctx.chat?.type === "private",
  async (ctx) => {
    await ctx.reply(ctx.t("no_links"));
  },
);

export { c as links };
