import CreatePinScreen from "../screenobjects/CreatePinScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import UplinkMainScreen from "../screenobjects/UplinkMainScreen";

describe("Friends Screen Tests", async () => {
  before(async () => {
    await CreatePinScreen.enterPin("1234" + "\n");
    await UplinkMainScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await FriendsScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await FriendsScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await FriendsScreen.buttonNav).toBeDisplayed();
    await expect(await FriendsScreen.chatsButton).toBeDisplayed();
    await expect(await FriendsScreen.filesButton).toBeDisplayed();
    await expect(await FriendsScreen.friendsButton).toBeDisplayed();
    await expect(await FriendsScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await FriendsScreen.chatSearchInput).toBeDisplayed();
    await expect(await FriendsScreen.sidebar).toBeDisplayed();
    await expect(await FriendsScreen.sidebarChildren).toBeDisplayed();
    await expect(await FriendsScreen.sidebarSearch).toBeDisplayed();
  });

  it("Go to Friends Screen and validate elements displayed", async () => {
    await expect(await FriendsScreen.friendsLayout).toBeDisplayed();
    await expect(await FriendsScreen.settingsButton).toBeDisplayed();
  });

  it("User can type on user search input bar", async () => {
    await (await FriendsScreen.addSomeoneInput).click()
    await (await FriendsScreen.addSomeoneInput).setValue('Hello')
    await (expect(await FriendsScreen.addSomeoneInput).toHaveTextContaining('Hello'))
  });

  it("Switch to Pending Friends view and validate elements displayed", async () => {
    await (await FriendsScreen.pendingFriendsButton).click()
    await (expect(await FriendsScreen.incomingRequestsList).toBeDisplayed())
    await (expect(await FriendsScreen.outgoingRequestsList).toBeDisplayed())
  });

  it("Switch to Blocked Friends view and validate elements displayed", async () => {
    await (await FriendsScreen.blockedFriendsButton).click()
    await (expect(await FriendsScreen.blockedList).toBeDisplayed())
  });

  it("Switch to All Friends view and validate elements displayed", async () => {
    await (await FriendsScreen.allFriendsButton).click()
    await (expect(await FriendsScreen.friendsList).toBeDisplayed())
  });

  it("Go to Chat with Friend from Friends List", async () => {
    const friendName = await FriendsScreen.getNameFromFriendsList()
    await FriendsScreen.chatWithFriend(friendName)
  })

  it("Unfriend someone from Friends List", async () => {
    await (await $('~friends-button')).click()
    const friendName = await FriendsScreen.getNameFromFriendsList()
    await FriendsScreen.unfriendUser(friendName)
  })

  xit("Block someone from Friends List", async () => {})

  xit("Accept incoming friend request", async () => {})

  xit("Deny incoming friend request", async () => {})

  xit("Cancel outgoing friend request", async () => {})

  xit("Unblock someone from blocked friends list", async () => {})

  xit("Context Menu - Chat with Friend", async () => {})

  xit("Context Menu - Call to Friend", async () => {})

  xit("Context Menu - Add Friend to Favorites", async () => {})

  xit("Context Menu - Remove Friend", async () => {})

  xit("Context Menu - Block Friend", async () => {})

  xit("Context Menu - Deny Incoming Request", async () => {})

  xit("Context Menu - Cancel Outgoing Request", async () => {})

  xit("Context Menu - Unblock User", async () => {})
});
