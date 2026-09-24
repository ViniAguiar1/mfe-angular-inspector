import { Component, ElementRef, VERSION, ViewEncapsulation, computed, inject, input } from "@angular/core"
import { BUILD_INFO } from "../build-info.generated"
import { formatCost, type TimingLike } from "./format"
import { MESSAGES, resolveLocale } from "./messages"

// URL de onde ESTE módulo foi carregado — no post, o deploy do MFE, não o site.
const MODULE_URL = import.meta.url

function ownTiming(): TimingLike | undefined {
  return performance.getEntriesByName(MODULE_URL)[0] as PerformanceResourceTiming | undefined
}

@Component({
  selector: "mfe-inspector-root",
  encapsulation: ViewEncapsulation.ShadowDom,
  host: { "[class.dark]": "isDark()" },
  template: `
    <section>
      <p class="eyebrow">&lt;mfe-inspector&gt;</p>
      <h3>{{ m().title }}</h3>
      <dl>
        <dt>{{ m().framework }}</dt><dd>Angular {{ angularVersion }}</dd>
        <dt>{{ m().origin }}</dt><dd>{{ origin }}</dd>
        <dt>{{ m().build }}</dt><dd>{{ build.sha }} · {{ build.builtAt }}</dd>
        <dt>{{ m().cost }}</dt><dd>{{ cost() }}</dd>
      </dl>
      <button type="button" (click)="ping()">{{ m().ping }}</button>
    </section>
  `,
  styles: `
    :host { --bg: #ffffff; --fg: #111111; --mu: #6b6b6b; --line: #e4e4e4; --accent: #dd0031;
            display: block; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    :host(.dark) { --bg: #0e0e0e; --fg: #ededed; --mu: #9a9a9a; --line: #2a2a2a; }
    section { background: var(--bg); color: var(--fg); padding: 24px; min-height: 272px; }
    .eyebrow { color: var(--accent); font-size: 12px; margin: 0 0 8px; }
    h3 { font-size: 18px; margin: 0 0 16px; font-family: system-ui, sans-serif; }
    dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; font-size: 13px; margin: 0 0 20px; }
    dt { color: var(--mu); }
    dd { margin: 0; overflow-wrap: anywhere; }
    button { font: inherit; font-size: 13px; color: var(--fg); background: transparent;
             border: 1px solid var(--line); padding: 8px 12px; cursor: pointer; }
    button:hover { border-color: var(--accent); }
  `,
})
export class InspectorComponent {
  readonly locale = input<string>("pt")
  readonly theme = input<string>("light")

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef)

  protected readonly m = computed(() => MESSAGES[resolveLocale(this.locale())])
  protected readonly isDark = computed(() => this.theme() === "dark")
  protected readonly cost = computed(() => formatCost(ownTiming(), this.m().cached))

  protected readonly angularVersion = VERSION.full
  protected readonly origin = new URL(MODULE_URL).origin
  protected readonly build = BUILD_INFO

  protected ping(): void {
    this.host.nativeElement.dispatchEvent(
      new CustomEvent("mfe:ping", {
        detail: { angularVersion: this.angularVersion, at: new Date().toISOString() },
        bubbles: true,
        composed: true,
      }),
    )
  }
}
