import { Platform } from "./types.js";

export const providers: {
  name: string;
  key: Platform;
  slug: string;
  isURISupported: (v: string) => boolean;
  isStore: boolean;
  logo: string;
}[] = [
  {
    name: "Anghami",
    key: "anghami",
    slug: "ah",
    isURISupported: (uri) => uri.includes("play.anghami.com"),
    isStore: false,
    logo: "/images/providers-logo/anghami.svg",
  },
  {
    name: "Amazon Music",
    key: "amazonMusic",
    slug: "a",
    isURISupported: (uri) => uri.includes("music.amazon.com"),
    isStore: false,
    logo: "/images/providers-logo/amazon-music.svg",
  },
  {
    name: "Amazon Store",
    key: "amazonStore",
    slug: "a",
    isURISupported: (uri) => uri.includes("amazon.com"),
    isStore: true,
    logo: "/images/providers-logo/amazon.svg",
  },
  {
    name: "Apple Music",
    key: "appleMusic",
    slug: "i",
    isURISupported: (uri) => uri.includes("music.apple.com"),
    isStore: false,
    logo: "/images/providers-logo/apple-music.svg",
  },
  {
    name: "Audius",
    key: "audius",
    slug: "au",
    isURISupported: (uri) => uri.includes("audius.co"),
    isStore: false,
    logo: "/images/providers-logo/audius.svg",
  },
  {
    name: "Audiomack",
    key: "audiomack",
    slug: "am",
    isURISupported: (uri) => uri.includes("audiomack.com"),
    isStore: false,
    logo: "/images/providers-logo/audiomack.svg",
  },
  {
    name: "Bandcamp",
    // @ts-expect-error
    key: "bandcamp",
    slug: "b",
    isURISupported: (uri) => uri.includes("bandcamp.com"),
    isStore: true,
    logo: "/images/providers-logo/bandcamp.svg",
  },
  {
    name: "Boomplay",
    key: "boomplay",
    slug: "bp",
    isURISupported: (uri) => uri.includes("boomplay.com"),
    isStore: false,
    logo: "/images/providers-logo/boomplay.svg",
  },
  {
    name: "Deezer",
    key: "deezer",
    slug: "d",
    isURISupported: (uri) => uri.includes("deezer.com"),
    isStore: false,
    logo: "/images/providers-logo/deezer.svg",
  },
  {
    name: "Google Play Music",
    key: "google",
    slug: "g",
    isURISupported: (uri) => uri.includes("play.google.com"),
    isStore: false,
    logo: "/images/providers-logo/google-music.svg",
  },
  {
    name: "Google Play Store",
    key: "googleStore",
    slug: "g",
    isURISupported: (uri) => uri.includes("play.google.com"),
    isStore: true,
    logo: "/images/providers-logo/google-play.svg",
  },
  {
    name: "iTunes",
    key: "itunes",
    slug: "i",
    isURISupported: (uri) => uri.includes("itunes.apple.com"),
    isStore: true,
    logo: "/images/providers-logo/itunes.svg",
  },
  {
    name: "Napster",
    key: "napster",
    slug: "n",
    isURISupported: (uri) => uri.includes("napster.com"),
    isStore: false,
    logo: "/images/providers-logo/napster.svg",
  },
  {
    name: "Pandora",
    key: "pandora",
    slug: "p",
    isURISupported: (uri) => uri.includes("pandora.com"),
    isStore: false,
    logo: "/images/providers-logo/pandora.svg",
  },
  {
    name: "Shazam",
    // @ts-expect-error
    key: "shazam",
    slug: "sh",
    isURISupported: (uri) => uri.includes("shazam.com"),
    isStore: false,
    logo: "",
  },
  {
    name: "Spinrilla",
    key: "spinrilla",
    slug: "sp",
    isURISupported: (uri) => uri.includes("spinrilla.com"),
    isStore: false,
    logo: "/images/providers-logo/spinrilla.svg",
  },
  {
    name: "SoundCloud",
    key: "soundcloud",
    slug: "sc",
    isURISupported: (uri) => uri.includes("soundcloud.com"),
    isStore: false,
    logo: "/images/providers-logo/soundcloud.svg",
  },
  {
    name: "Spotify",
    key: "spotify",
    slug: "s",
    isURISupported: (uri) =>
      ["spotify.com", "spotify.link"].some((domain) => uri.includes(domain)),
    isStore: false,
    logo: "/images/providers-logo/spotify.svg",
  },
  {
    name: "Tidal",
    key: "tidal",
    slug: "t",
    isURISupported: (uri) => uri.includes("listen.tidal.com"),
    isStore: false,
    logo: "/images/providers-logo/tidal.svg",
  },
  {
    name: "YouTube",
    key: "youtube",
    slug: "y",
    isURISupported: (uri) => {
      return uri.includes("youtube.com") && !uri.includes("/shorts/");
    },
    isStore: false,
    logo: "/images/providers-logo/youtube.svg",
  },
  {
    name: "YouTube Music",
    key: "youtubeMusic",
    slug: "y",
    isURISupported: (uri) => uri.includes("music.youtube.com"),
    isStore: false,
    logo: "/images/providers-logo/youtube-music.svg",
  },
  {
    name: "Yandex.Music",
    key: "yandex",
    slug: "ya",
    isURISupported: (uri) =>
      ["music.yandex.com", "music.yandex.ru", "music.yandex.by"].some(
        (domain) => uri.includes(domain),
      ),
    isStore: false,
    logo: "/images/providers-logo/yandex.svg",
  },
];
