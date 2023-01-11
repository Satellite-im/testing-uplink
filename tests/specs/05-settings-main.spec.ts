import CreatePinScreen from "../screenobjects/CreatePinScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"
import SettingsMainScreen from "../screenobjects/SettingsMainScreen"

describe("Main Screen and Elements are Displayed", async () => {
  before(async () => {
    await CreatePinScreen.enterPin("1234" + "\n")
    await UplinkMainScreen.maximizeWindow()
    await UplinkMainScreen.goToSettings()
    await SettingsMainScreen.waitForIsShown(true)
  })

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await SettingsMainScreen.prereleaseIndicator).toBeDisplayed()
    await expect(await SettingsMainScreen.prereleaseIndicatorText).toHaveTextContaining("Pre-release")
  })

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await SettingsMainScreen.buttonNav).toBeDisplayed()
    await expect(await SettingsMainScreen.chatsButton).toBeDisplayed()
    await expect(await SettingsMainScreen.filesButton).toBeDisplayed()
    await expect(await SettingsMainScreen.friendsButton).toBeDisplayed()
    await expect(await SettingsMainScreen.settingsButton).toBeDisplayed()
  })

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await SettingsMainScreen.sidebar).toBeDisplayed()
    await expect(await SettingsMainScreen.sidebarChildren).toBeDisplayed()
    await expect(await SettingsMainScreen.sidebarSearch).toBeDisplayed()
  })
})
