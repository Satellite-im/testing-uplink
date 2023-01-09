import CreatePinScreen from "../screenobjects/CreatePinScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"

describe("Create Pin Screen validations", async () => {
  before(async () => {
    // Create an account and go to Main Screen
    await CreatePinScreen.waitForIsShown(true)
  })

  it("Validate Pre Release Indicator is displayed on Screen", async () => {
    await expect(await CreatePinScreen.prereleaseIndicator).toBeDisplayed()
    await expect(await CreatePinScreen.prereleaseIndicatorText).toHaveTextContaining("Pre-release")
  })

  it("Enter text and continue to next page", async () => {
    await (await CreatePinScreen.pinInput).setValue("1234" + "\n")
    await UplinkMainScreen.waitForIsShown(true)
  })
})
