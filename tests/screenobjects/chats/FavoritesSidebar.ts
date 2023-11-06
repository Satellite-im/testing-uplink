import "module-alias/register";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  FAVORITES: '[name="Favorites"]',
  FAVORITES_CONTEXT_CHAT: '[name="favorites-chat"]',
  FAVORITES_CONTEXT_REMOVE: '[name="favorites-remove"]',
  FAVORITES_USER: "<Group>",
  FAVORITES_USER_IMAGE: '[name="User Image"]',
  FAVORITES_USER_IMAGE_GROUP_WRAP: '[name="user-image-group-wrap"]',
  FAVORITES_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FAVORITES_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FAVORITES_USER_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  FAVORITES_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FAVORITES_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  SLIMBAR: '[name="slimbar"]',
  SLIMBAR_BUTTON_NAV: '[name="button-nav"]',
  SLIMBAR_CHATS_BUTTON: '[name="chats-button"]',
  SLIMBAR_FILES_BUTTON: '[name="files-button"]',
  SLIMBAR_FRIENDS_BUTTON: '[name="friends-button"]',
  SLIMBAR_SETTINGS_BUTTON: '[name="settings-button"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
};

const SELECTORS_MACOS = {
  FAVORITES: "~Favorites",
  FAVORITES_CONTEXT_CHAT: "~favorites-chat",
  FAVORITES_CONTEXT_REMOVE: "~favorites-remove",
  FAVORITES_USER: "-ios class chain:**/XCUIElementTypeGroup",
  FAVORITES_USER_IMAGE: "~User Image",
  FAVORITES_USER_IMAGE_GROUP_WRAP: "~user-image-group-wrap",
  FAVORITES_USER_IMAGE_PROFILE: "~user-image-profile",
  FAVORITES_USER_IMAGE_WRAP: "~user-image-wrap",
  FAVORITES_USER_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  FAVORITES_USER_INDICATOR_OFFLINE: "~indicator-offline",
  FAVORITES_USER_INDICATOR_ONLINE: "~indicator-online",
  SLIMBAR: "~slimbar",
  SLIMBAR_BUTTON_NAV: "~button-nav",
  SLIMBAR_CHATS_BUTTON: "~chats-button",
  SLIMBAR_FILES_BUTTON: "~files-button",
  SLIMBAR_FRIENDS_BUTTON: "~friends-button",
  SLIMBAR_SETTINGS_BUTTON: "~settings-button",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class FavoritesSidebar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SLIMBAR);
  }

  get favorites() {
    return this.instance.$(SELECTORS.SLIMBAR).$(SELECTORS.FAVORITES);
  }

  get favoritesChat() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES_CONTEXT_CHAT);
  }

  get favoritesRemove() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES_CONTEXT_REMOVE);
  }

  get favoriteUsers() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER);
  }

  get favoritesUserImage() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get favoritesUserImageGroupWrap() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_GROUP_WRAP);
  }

  get favoritesUserImageProfile() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_PROFILE);
  }

  get favoritesUserImageWrap() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_WRAP);
  }

  get favoritesUserIndicator() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR);
  }

  get favoritesUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR_OFFLINE);
  }

  get favoritesUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR_ONLINE);
  }

  get slimbar() {
    return this.instance.$(SELECTORS.SLIMBAR);
  }

  get slimbarButtonNav() {
    return this.slimbar.$(SELECTORS.SLIMBAR_BUTTON_NAV);
  }

  get slimbarChatsButton() {
    return this.slimbarButtonNav.$(SELECTORS.SLIMBAR_CHATS_BUTTON);
  }

  get slimbarFilesButton() {
    return this.slimbarButtonNav.$(SELECTORS.SLIMBAR_FILES_BUTTON);
  }

  get slimbarFriendsButton() {
    return this.slimbarButtonNav.$(SELECTORS.SLIMBAR_FRIENDS_BUTTON);
  }

  get slimbarSettingsButton() {
    return this.slimbarButtonNav.$(SELECTORS.SLIMBAR_SETTINGS_BUTTON);
  }

  // Favorites methods

  async clickOnContextMenuFavoritesChat() {
    const favoritesChat = await this.favoritesChat;
    await favoritesChat.click();
  }

  async clickOnContextMenuFavoriteRemove() {
    const favoritesRemove = await this.favoritesRemove;
    await favoritesRemove.click();
  }

  async getFavoritesUserByAriaLabel(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let favoritesLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      favoritesLocator = "~" + username;
    } else if (currentDriver === WINDOWS_DRIVER) {
      favoritesLocator = '[name="' + username + '"]';
    }
    await driver[this.executor].waitUntil(
      async () => {
        return await this.instance.$(SELECTORS.SLIMBAR).$(favoritesLocator);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected Favorite User was never displayed after 15 seconds",
      },
    );
    const favoritesElement = await this.instance
      .$(SELECTORS.SLIMBAR)
      .$(favoritesLocator);
    return favoritesElement;
  }

  async getFavoritesUserImage(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    await driver[this.executor].waitUntil(
      async () => {
        return await favoriteLocator.$(SELECTORS.FAVORITES_USER_IMAGE);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected user image was never displayed on Favorites Sidebar after 15 seconds",
      },
    );
    const userImage = await favoriteLocator.$(SELECTORS.FAVORITES_USER_IMAGE);
    return userImage;
  }

  async getFavoritesUserImageGroupWrap(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    await driver[this.executor].waitUntil(
      async () => {
        return await favoriteLocator.$(
          SELECTORS.FAVORITES_USER_IMAGE_GROUP_WRAP,
        );
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected user image group wrap was never displayed on Favorites Sidebar after 15 seconds",
      },
    );

    const userImageGroupWrap = await favoriteLocator.$(
      SELECTORS.FAVORITES_USER_IMAGE_GROUP_WRAP,
    );
    return userImageGroupWrap;
  }

  async getFavoritesUserImageProfile(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    const imageProfile = await favoriteLocator.$(
      SELECTORS.FAVORITES_USER_IMAGE_PROFILE,
    );
    await imageProfile.waitForExist();
    return imageProfile;
  }

  async getFavoritesUserImageWrap(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    const userImageWrap = await favoriteLocator.$(
      SELECTORS.FAVORITES_USER_IMAGE_WRAP,
    );
    await userImageWrap.waitForExist();
    return userImageWrap;
  }

  async getFavoritesUserIndicator(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    const indicator = await favoriteLocator.$(
      SELECTORS.FAVORITES_USER_INDICATOR,
    );
    await indicator.waitForExist();
    return indicator;
  }

  async getFavoritesUserIndicatorOffline(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    const indicatorOffline = await favoriteLocator.$(
      SELECTORS.FAVORITES_USER_INDICATOR_OFFLINE,
    );
    await indicatorOffline.waitForExist();
    return indicatorOffline;
  }

  async getFavoritesUserIndicatorOnline(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    await driver[this.executor].waitUntil(
      async () => {
        return await favoriteLocator.$(
          SELECTORS.FAVORITES_USER_INDICATOR_ONLINE,
        );
      },
      {
        timeout: 60000,
        timeoutMsg:
          "Expected indicator online was never displayed on Favorite User after 60 seconds",
      },
    );

    const indicatorOnline = await favoriteLocator.$(
      SELECTORS.FAVORITES_USER_INDICATOR_ONLINE,
    );
    return indicatorOnline;
  }

  async hoverOnFavoritesBubble(name: string) {
    const favoritesBubble = await this.getFavoritesUserImageProfile(name);
    await this.hoverOnElement(favoritesBubble);
  }

  async openContextMenuOnFavoritesUser(name: string) {
    const userImageProfile = await this.getFavoritesUserImageProfile(name);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(userImageProfile, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(userImageProfile, this.executor);
    }
    await driver[this.executor].waitUntil(
      async () => {
        return await this.contextMenu;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected Context Menu was never displayed after 15 seconds",
      },
    );
  }

  // Slimbar NavBar methods

  async clickOnSlimbarChatsButton() {
    const slimbarChatsButton = await this.slimbarChatsButton;
    await slimbarChatsButton.click();
  }

  async clickOnSlimbarFilesButton() {
    const slimbarFilesButton = await this.slimbarFilesButton;
    await slimbarFilesButton.click();
  }

  async clickOnSlimbarFriendsButton() {
    const slimbarFriendsButton = await this.slimbarFriendsButton;
    await slimbarFriendsButton.click();
  }

  async clickOnSlimbarSettingsButton() {
    const slimbarSettingsButton = await this.slimbarSettingsButton;
    await slimbarSettingsButton.click();
  }

  // Hovering methods

  async hoverOnSlimbarChatsButton() {
    const slimbarChatsButton = await this.slimbarChatsButton;
    await this.hoverOnElement(slimbarChatsButton);
  }

  async hoverOnSlimbarFilesButton() {
    const slimbarFilesButton = await this.slimbarFilesButton;
    await this.hoverOnElement(slimbarFilesButton);
  }

  async hoverOnSlimbarFriendsButton() {
    const slimbarFriendsButton = await this.slimbarFriendsButton;
    await this.hoverOnElement(slimbarFriendsButton);
  }

  async hoverOnSlimbarSettingsButton() {
    const slimbarSettingsButton = await this.slimbarSettingsButton;
    await this.hoverOnElement(slimbarSettingsButton);
  }

  async validateFavoritesAreShown() {
    await driver[this.executor].waitUntil(
      async () => {
        return await this.favorites;
      },
      {
        timeout: 15000,
        timeoutMsg: "Expected Favorites were never displayed after 15 seconds",
      },
    );
  }

  async validateFavoritesUserImage(username: string) {
    const favoritesImage = await this.getFavoritesUserImage(username);
    await favoritesImage.waitForDisplayed();
  }

  async validateFavoritesIndicatorOnline(username: string) {
    const indicatorOnline =
      await this.getFavoritesUserIndicatorOnline(username);
    await indicatorOnline.waitForDisplayed();
  }
}
