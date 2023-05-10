describe("My Login application", () => {
  it("Calculator - Enter 1 + 2", async () => {
    await a.$("~uno").click();
    await a.$("~sumar").click();
    await a.$("~dos").click();
  });

  it("App Store - Click on Luis", async () => {
    // Go to app store app now
    await b.$("~Luis Cardeña").click();
  });

  it("Calculator - Click equal and assert result", async () => {
    // Return to a app
    await a.$("~es igual a").click();
    await expect(a.$("~pantalla principal")).toHaveTextContaining("3");
  });
});
