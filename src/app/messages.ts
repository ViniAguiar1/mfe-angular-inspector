export const LOCALES = ["pt", "en", "es", "jp", "fr"] as const
export type Locale = (typeof LOCALES)[number]

export function resolveLocale(value: string): Locale {
  return (LOCALES as readonly string[]).includes(value) ? (value as Locale) : "pt"
}

type Messages = {
  title: string
  framework: string
  origin: string
  build: string
  cost: string
  cached: string
  ping: string
}

export const MESSAGES: Record<Locale, Messages> = {
  pt: {
    title: "Este painel é um app Angular com deploy próprio",
    framework: "Framework",
    origin: "Carregado de",
    build: "Build",
    cost: "Custo deste módulo",
    cached: "cache",
    ping: "Enviar evento para o site",
  },
  en: {
    title: "This panel is an Angular app with its own deploy",
    framework: "Framework",
    origin: "Loaded from",
    build: "Build",
    cost: "Cost of this module",
    cached: "cache",
    ping: "Send an event to the site",
  },
  es: {
    title: "Este panel es una app Angular con su propio deploy",
    framework: "Framework",
    origin: "Cargado desde",
    build: "Build",
    cost: "Costo de este módulo",
    cached: "caché",
    ping: "Enviar un evento al sitio",
  },
  jp: {
    title: "このパネルは独自にデプロイされたAngularアプリです",
    framework: "フレームワーク",
    origin: "読み込み元",
    build: "ビルド",
    cost: "このモジュールのコスト",
    cached: "キャッシュ",
    ping: "サイトにイベントを送信",
  },
  fr: {
    title: "Ce panneau est une app Angular avec son propre déploiement",
    framework: "Framework",
    origin: "Chargé depuis",
    build: "Build",
    cost: "Coût de ce module",
    cached: "cache",
    ping: "Envoyer un événement au site",
  },
}
