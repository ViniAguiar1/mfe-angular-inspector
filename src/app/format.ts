export type TimingLike = { transferSize: number; encodedBodySize: number; duration: number }

// Transferiu menos que o corpo do arquivo = o corpo não veio pela rede:
// cache do browser (0) ou revalidação 304 (só headers). Mostrar esse número
// como "custo do módulo" seria mentir sobre o peso dele.
export function formatCost(entry: TimingLike | undefined, cachedLabel: string): string {
  if (!entry) return "—"
  const ms = `${Math.round(entry.duration)} ms`
  if (entry.transferSize < entry.encodedBodySize || entry.transferSize === 0) return `${cachedLabel} · ${ms}`
  return `${(entry.transferSize / 1024).toFixed(1)} KB · ${ms}`
}
