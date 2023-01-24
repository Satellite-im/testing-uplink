import AppScreen from "./AppScreen";

const SELECTORS = {
  ACCEPT_FRIEND_REQUEST_BUTTON: "~Accept Friend",
  ADD_SOMEONE_BUTTON: "~Add Someone Button",
  ADD_SOMEONE_INPUT: "~Add Someone Input",
  ALL_FRIENDS_BUTTON: "~all-friends-button",
  BLOCK_FRIEND_BUTTON: "~Block Friend",
  BLOCKED_FRIENDS_BUTTON: "~blocked-friends-button",
  BLOCKED_LIST: "~Blocked List",
  BUTTON_BADGE: "~Button Badge",
  BUTTON_NAV: "~button-nav",
  CHAT_SEARCH_INPUT: "~chat-search-input",
  CHAT_WITH_FRIEND_BUTTON: "~Chat With Friend",
  CHATS_BUTTON: "~chats-button",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_OPTION: "~Context Item",
  FAVORITES: "~Favorites",
  FAVORITES_USER_IMAGE: "~User Image",
  FILES_BUTTON: "~files-button",
  FRIEND_INFO: "~Friend Info",
  FRIEND_RECORD: "~Friend",
  FRIENDS_BODY: "~friends-body",
  FRIENDS_BUTTON: "~friends-button",
  FRIENDS_CONTROLS: "~friends-controls",
  FRIENDS_LAYOUT: "~friends-layout",
  FRIENDS_LIST: "~Friends List",
  INCOMING_REQUESTS_LIST: "~Incoming Requests List",
  OUTGOING_REQUESTS_LIST: "~Outgoing Requests List",
  PENDING_FRIENDS_BUTTON: "~pending-friends-button",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Pre-release"`]',
  REMOVE_OR_DENY_FRIEND_BUTTON: "~Remove or Deny Friend",
  SETTINGS_BUTTON: "~settings-button",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_SEARCH: "~sidebar-search",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
};

class FriendsScreen extends AppScreen {
  constructor() {
    super(SELECTORS.FRIENDS_LAYOUT);
  }

  get acceptFriendRequestButton() {
    return $(SELECTORS.ACCEPT_FRIEND_REQUEST_BUTTON);
  }

  get addSomeoneButton() {
    return $(SELECTORS.ADD_SOMEONE_BUTTON);
  }

  get addSomeoneInput() {
    return $(SELECTORS.ADD_SOMEONE_INPUT);
  }

  get allFriendsButton() {
    return $(SELECTORS.ALL_FRIENDS_BUTTON);
  }

  get blockFriendButton() {
    return $(SELECTORS.BLOCK_FRIEND_BUTTON);
  }

  get blockedFriendsButton() {
    return $(SELECTORS.BLOCKED_FRIENDS_BUTTON);
  }

  get blockedList() {
    return $(SELECTORS.BLOCKED_LIST);
  }

  get buttonBadge() {
    return $(SELECTORS.BUTTON_BADGE);
  }

  get buttonNav() {
    return $(SELECTORS.BUTTON_NAV);
  }

  get chatSearchInput() {
    return $(SELECTORS.CHAT_SEARCH_INPUT);
  }

  get chatsButton() {
    return $(SELECTORS.CHATS_BUTTON);
  }

  get chatWithFriendButton() {
    return $(SELECTORS.CHAT_WITH_FRIEND_BUTTON);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuOption() {
    return $$(SELECTORS.CONTEXT_MENU_OPTION);
  }

  get favorites() {
    return $(SELECTORS.FAVORITES);
  }

  get favoritesUserImage() {
    return $(SELECTORS.FAVORITES).$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get filesButton() {
    return $(SELECTORS.FILES_BUTTON);
  }

  get friendInfo() {
    return $(SELECTORS.FRIEND_INFO);
  }

  get friendRecord() {
    return $$(SELECTORS.FRIEND_RECORD);
  }

  get friendsBody() {
    return $(SELECTORS.FRIENDS_BODY);
  }

  get friendsButton() {
    return $(SELECTORS.FRIENDS_BUTTON);
  }

  get friendsControls() {
    return $(SELECTORS.FRIENDS_CONTROLS);
  }

  get friendsLayout() {
    return $(SELECTORS.FRIENDS_LAYOUT);
  }

  get friendsList() {
    return $(SELECTORS.FRIENDS_LIST);
  }

  get incomingRequestsList() {
    return $(SELECTORS.INCOMING_REQUESTS_LIST);
  }

  get outgoingRequestsList() {
    return $(SELECTORS.OUTGOING_REQUESTS_LIST);
  }

  get pendingFriendsButton() {
    return $(SELECTORS.PENDING_FRIENDS_BUTTON);
  }

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR);
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR_TEXT);
  }

  get removeOrDenyFriendButton() {
    return $(SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON);
  }

  get settingsButton() {
    return $(SELECTORS.SETTINGS_BUTTON);
  }

  get sidebar() {
    return $(SELECTORS.SIDEBAR);
  }

  get sidebarChildren() {
    return $(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarSearch() {
    return $(SELECTORS.SIDEBAR_SEARCH);
  }

  get window() {
    return $(SELECTORS.WINDOW);
  }

  async acceptIncomingRequest(name: string) {
    const friend = await driver.findElement(
      "xpath",
      "//*[@label='Friend Info']//*[@value='" + name + "']/../../.."
    );
    const button = await driver.findElementFromElement(
      friend.ELEMENT,
      "accessibility id",
      "Accept Friend"
    );
    await $(button).click();
  }

  async blockUser(name: string) {
    const friend = await driver.findElement(
      "xpath",
      "//*[@label='Friend Info']//*[@value='" + name + "']/../../.."
    );
    const button = await driver.findElementFromElement(
      friend.ELEMENT,
      "accessibility id",
      "Block Friend"
    );
    await $(button).click();
  }

  async chatWithFriend(name: string) {
    const friend = await driver.findElement(
      "xpath",
      "//*[@label='Friend Info']//*[@value='" + name + "']/../../.."
    );
    const button = await driver.findElementFromElement(
      friend.ELEMENT,
      "accessibility id",
      "Chat With Friend"
    );
    await $(button).click();
  }

  async getEntireFriendsList(list: string) {
    const friendNames = await driver.findElements(
      "xpath",
      "//*[@label='" + list + "']//*[@label='Friend Info']/*[1]/*[1]"
    );
    let names = [];
    for (let name of friendNames) {
      names.push(await (await $(name)).getText());
    }
    return names;
  }

  async getUserFromFriendsList(list: string) {
    const firstUserFromList = await driver.findElement(
      "xpath",
      "//*[@label='" + list + "']//*[@label='Friend Info']/*[1]/*[1]"
    );
    const user = await (await $(firstUserFromList)).getText();
    return user;
  }

  async getUsersFromFavorites() {
    const favoriteUsers = await driver.findElements(
      "xpath",
      "//*[@label='Favorites']//*[@label='User Image']/../../*[2]"
    );
    let currentFavoriteUsers = [];
    for (let name of favoriteUsers) {
      currentFavoriteUsers.push(await (await $(name)).getText());
    }
    return currentFavoriteUsers;
  }

  async goToMainScreen() {
    await (await this.chatsButton).click();
  }

  async openFriendContextMenu(friend: string) {
    const friendLocator = await driver.findElement(
      "xpath",
      "//*[@label='Friend Info']//*[@value='" + friend + "']/../../.."
    );
    const friendBubble = await (await $(friendLocator)).$("~User Image");
    await driver.executeScript("macos: rightClick", [
      {
        elementId: friendBubble,
      },
    ]);
    await (await this.contextMenu).waitForDisplayed();
  }

  async removeOrDenyFriend(name: string) {
    const friend = await driver.findElement(
      "xpath",
      "//*[@label='Friend Info']//*[@value='" + name + "']/../../.."
    );
    const button = await driver.findElementFromElement(
      friend.ELEMENT,
      "accessibility id",
      "Remove or Deny Friend"
    );
    await $(button).click();
  }
}

export default new FriendsScreen();
