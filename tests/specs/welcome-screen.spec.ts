import CreatePinScreen from "../screenobjects/CreatePinScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"

describe("Main Screen and Elements are Displayed", async () => {
  before(async () => {
    // Create an account and go to Main Screen
    await CreatePinScreen.waitForIsShown(true)
    await (await CreatePinScreen.pinInput).setValue("1234" + "\n")
    await UplinkMainScreen.waitForIsShown(true)
  })

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await UplinkMainScreen.prereleaseIndicator).toBeDisplayed()
    await expect(await UplinkMainScreen.prereleaseIndicatorText).toHaveTextContaining("Pre-release")
  })

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await UplinkMainScreen.buttonNav).toBeDisplayed()
    await expect(await UplinkMainScreen.chatsButton).toBeDisplayed()
    await expect(await UplinkMainScreen.filesButton).toBeDisplayed()
    await expect(await UplinkMainScreen.friendsButton).toBeDisplayed()
    await expect(await UplinkMainScreen.settingsButton).toBeDisplayed()
  })

  it("Validate Welcome Screen is displayed", async () => {
    await expect(await UplinkMainScreen.welcomeScreen).toBeDisplayed()
    await expect(await UplinkMainScreen.addFriendsButton).toBeDisplayed()
    const locator = await (await UplinkMainScreen.welcomeScreen).$('~Add Someone')
    await expect(locator).toHaveTextContaining('Add Someone')
  })
})
