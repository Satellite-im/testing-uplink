import CreatePinScreen from "../screenobjects/CreatePinScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"
import SettingsMainScreen from "../screenobjects/SettingsMainScreen"

describe("Settings - Audio - Tests", async () => {
  before(async () => {
    await CreatePinScreen.enterPin("1234" + "\n")
    await UplinkMainScreen.maximizeWindow()
    await UplinkMainScreen.goToSettings()
    await SettingsMainScreen.waitForIsShown(true)
  })

  xit("Settings Audio - Assert screen texts", async () => {
    
  })

  xit("Settings Audio - Toggle switches to enabled", async () => {
    
  })

  xit("Settings Audio - Toggle switches to enabled", async () => {
    
  })
})
