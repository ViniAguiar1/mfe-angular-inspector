import { provideZonelessChangeDetection } from "@angular/core"
import { createApplication } from "@angular/platform-browser"
import { createCustomElement } from "@angular/elements"
import { InspectorComponent } from "./app/inspector.component"

const TAG = "mfe-inspector"

// Registrar o mesmo nome duas vezes lança erro no browser — acontece se o
// hospedeiro importar o módulo de novo (navegação entre posts, HMR).
if (!customElements.get(TAG)) {
  createApplication({ providers: [provideZonelessChangeDetection()] }).then((app) => {
    customElements.define(TAG, createCustomElement(InspectorComponent, { injector: app.injector }))
  })
}
