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
    const friendName = await FriendsScreen.getUserFromFriendsList('Friends List')
    await FriendsScreen.chatWithFriend(friendName)
  })

  it("Unfriend someone from Friends List", async () => {
    // Return to Friends Screen
    await (await $('~friends-button')).click()

    // Get a random user from list and unfriend it
    const friendName = await FriendsScreen.getUserFromFriendsList('Friends List')
    await FriendsScreen.removeOrDenyFriend(friendName)
    
    // Get current list of All friends and ensure that it does not include the removed user
    const allFriendsList = await FriendsScreen.getEntireFriendsList('Friends List')   
    await expect(allFriendsList.includes(friendName)).toEqual(false)
  })

  it("Block someone from Friends List", async () => {
    // Get a random user from list and block the user
    const friendName = await FriendsScreen.getUserFromFriendsList('Friends List')
    await FriendsScreen.blockUser(friendName)
    
    // Get current list of All friends and ensure that it does not include the removed user
    const allFriendsList = await FriendsScreen.getEntireFriendsList('Friends List')   
    await expect(allFriendsList.includes(friendName)).toEqual(false)

    // Go to Blocked List and validate that user is there now
    await (await FriendsScreen.blockedFriendsButton).click()
    const blockedFriendsList = await FriendsScreen.getEntireFriendsList('Blocked List')   
    await expect(blockedFriendsList.includes(friendName)).toEqual(true)
  })

  it("Accept incoming friend request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click()

    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromFriendsList('Incoming Requests List')
    await FriendsScreen.acceptIncomingRequest(friendName)
    
    // Get the current list of incoming requests and validate that user does not appear there now
    const incomingRequestsList = await FriendsScreen.getEntireFriendsList('Incoming Requests List')   
    await expect(incomingRequestsList.includes(friendName)).toEqual(false)

    // Go to the current list of All friends and ensure that now includes the friend accepted
    await (await FriendsScreen.allFriendsButton).click()
    const allFriendsList = await FriendsScreen.getEntireFriendsList('Friends List')   
    await expect(allFriendsList.includes(friendName)).toEqual(true)
  })

  it("Deny incoming friend request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click()

    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromFriendsList('Incoming Requests List')
    await FriendsScreen.removeOrDenyFriend(friendName)
    
    // Get the current list of incoming requests and validate that user does not appear there now
    const incomingRequestsList = await FriendsScreen.getEntireFriendsList('Incoming Requests List')   
    await expect(incomingRequestsList.includes(friendName)).toEqual(false)

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await (await FriendsScreen.allFriendsButton).click()
    const allFriendsList = await FriendsScreen.getEntireFriendsList('Friends List')   
    await expect(allFriendsList.includes(friendName)).toEqual(false)
  })

  it("Unfriend/Cancel outgoing friend request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click()

    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromFriendsList('Outgoing Requests List')
    await FriendsScreen.removeOrDenyFriend(friendName)
    
    // Get the current list of incoming requests and validate that user does not appear there now
    const outgoingRequestsList = await FriendsScreen.getEntireFriendsList('Outgoing Requests List')   
    await expect(outgoingRequestsList.includes(friendName)).toEqual(false)

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await (await FriendsScreen.allFriendsButton).click()
    const allFriendsList = await FriendsScreen.getEntireFriendsList('Friends List')   
    await expect(allFriendsList.includes(friendName)).toEqual(false)
  })

  it("Unfriend someone from blocked friends list", async () => {
    // Go to Blocked Users Screen
    await (await FriendsScreen.blockedFriendsButton).click()

    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromFriendsList('Blocked List')
    await FriendsScreen.removeOrDenyFriend(friendName)
    
    // Get the current list of incoming requests and validate that user does not appear there now
    const blockedList = await FriendsScreen.getEntireFriendsList('Blocked List')   
    await expect(blockedList.includes(friendName)).toEqual(false)

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await (await FriendsScreen.allFriendsButton).click()
    const allFriendsList = await FriendsScreen.getEntireFriendsList('Friends List')   
    await expect(allFriendsList.includes(friendName)).toEqual(false)
  })

  // Not existing flow now
  xit("Remove someone from blocked friends list", async () => {})

  xit("Context Menu - Chat with Friend", async () => {})

  xit("Context Menu - Call to Friend", async () => {})

  xit("Context Menu - Add Friend to Favorites", async () => {})

  xit("Context Menu - Remove Friend", async () => {})

  xit("Context Menu - Block Friend", async () => {})

  xit("Context Menu - Deny Incoming Request", async () => {})

  xit("Context Menu - Cancel Outgoing Request", async () => {})

  xit("Context Menu - Unblock User", async () => {})
});
