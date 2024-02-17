import { Context, session as _session, StorageAdapter } from "grammy";
import { type Kv, openKv } from "@deno/kv";
import { LinksLayout, type SessionData } from "../types.js";

export class KVAdapter<T> implements StorageAdapter<T> {
  constructor(private kv: Kv) {}

  async read(key: string): Promise<T | undefined> {
    const result = await this.kv.get(["sessions", key]);
    return result.value !== null ? (result.value as T) : undefined;
  }

  async write(key: string, value: T) {
    await this.kv.set(["sessions", key], value);
  }

  async delete(key: string) {
    await this.kv.delete(["sessions", key]);
  }
}

const initial = (): SessionData => {
  return {
    locale: "en",
    links_layout: LinksLayout.COMBINED,
    show_buy_links: true,
  };
};

const getSessionKey = (ctx: Context): string | undefined => {
  if (ctx.update.inline_query) return "public";

  return ctx.from === undefined || ctx.chat === undefined
    ? undefined
    : `${ctx.from.id}:${ctx.chat.id}`;
};

const kv = await openKv(process.env.KV_PATH);

export const session = _session({
  initial,
  getSessionKey,
  storage: new KVAdapter<SessionData>(kv),
});
