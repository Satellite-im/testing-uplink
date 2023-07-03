import { Given, When, Then } from "@wdio/cucumber-framework";
import { resetAndLoginWithCache } from "../helpers/commands";
import ChatsLayout from "../screenobjects/chats/ChatsLayout";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import InputBar from "../screenobjects/chats/InputBar";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

Given(
  /^I login with Friends Test User account and go to Friends$/,
  async () => {
    // Go to Friends Screen
    await resetAndLoginWithCache("FriendsTestUser");
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
  }
);

When(/^I am on the Friends Screen$/, async () => {
  await friendsScreenFirstUser.waitForIsShown(true);
});

When(
  /^I type the friend did key (.*) in search input from Friends Screen$/,
  async (didkey: string) => {
    await friendsScreenFirstUser.enterFriendDidKey(didkey);
  }
);

When(
  /^I delete the current text from friends search input on Friends Screen$/,
  async () => {
    await friendsScreenFirstUser.deleteAddFriendInput();
  }
);

When(/^I type spaces in search input from Friends Screen$/, async () => {
  await friendsScreenFirstUser.enterFriendDidKey("123456789             ");
});

When(/^I click on the Copy ID button from Friends Screen$/, async () => {
  await friendsScreenFirstUser.clickOnCopyID();
});

When(
  /^I paste the copied user key in Add Someone Input from Friends Screen$/,
  async () => {
    await friendsScreenFirstUser.pasteUserKeyInAddSomeone();
  }
);

When(/^I click on the Add Someone button from Friends Screen$/, async () => {
  await friendsScreenFirstUser.clickOnAddSomeoneButton();
});

When(/^I click on Pending Friends button from Friends Screen$/, async () => {
  await friendsScreenFirstUser.goToPendingFriendsList();
});

When(/^I click on Blocked List button from Friends Screen$/, async () => {
  await friendsScreenFirstUser.goToBlockedList();
});

When(/^I click on All Friends List button from Friends Screen$/, async () => {
  await friendsScreenFirstUser.goToAllFriendsList();
});

When(
  /^I click on the chat button from (.*) on All Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.chatWithFriend(friendName);
  }
);

When(/^I type the message (.*) on chat input bar$/, async (message: string) => {
  await chatsInputFirstUser.typeMessageOnInput(message);
});

When(
  /^I hover on the unfriend button from (.*) on All Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(friendName);
  }
);

When(
  /^I hover on the block button from (.*) on All Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.hoverOnBlockButton(friendName);
  }
);

When(
  /^I click on the unfriend button from (.*) on All Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.removeOrCancelUser(friendName);
  }
);
When(
  /^I click on the block button from (.*) on All Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.blockUser(friendName);
  }
);

When(
  /^I hover on the Deny Request button from (.*) on Pending Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(friendName);
  }
);

When(
  /^I hover on the Unfriend button from (.*) on Pending Friends List$/,
  async (outgoingFriendName: string) => {
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(
      outgoingFriendName
    );
  }
);

When(
  /^I click on the Accept Request button from (.*) on Pending Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.acceptIncomingRequest(friendName);
  }
);

When(
  /^I click on the Deny Request button from (.*) on Pending Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.removeOrCancelUser(friendName);
  }
);

When(
  /^I click on the Cancel Request from (.*) on Outgoing Friends List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.removeOrCancelUser(friendName);
  }
);

When(
  /^I hover on the Unblock button from (.*) on Blocked List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(friendName);
  }
);

When(
  /^I click on the Unblock button from (.*) on Blocked List$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.removeOrCancelUser(friendName);
  }
);

When(
  /^I open the context menu from (.*) on Friends Screen$/,
  async (friendName: string) => {
    await friendsScreenFirstUser.openFriendContextMenu(friendName);
  }
);

When(/^I select the context menu option of Chat$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuChat();
});

When(/^I select the context menu option of Add to Favorites$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuFavoritesAdd();
});

When(
  /^I select the context menu option of Remove from Favorites$/,
  async () => {
    await friendsScreenFirstUser.clickOnContextMenuRemove();
  }
);

When(/^I select the context menu option of Remove Friend$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuRemove();
});

When(/^I select the context menu option of Block Friend$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuBlock();
});

When(/^I select the context menu option of Accept Request$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuIncomingAccept();
});

When(/^I select the context menu option of Deny Request$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuIncomingDeny();
});

When(/^I select the context menu option of Cancel Request$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuOutgoingCancel();
});

When(/^I select the context menu option of Unblock Friend$/, async () => {
  await friendsScreenFirstUser.clickOnContextMenuUnblock();
});

Then(
  /^I should see the Pre Release Indicator displayed on Friends Screen$/,
  async () => {
    await expect(friendsScreenFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      friendsScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  }
);

Then(
  /^I should see the main buttons displayed on Friends Screen$/,
  async () => {
    await friendsScreenFirstUser.chatsButton.waitForExist();
    await friendsScreenFirstUser.filesButton.waitForExist();
    await friendsScreenFirstUser.friendsButton.waitForExist();
    await friendsScreenFirstUser.settingsButton.waitForExist();
  }
);

Then(/^I should see the sidebar displayed on Friends Screen$/, async () => {
  await expect(friendsScreenFirstUser.chatSearchInput).toBeDisplayed();
  await expect(friendsScreenFirstUser.sidebar).toBeDisplayed();
  await expect(friendsScreenFirstUser.sidebarChildren).toBeDisplayed();
  await expect(friendsScreenFirstUser.sidebarSearch).toBeDisplayed();
});

Then(/^I should see the Friends Layout displayed on screen$/, async () => {
  await expect(friendsScreenFirstUser.friendsLayout).toBeDisplayed();
});

Then(
  /^I should see the friend search input bar from Friends Screen populated with text (.*)$/,
  async (didkey: string) => {
    await expect(friendsScreenFirstUser.addSomeoneInput).toHaveTextContaining(
      didkey
    );
  }
);

Then(
  /^I should see an input error message on Friends Screen showing (.*).$/,
  async (errorMessage: string) => {
    await expect(friendsScreenFirstUser.inputErrorText).toHaveTextContaining(
      errorMessage
    );
  }
);

Then(
  /^I should see a toast notification in Friends Screen showing (.*).$/,
  async () => {
    // Wait for toast notification to disappear
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  }
);

Then(
  /^I should see the Pending Friends Layout displayed on screen$/,
  async () => {
    await friendsScreenFirstUser.incomingRequestsList.waitForDisplayed();
  }
);

Then(/^I should see the Blocked List Layout displayed on screen$/, async () => {
  await friendsScreenFirstUser.blockedList.waitForDisplayed();
});

Then(
  /^I should see the All Friends List Layout displayed on screen$/,
  async () => {
    await friendsScreenFirstUser.friendsList.waitForDisplayed();
  }
);

Then(/^I should see the Chat Screen displayed$/, async () => {
  await chatsLayoutFirstUser.waitForIsShown(true);
});

Then(
  /^I should be able to clear the message and return to Friends Screen$/,
  async () => {
    await chatsInputFirstUser.clearInputBar();
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
  }
);

Then(
  /^I should see the Unfriend button tooltip from (.*) is displayed$/,
  async (friendName: string) => {
    const unfriendTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");
  }
);

Then(
  /^I should see the Block button tooltip from (.*) is displayed$/,
  async (friendName: string) => {
    const blockTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(blockTooltipText).toHaveTextContaining("Block");
  }
);

Then(
  /^I should see (.*) is not present in All Friends List$/,
  async (friendName: string) => {
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const includesFriend = await allFriendsList.includes(friendName);
    await expect(includesFriend).toEqual(false);
  }
);

Then(
  /^I should see (.*) was added to Blocked List$/,
  async (friendName: string) => {
    const blockedFriendsList = await friendsScreenFirstUser.getBlockedList();
    const includesFriend = await blockedFriendsList.includes(friendName);
    await expect(includesFriend).toEqual(true);
  }
);

Then(
  /^I should see the Deny Request button tooltip from (.*) is displayed$/,
  async (friendName: string) => {
    const denyTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(denyTooltipText).toHaveTextContaining("Deny Request");
  }
);

Then(
  /^I should see the Unfriend button tooltip from (.*) is displayed$/,
  async (outgoingFriendName: string) => {
    const unfriendTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      outgoingFriendName
    );
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");
  }
);

Then(
  /^I should see (.*) was added to All Friends List$/,
  async (friendName: string) => {
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allFriendsIncludes = await allFriendsList.includes(friendName);
    await expect(allFriendsIncludes).toEqual(true);
  }
);

Then(
  /^I should click on All Friends List button from Friends Screen$/,
  async () => {
    await friendsScreenFirstUser.goToAllFriendsList();
  }
);

Then(
  /^I should click on Pending Friends button from Friends Screen$/,
  async () => {
    await friendsScreenFirstUser.goToPendingFriendsList();
  }
);

Then(
  /^I should see (.*) is not present in Incoming Request List$/,
  async (friendName: string) => {
    const incomingRequestsList = await friendsScreenFirstUser.getIncomingList();
    const incomingListIncludes = await incomingRequestsList.includes(
      friendName
    );
    await expect(incomingListIncludes).toEqual(false);
  }
);

Then(
  /^I should see (.*) is not present in Outgoing Request List$/,
  async (friendName: string) => {
    const outgoingRequestsList = await friendsScreenFirstUser.getOutgoingList();
    const outgoingListIncludes = await outgoingRequestsList.includes(
      friendName
    );
    expect(outgoingListIncludes).toEqual(false);
  }
);

Then(
  /^I should see the Unblock button tooltip from (.*) is displayed$/,
  async (friendName: string) => {
    const unblockTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(unblockTooltipText).toHaveTextContaining("Unblock");
  }
);

Then(
  /^I should click on Blocked List button from Friends Screen$/,
  async () => {
    await friendsScreenFirstUser.goToBlockedList();
  }
);

Then(
  /^I should see (.*) is not present in Blocked List$/,
  async (friendName: string) => {
    const blockedList = await friendsScreenFirstUser.getBlockedList();
    const blockedListIncludes = await blockedList.includes(friendName);
    await expect(blockedListIncludes).toEqual(false);
  }
);

Then(
  /^I should see (.*) was added to Sidebar Favorites$/,
  async (friendName: string) => {
    // Validate that username and user image bubble is now displayed on Favorites Sidebar
    await friendsScreenFirstUser.favorites.waitForDisplayed();
    // Favorites Sidebar should be displayed
    await expect(chatsLayoutFirstUser.favoritesUserImage).toBeDisplayed();
    await expect(
      chatsLayoutFirstUser.favoritesUserIndicatorOffline
    ).toBeDisplayed();
    await expect(chatsLayoutFirstUser.favoritesUserName).toHaveTextContaining(
      friendName.toUpperCase()
    );
  }
);

Then(/^I should see that Sidebar Favorites is not displayed now$/, async () => {
  await friendsScreenFirstUser.favorites.waitForExist({ reverse: true });
});
