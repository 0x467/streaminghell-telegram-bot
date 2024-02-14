import "dotenv/config";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);
bot.on("message:text", (ctx) => ctx.reply("Echo: " + ctx.message.text));
bot.start();
