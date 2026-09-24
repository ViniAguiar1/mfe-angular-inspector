# mfe-angular-inspector

Micro frontend Angular 22 publicado como um único ES module (`inspector.js`) que registra o custom element `<mfe-inspector>`. É o experimento do post sobre micro frontend Angular dentro de um blog Next.js, em [viniciusaguiardev.com.br](https://viniciusaguiardev.com.br).

**Contrato**

- Entradas (atributos ou propriedades): `locale` (`pt` | `en` | `es` | `jp` | `fr`, desconhecido cai em `pt`) e `theme` (`light` | `dark`).
- Saída: evento `mfe:ping` (`bubbles`, `composed`) com `{ angularVersion, at }` no `detail`.
- Estilos isolados em Shadow DOM.

**Uso**

```html
<script type="module">
  await import("https://mfe-angular-inspector.aguiarlabs.com.br/inspector.js")
</script>
<mfe-inspector locale="en" theme="dark"></mfe-inspector>
```

**Desenvolvimento**

```bash
pnpm install
pnpm test
pnpm build   # → dist/mfe-angular-inspector/browser/inspector.js (falha se o build gerar mais de um arquivo)
```

Angular CLI 22.2 exige Node ≥ 24.15.
