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
  FRIEND_RECORD: '[name="Friend"]',
  FRIENDS_BODY: '[name="friends-body"]',
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
  FRIEND_INFO: "~Friend Info",
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

  get friendRecord() {
    return $$(SELECTORS.FRIEND_RECORD);
  }

  get friendsBody() {
    return $(SELECTORS.FRIENDS_BODY);
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
