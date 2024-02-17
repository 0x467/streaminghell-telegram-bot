import { providers } from "./platforms.js";
import {
  type GetLinks,
  type GetLinksParams,
  type OdesliResponse,
} from "./types.js";

export class LinksService {
  public async getLinks(params: GetLinksParams): Promise<GetLinks> {
    const odesliParams = { ...params };

    // Convert platform slug to platform name
    if (odesliParams.platformSlug) {
      odesliParams.platform = providers.find(
        (v) => v.slug === odesliParams.platformSlug,
      )!.key;
      delete odesliParams.platformSlug;
    }

    // Shazam link processing
    if (odesliParams.url?.includes("shazam.com")) {
      const [_, trackId] = new URL(odesliParams.url).pathname
        .split("/")
        .filter((part) => !isNaN(part as unknown as number));

      const resp = await fetch(
        `https://www.shazam.com/discovery/v5/en-US/US/web/-/track/${trackId}`,
      );
      const respBody = await resp.json();
      const url = respBody.hub?.options[0]?.actions[0]?.uri;
      if (!url) throw Error("");
      odesliParams.url = url;
    }

    const queryParams = new URLSearchParams({
      key: process.env.ODESLI_API_KEY!,
    });

    Object.entries(odesliParams).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });

    const resp = await fetch(
      `https://api.song.link/v1-alpha.1/links?${queryParams.toString()}`,
    );
    const respBody = await resp.json();

    if (respBody.statusCode) {
      throw Error(respBody.code);
    }

    const data = respBody as OdesliResponse;
    const entity = data.entitiesByUniqueId[data.entityUniqueId];

    // replace page url
    data.pageUrl = [
      "https:/",
      process.env.DOMAIN,
      entity.type,
      providers.find((v) => v.key === entity.platforms[0])!.slug,
      entity.id,
    ].join("/");

    const links = Object.entries(data.linksByPlatform)
      // filter not exists platforms
      .filter(([platformName]) => providers.find((v) => v.key === platformName))
      // split to "Listen" and "Buy" arrays
      .reduce(
        (output, [platformName, links]) => {
          const platform = providers.find((v) => v.key === platformName)!;
          const link = {
            name: platform.name,
            logo: platform.logo,
            url: links.url,
          };
          platform.isStore ? output[1].push(link) : output[0].push(link);
          return output;
        },
        [[], []] as { name: string; logo: string; url: string }[][],
      );

    return { ...data, entity, links };
  }

  isLinkSupported(url: string) {
    return url && providers.some((provider) => provider.isURISupported(url));
  }
}
