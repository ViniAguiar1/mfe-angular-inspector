import { registerInspector, TAG } from "./register"

describe("registerInspector", () => {
  it("duas avaliações concorrentes do módulo não lançam e deixam a tag definida", async () => {
    await expect(Promise.all([registerInspector(), registerInspector()])).resolves.toBeDefined()
    expect(customElements.get(TAG)).toBeDefined()
  })

  it("chamar de novo com a tag já definida é inofensivo", async () => {
    await expect(registerInspector()).resolves.toBeUndefined()
  })
})
