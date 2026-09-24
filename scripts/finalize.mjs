// O hospedeiro importa UMA URL. Se o build gerar chunks, o contrato quebra
// em silêncio — então falha alto aqui.
import { copyFileSync, readdirSync, renameSync } from "node:fs"
import path from "node:path"

const dir = "dist/mfe-angular-inspector/browser"
const js = readdirSync(dir).filter((f) => f.endsWith(".js"))
if (js.length !== 1 || js[0] !== "main.js") {
  console.error(`esperado só main.js em ${dir}, encontrado: ${js.join(", ") || "(nada)"}`)
  process.exit(1)
}
renameSync(path.join(dir, "main.js"), path.join(dir, "inspector.js"))
// Página de boas-vindas na raiz do domínio: usa o próprio inspector.js.
copyFileSync("landing/index.html", path.join(dir, "index.html"))
console.log(`ok: ${dir}/inspector.js + index.html`)
