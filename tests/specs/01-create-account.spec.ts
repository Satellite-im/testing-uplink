import CreatePinScreen from "../screenobjects/CreatePinScreen"
import CreateUserScreen from "../screenobjects/CreateUserScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"

describe("Create Account Screen Tests", async () => {
  before(async () => {
    // Create an account and go to Main Screen
    await CreatePinScreen.waitForIsShown(true)
  })

  it("Validate Pre Release Indicator is displayed on Screen", async () => {
    await expect(await CreatePinScreen.prereleaseIndicator).toBeDisplayed()
    await expect(await CreatePinScreen.prereleaseIndicatorText).toHaveTextContaining("Pre-release")
  })

  it("Validate warning texts are displayed on screen", async () => {
    await expect(await CreatePinScreen.unlockWarningParagraph).toBeDisplayed()
    await expect(await CreatePinScreen.unlockWarningParagraph).toHaveTextContaining('warning: use a good password')
    await expect(await CreatePinScreen.unlockWarningSpan).toBeDisplayed()
    await expect(await CreatePinScreen.unlockWarningSpan).toHaveTextContaining('warning: no password recovery')
  })

  xit("Enter an empty pin", async () => {
    await expect(await CreatePinScreen.inputError).toBeDisplayed()
    await expect(await CreatePinScreen.inputError).toHaveTextContaining('Please enter at least 4 characters')
    await CreatePinScreen.clickOnCreateAccount()
  })

  it("Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPin("123")
    await expect(await CreatePinScreen.inputError).toBeDisplayed()
    await expect(await CreatePinScreen.inputError).toHaveTextContaining('Please enter at least 4 characters')
  })
  
  it("Enter a pin with more than 32 characters", async () => {
    await CreatePinScreen.enterPin("12345678901234567890123456789012345")
    await expect(await CreatePinScreen.inputError).toBeDisplayed()
    await expect(await CreatePinScreen.inputError).toHaveTextContaining('Maximum of 32 characters exceeded')
  })

  it("Enter a valid pin and continue creating a username", async () => {
    await CreatePinScreen.enterPin("1234")
    await CreatePinScreen.clickOnCreateAccount()
    await CreateUserScreen.waitForIsShown(true)
  })

  xit("Leave empty username and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("")
    await CreateUserScreen.enterPin("1234")
    await CreateUserScreen.clickOnCreateAccount()
    await expect(await CreateUserScreen.inputError).toBeDisplayed()
    await expect(await CreateUserScreen.inputError).toHaveTextContaining('Please enter at least 4 characters')
  })

  xit("Leave empty pin and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1234")
    await CreateUserScreen.enterPin("1234")
    await CreateUserScreen.clickOnCreateAccount()
    await expect(await CreateUserScreen.inputError).toBeDisplayed()
    await expect(await CreateUserScreen.inputError).toHaveTextContaining('Please enter at least 4 characters')
  })

  it("Pin with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1234")
    await CreateUserScreen.enterPin("12")
    await CreateUserScreen.clickOnCreateAccount()
    await expect(await CreateUserScreen.inputError).toBeDisplayed()
    await expect(await CreateUserScreen.inputError).toHaveTextContaining('Please enter at least 4 characters')
  })

  it("Username with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12")
    await CreateUserScreen.enterPin("1234")
    await CreateUserScreen.clickOnCreateAccount()
    await expect(await CreateUserScreen.inputError).toBeDisplayed()
    await expect(await CreateUserScreen.inputError).toHaveTextContaining('Please enter at least 4 characters')
  })

  it("Pin with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1234")
    await CreateUserScreen.enterPin("12345678901234567890123456789012345")
    await CreateUserScreen.clickOnCreateAccount()
    await expect(await CreateUserScreen.inputError).toBeDisplayed()
    await expect(await CreateUserScreen.inputError).toHaveTextContaining('Maximum of 32 characters exceeded')
  })

  it("Username with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12345678901234567890123456789012345")
    await CreateUserScreen.enterPin("1234")
    await CreateUserScreen.clickOnCreateAccount()
    await expect(await CreateUserScreen.inputError).toBeDisplayed()
    await expect(await CreateUserScreen.inputError).toHaveTextContaining('Maximum of 32 characters exceeded')
  })

  it("Enter valid pin and username to continue", async () => {
    await CreateUserScreen.enterUsername("test123")
    await CreateUserScreen.enterPin("1234")
    await CreateUserScreen.clickOnCreateAccount()
    await UplinkMainScreen.waitForIsShown(true)
  })
})
