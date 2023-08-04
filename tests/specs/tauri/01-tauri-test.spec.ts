describe("Tauri App tests", async () => {
  it("App is displayed", async () => {
    await $("#main").waitForDisplayed();
  });
});
