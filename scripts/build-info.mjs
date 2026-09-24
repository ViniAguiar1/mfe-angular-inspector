// Grava SHA e horário do build para o painel exibir. Na Vercel, o SHA vem
// de VERCEL_GIT_COMMIT_SHA; localmente, do git.
import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"

function shortSha() {
  const fromVercel = process.env.VERCEL_GIT_COMMIT_SHA
  if (fromVercel) return fromVercel.slice(0, 7)
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
  } catch {
    return "local"
  }
}

const info = { sha: shortSha(), builtAt: new Date().toISOString() }
writeFileSync("src/build-info.generated.ts", `export const BUILD_INFO = ${JSON.stringify(info)} as const\n`)
console.log("build-info:", info)
