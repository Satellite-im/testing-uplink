import CreatePinScreen from "../screenobjects/CreatePinScreen"
import FriendsScreen from "../screenobjects/FriendsScreen"
import UplinkMainScreen from "../screenobjects/UplinkMainScreen"

describe("Friends Screen Tests", async () => {
  before(async () => {
    await CreatePinScreen.enterPin("1234" + "\n")
    await UplinkMainScreen.maximizeWindow()
    await UplinkMainScreen.goToFriends()
    await FriendsScreen.waitForIsShown(true)
  })

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await FriendsScreen.prereleaseIndicator).toBeDisplayed()
    await expect(await FriendsScreen.prereleaseIndicatorText).toHaveTextContaining("Pre-release")
  })

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await FriendsScreen.buttonNav).toBeDisplayed()
    await expect(await FriendsScreen.chatsButton).toBeDisplayed()
    await expect(await FriendsScreen.filesButton).toBeDisplayed()
    await expect(await FriendsScreen.friendsButton).toBeDisplayed()
    await expect(await FriendsScreen.settingsButton).toBeDisplayed()
  })

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await FriendsScreen.chatSearchInput).toBeDisplayed()
    await expect(await FriendsScreen.sidebar).toBeDisplayed()
    await expect(await FriendsScreen.sidebarChildren).toBeDisplayed()
    await expect(await FriendsScreen.sidebarSearch).toBeDisplayed()
  })

  it("Go to Friends Screen and validate elements displayed", async () => {
    await expect(await FriendsScreen.friendsLayout).toBeDisplayed()
    await expect(await FriendsScreen.settingsButton).toBeDisplayed()
  })

  xit("User can type on user search input bar", async () => {
    
  })

  xit("Switch to Pending Friends view and validate elements displayed", async () => {
    
  })

  xit("Switch to Blocked Friends view and validate elements displayed", async () => {
    
  })

  xit("Switch to All Friends view and validate elements displayed", async () => {
    
  })
})
