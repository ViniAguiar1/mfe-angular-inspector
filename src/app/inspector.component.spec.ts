import { TestBed } from "@angular/core/testing"
import { VERSION } from "@angular/core"
import { InspectorComponent } from "./inspector.component"

describe("InspectorComponent", () => {
  function setup(locale = "pt", theme = "light") {
    const fixture = TestBed.createComponent(InspectorComponent)
    fixture.componentRef.setInput("locale", locale)
    fixture.componentRef.setInput("theme", theme)
    fixture.detectChanges()
    const host = fixture.nativeElement as HTMLElement
    const root = host.shadowRoot ?? host
    return { fixture, host, root }
  }

  it("renderiza no idioma pedido e cai em pt no desconhecido", () => {
    expect(setup("en").root.textContent).toContain("Loaded from")
    expect(setup("de").root.textContent).toContain("Carregado de")
  })

  it("marca o host com a classe dark no tema escuro e remove no claro", () => {
    const { fixture, host } = setup("pt", "dark")
    expect(host.classList.contains("dark")).toBe(true)
    fixture.componentRef.setInput("theme", "light")
    fixture.detectChanges()
    expect(host.classList.contains("dark")).toBe(false)
  })

  it("dispara mfe:ping com a versão do Angular, bubbles e composed", () => {
    const { host, root } = setup()
    let received: CustomEvent | null = null
    host.addEventListener("mfe:ping", (e) => (received = e as CustomEvent))
    ;(root.querySelector("button") as HTMLButtonElement).click()
    expect(received).not.toBeNull()
    expect(received!.detail.angularVersion).toBe(VERSION.full)
    expect(Number.isNaN(Date.parse(received!.detail.at))).toBe(false)
    expect(received!.bubbles).toBe(true)
    expect(received!.composed).toBe(true)
  })
})
