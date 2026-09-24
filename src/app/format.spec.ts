import { formatCost } from "./format"

describe("formatCost", () => {
  it("mostra KB e ms quando houve transferência", () => {
    expect(formatCost({ transferSize: 51_200, duration: 123.4 }, "cache")).toBe("50.0 KB · 123 ms")
  })
  it("diz cache quando transferSize é 0", () => {
    expect(formatCost({ transferSize: 0, duration: 2 }, "cache")).toBe("cache · 2 ms")
  })
  it("traço quando não há entrada de timing", () => {
    expect(formatCost(undefined, "cache")).toBe("—")
  })
})
