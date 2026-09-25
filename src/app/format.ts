export type TimingLike = { transferSize: number; encodedBodySize: number; duration: number; responseStatus?: number }

// O corpo do módulo não veio pela rede quando: nada trafegou (cache do
// browser), trafegou menos que o corpo (revalidação 304), o navegador não
// reporta corpo nenhum, ou o status é 304. A Vercel responde o 304 sem os
// headers de CORS e Timing-Allow-Origin, e aí o Chrome reporta ~0,3 KB de
// headers e corpo 0 — mostrar isso como custo seria mentir sobre o peso.
export function formatCost(entry: TimingLike | undefined, cachedLabel: string): string {
  if (!entry) return "—"
  const ms = `${Math.round(entry.duration)} ms`
  const bodyNotTransferred =
    entry.transferSize === 0 ||
    entry.encodedBodySize === 0 ||
    entry.transferSize < entry.encodedBodySize ||
    entry.responseStatus === 304
  if (bodyNotTransferred) return `${cachedLabel} · ${ms}`
  return `${(entry.transferSize / 1024).toFixed(1)} KB · ${ms}`
}
