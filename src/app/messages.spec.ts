import { MESSAGES, resolveLocale } from "./messages"

describe("resolveLocale", () => {
  it("aceita os cinco locales do site", () => {
    for (const l of ["pt", "en", "es", "jp", "fr"]) expect(resolveLocale(l)).toBe(l)
  })
  it("cai em pt para desconhecido ou vazio", () => {
    expect(resolveLocale("de")).toBe("pt")
    expect(resolveLocale("")).toBe("pt")
  })
  it("todo locale tem as mesmas chaves", () => {
    const keys = Object.keys(MESSAGES.pt).sort()
    for (const l of Object.keys(MESSAGES)) expect(Object.keys(MESSAGES[l as keyof typeof MESSAGES]).sort()).toEqual(keys)
  })
})
