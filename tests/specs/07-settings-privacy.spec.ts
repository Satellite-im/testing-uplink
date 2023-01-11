import CreatePinScreen from "../screenobjects/CreatePinScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"
import SettingsMainScreen from "../screenobjects/SettingsMainScreen"

describe("Settings - Privacy - Tests", async () => {
  before(async () => {
    await CreatePinScreen.enterPin("1234" + "\n")
    await UplinkMainScreen.maximizeWindow()
    await UplinkMainScreen.goToSettings()
    await SettingsMainScreen.waitForIsShown(true)
  })

  xit("Settings Privacy - Assert screen texts", async () => {
    
  })
})
