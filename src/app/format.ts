export type TimingLike = { transferSize: number; duration: number }

// transferSize = 0 significa cache do browser (ou Timing-Allow-Origin ausente):
// dizer "0 KB" seria mentir sobre o peso do módulo.
export function formatCost(entry: TimingLike | undefined, cachedLabel: string): string {
  if (!entry) return "—"
  const ms = `${Math.round(entry.duration)} ms`
  if (entry.transferSize === 0) return `${cachedLabel} · ${ms}`
  return `${(entry.transferSize / 1024).toFixed(1)} KB · ${ms}`
}
