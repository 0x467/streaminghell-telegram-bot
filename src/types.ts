import { Context, SessionFlavor } from "grammy";
import { I18nFlavor } from "@grammyjs/i18n";

export enum LinksLayout {
  SEPARATE = 1,
  COMBINED = 2,
  MINIMAL = 3,
}

export type SessionData = {
  locale: string;
  links_layout: LinksLayout;
  show_buy_links: boolean;
};

export type BotContext = Context & SessionFlavor<SessionData> & I18nFlavor;

export type EntityType = "song" | "album";

export type APIProvider =
  | "spotify"
  | "itunes"
  | "youtube"
  | "google"
  | "pandora"
  | "deezer"
  | "tidal"
  | "amazon"
  | "soundcloud"
  | "napster"
  | "yandex"
  | "spinrilla"
  | "audius"
  | "audiomack"
  | "anghami"
  | "boomplay";

export type Platform =
  | "spotify"
  | "itunes"
  | "appleMusic"
  | "youtube"
  | "youtubeMusic"
  | "google"
  | "googleStore"
  | "pandora"
  | "deezer"
  | "tidal"
  | "amazonStore"
  | "amazonMusic"
  | "soundcloud"
  | "napster"
  | "yandex"
  | "spinrilla"
  | "audius"
  | "audiomack"
  | "anghami"
  | "boomplay";

export type OdesliResponse = {
  // The unique ID for the input entity that was supplied in the request. The
  // data for this entity, such as title, artistName, etc. will be found in
  // an object at `nodesByUniqueId[entityUniqueId]`
  entityUniqueId: string;

  // The userCountry query param that was supplied in the request. It signals
  // the country/availability we use to query the streaming platforms. Defaults
  // to 'US' if no userCountry supplied in the request.
  //
  // NOTE: As a fallback, our service may respond with matches that were found
  // in a locale other than the userCountry supplied
  userCountry: string;

  // A URL that will render the Songlink page for this entity
  pageUrl: string;

  // A collection of objects. Each key is a platform, and each value is an
  // object that contains data for linking to the match
  linksByPlatform: {
    // Each key in `linksByPlatform` is a Platform. A Platform will exist here
    // only if there is a match found. E.g. if there is no YouTube match found,
    // then neither `youtube` or `youtubeMusic` properties will exist here
    [key in Platform]: {
      country: string;

      // The unique ID for this entity. Use it to look up data about this entity
      // at `entitiesByUniqueId[entityUniqueId]`
      entityUniqueId: string;

      // The URL for this match
      url: string;

      // The native app URI that can be used on mobile devices to open this
      // entity directly in the native app
      nativeAppUriMobile?: string;

      // The native app URI that can be used on desktop devices to open this
      // entity directly in the native app
      nativeAppUriDesktop?: string;
    };
  };

  // A collection of objects. Each key is a unique identifier for a streaming
  // entity, and each value is an object that contains data for that entity,
  // such as `title`, `artistName`, `thumbnailUrl`, etc.
  entitiesByUniqueId: {
    [key: string]: {
      // This is the unique identifier on the streaming platform/API provider
      id: string;

      type: EntityType;

      title?: string;
      artistName?: string;
      thumbnailUrl?: string;
      thumbnailWidth?: number;
      thumbnailHeight?: number;

      // The API provider that powered this match. Useful if you'd like to use
      // this entity's data to query the API directly
      apiProvider: APIProvider;

      // An array of platforms that are "powered" by this entity. E.g. an entity
      // from Apple Music will generally have a `platforms` array of
      // `["appleMusic", "itunes"]` since both those platforms/links are derived
      // from this single entity
      platforms: Platform[];
    };
  };
};

export type GetLinksParams = {
  id?: string;
  type?: EntityType;
  platform?: Platform;
  platformSlug?: string;
  url?: string;
};

export type Link = {
  name: string;
  logo: string;
  url: string;
};

export type GetLinks = OdesliResponse & {
  entity: OdesliResponse["entitiesByUniqueId"][""];
  links: Link[][];
};
