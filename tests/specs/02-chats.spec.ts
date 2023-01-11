import CreatePinScreen from "../screenobjects/CreatePinScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"

describe("Main Screen and Elements are Displayed", async () => {
  before(async () => {
    await CreatePinScreen.enterPin("1234" + "\n")
    await UplinkMainScreen.waitForIsShown(true)
    await UplinkMainScreen.maximizeWindow()
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

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await UplinkMainScreen.chatSearchInput).toBeDisplayed()
    await expect(await UplinkMainScreen.sidebar).toBeDisplayed()
    await expect(await UplinkMainScreen.sidebarChildren).toBeDisplayed()
    await expect(await UplinkMainScreen.sidebarSearch).toBeDisplayed()
  })

  it("Validate Welcome Screen is displayed", async () => {
    await expect(await UplinkMainScreen.welcomeScreen).toBeDisplayed()
    await expect(await UplinkMainScreen.addFriendsButton).toBeDisplayed()
    const locator = await (await UplinkMainScreen.welcomeScreen).$('~Add Someone')
    await expect(locator).toHaveTextContaining('Add Someone')
  })
})
