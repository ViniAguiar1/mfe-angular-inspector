import { provideZonelessChangeDetection } from "@angular/core"
import { createApplication } from "@angular/platform-browser"
import { createCustomElement } from "@angular/elements"
import { InspectorComponent } from "./app/inspector.component"

export const TAG = "mfe-inspector"

// O browser avalia um ES module uma vez por URL — navegar e voltar não roda
// isto de novo. O que roda duas vezes é o mesmo arquivo vindo de duas URLs
// (ex.: com ?v=2). As duas avaliações passam pelo primeiro check antes de
// qualquer createApplication resolver, então o check precisa se repetir
// depois do await: definir a mesma tag duas vezes lança NotSupportedError.
export async function registerInspector(): Promise<void> {
  if (customElements.get(TAG)) return
  const app = await createApplication({ providers: [provideZonelessChangeDetection()] })
  if (customElements.get(TAG)) return
  customElements.define(TAG, createCustomElement(InspectorComponent, { injector: app.injector }))
}
