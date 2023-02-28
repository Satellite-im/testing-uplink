import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
const { exec, execSync } = require("child_process");

let SELECTORS = {};

const SELECTORS_COMMON = {
  FRIENDS_LAYOUT: "~friends-layout",
};

const SELECTORS_WINDOWS = {
  ACCEPT_FRIEND_REQUEST_BUTTON: '[name="Accept Friend"]',
  ADD_SOMEONE_BUTTON: '[name="Add Someone Button"]',
  ADD_SOMEONE_INPUT: '[name="Add Someone Input"]',
  ALL_FRIENDS_BUTTON: '[name="all-friends-button"]',
  BLOCK_FRIEND_BUTTON: '[name="Block Friend"]',
  BLOCKED_FRIENDS_BUTTON: '[name="blocked-friends-button"]',
  BLOCKED_LIST: '[name="Blocked List"]',
  CHAT_WITH_FRIEND_BUTTON: '[name="Chat With Friend"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_OPTION: '[name="Context Item"]',
  COPY_ID_BUTTON: '[name="Copy ID"]',
  FAVORITES: '[name="Favorites"]',
  FAVORITES_USER_IMAGE: '[name="User Image"]',
  FRIEND_INFO: '[name="Friend Info"]',
  FRIEND_INFO_USERNAME: "//Text[1]",
  FRIEND_INFO_USERCODE: "//Text[2]",
  FRIEND_RECORD: '[name="Friend"]',
  FRIENDS_BODY: '[name="friends-body"]',
  FRIENDS_BUTTON_BADGE: '[name="Button Badge"]',
  FRIENDS_BUTTON_BADGE_TEXT: "//Text",
  FRIENDS_CONTROLS: '[name="friends-controls"]',
  FRIENDS_LIST: '[name="Friends List"]',
  INCOMING_REQUESTS_LIST: '[name="Incoming Requests List"]',
  INPUT_ERROR: '[name="input-error"]',
  OUTGOING_REQUESTS_LIST: '[name="Outgoing Requests List"]',
  PENDING_FRIENDS_BUTTON: '[name="pending-friends-button"]',
  REMOVE_OR_DENY_FRIEND_BUTTON: '[name="Remove or Deny Friend"]',
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOAST_NOTIFICATION_CLOSE: "//Button/Button",
  TOAST_NOTIFICATION_TEXT: "//Text[2]",
  TOPBAR: '[name="Topbar"]',
};

const SELECTORS_MACOS = {
  ACCEPT_FRIEND_REQUEST_BUTTON: "~Accept Friend",
  ADD_SOMEONE_BUTTON: "~Add Someone Button",
  ADD_SOMEONE_INPUT: "~Add Someone Input",
  ALL_FRIENDS_BUTTON: "~all-friends-button",
  BLOCK_FRIEND_BUTTON: "~Block Friend",
  BLOCKED_FRIENDS_BUTTON: "~blocked-friends-button",
  BLOCKED_LIST: "~Blocked List",
  CHAT_WITH_FRIEND_BUTTON: "~Chat With Friend",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_OPTION: "~Context Item",
  COPY_ID_BUTTON: "~Copy ID",
  FAVORITES: "~Favorites",
  FAVORITES_USER_IMAGE: "~User Image",
  FRIENDS_BUTTON_BADGE: "~Button Badge",
  FRIENDS_BUTTON_BADGE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  FRIEND_INFO: "~Friend Info",
  FRIEND_INFO_USERNAME:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[1]",
  FRIEND_INFO_USERCODE:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[2]",
  FRIEND_RECORD: "~Friend",
  FRIENDS_BODY: "~friends-body",
  FRIENDS_CONTROLS: "~friends-controls",
  FRIENDS_LIST: "~Friends List",
  INCOMING_REQUESTS_LIST: "~Incoming Requests List",
  INPUT_ERROR: "~input-error",
  OUTGOING_REQUESTS_LIST: "~Outgoing Requests List",
  PENDING_FRIENDS_BUTTON: "~pending-friends-button",
  REMOVE_OR_DENY_FRIEND_BUTTON: "~Remove or Deny Friend",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOAST_NOTIFICATION_CLOSE: "//*[3]",
  TOAST_NOTIFICATION_TEXT: "//*[2]/*[1]",
  TOPBAR: "~Topbar",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class FriendsScreen extends UplinkMainScreen {
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

  get allFriendsFriends() {
    return $(SELECTORS.FRIENDS_LIST).$$(SELECTORS.FRIEND);
  }

  get allFriendsFriendsImages() {
    return $(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.FRIEND)
      .$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get allFriendsFriendsInfo() {
    return $(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.FRIEND)
      .$$(SELECTORS.FRIEND_INFO);
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

  get chatWithFriendButton() {
    return $(SELECTORS.CHAT_WITH_FRIEND_BUTTON);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuOption() {
    return $$(SELECTORS.CONTEXT_MENU_OPTION);
  }

  get copyIdButton() {
    return $(SELECTORS.FRIENDS_BODY).$(SELECTORS.COPY_ID_BUTTON);
  }

  get favorites() {
    return $(SELECTORS.FAVORITES);
  }

  get favoritesUserImage() {
    return $(SELECTORS.FAVORITES).$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get friendInfo() {
    return $(SELECTORS.FRIEND_INFO);
  }

  get friendInfoUsername() {
    return $$(SELECTORS.FRIEND_INFO).$(SELECTORS.FRIEND_INFO_USERNAME);
  }

  get friendInfoUsercode() {
    return $$(SELECTORS.FRIEND_INFO).$(SELECTORS.FRIEND_INFO_USERCODE);
  }

  get friendRecord() {
    return $$(SELECTORS.FRIEND_RECORD);
  }

  get friendsBody() {
    return $(SELECTORS.FRIENDS_BODY);
  }

  get friendsButtonBadge() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.FRIENDS_BUTTON_BADGE);
  }

  get friendsButtonBadgeText() {
    return $(SELECTORS.TOPBAR)
      .$(SELECTORS.FRIENDS_BUTTON_BADGE)
      .$(SELECTORS.FRIENDS_BUTTON_BADGE_TEXT);
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

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get outgoingRequestsList() {
    return $(SELECTORS.OUTGOING_REQUESTS_LIST);
  }

  get pendingFriendsButton() {
    return $(SELECTORS.PENDING_FRIENDS_BUTTON);
  }

  get removeOrDenyFriendButton() {
    return $(SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON);
  }

  get toastNotification() {
    return $(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotificationClose() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(SELECTORS.TOAST_NOTIFICATION_TEXT);
  }

  get toastNotificationText() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(SELECTORS.TOAST_NOTIFICATION_TEXT);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
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

  async clickOnAddSomeoneButton() {
    await this.addSomeoneButton.click();
  }

  async clickOnCopyID() {
    await this.copyIdButton.click();
  }

  async closeToastNotification() {
    await this.toastNotificationClose.click();
  }

  async deleteAddFriendInput() {
    await this.addSomeoneInput.clearValue();
  }

  async enterFriendDidKey(didkey: string) {
    await (await this.addSomeoneInput).click();
    await (await this.addSomeoneInput).clearValue();
    await this.addSomeoneInput.setValue(didkey);
  }

  async enterCopiedID() {
    let copiedKey;
    if ((await this.getCurrentDriver()) === "mac2") {
      copiedKey = await execSync("pbpaste", { encoding: "utf8" });
      this.enterFriendDidKey(copiedKey);
    } else if ((await this.getCurrentDriver()) === "windows") {
      const powershellCmd = "powershell.exe Get-Clipboard";
      exec(powershellCmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        copiedKey = stdout.trim();
        this.enterFriendDidKey(copiedKey);
      });
    }
  }

  async getAbbreviatedDidKey(key: string) {
    return key.substr(8, 3) + "..." + key.substr(-3);
  }

  async getButtonBadgeText() {
    return this.buttonBadgeText.getText();
  }

  async getOutgoingList() {
    const friends = await $(SELECTORS.OUTGOING_REQUESTS_LIST).$$(
      SELECTORS.FRIEND_INFO
    );
    let results = [];
    for (let friend of friends) {
      results.push(await friend.$(SELECTORS.FRIEND_INFO_USERNAME).getText());
    }
    return results;
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

  async getToastNotificationText() {
    return await this.toastNotificationClose.getText();
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

  async goToAllFriendsList() {
    await (await this.allFriendsButton).click();
  }

  async goToBlockedList() {
    await (await this.blockFriendButton).click();
  }

  async goToPendingFriendsList() {
    await (await this.pendingFriendsButton).click();
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
