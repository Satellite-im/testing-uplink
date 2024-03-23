require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {};

const SELECTORS_WINDOWS: selectorContainer = {
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

const SELECTORS_MACOS: selectorContainer = {
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

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class FavoritesSidebar extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.SLIMBAR);
  }

  public get favorites() {
    return $(SELECTORS.SLIMBAR).$(SELECTORS.FAVORITES);
  }

  public get favoritesChat() {
    return $(SELECTORS.SLIMBAR).$(SELECTORS.FAVORITES_CONTEXT_CHAT);
  }

  public get favoritesRemove() {
    return $(SELECTORS.SLIMBAR).$(SELECTORS.FAVORITES_CONTEXT_REMOVE);
  }

  public get favoriteUsers() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER);
  }

  public get favoritesUserImage() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  public get favoritesUserImageGroupWrap() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_GROUP_WRAP);
  }

  public get favoritesUserImageProfile() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_PROFILE);
  }

  public get favoritesUserImageWrap() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_WRAP);
  }

  public get favoritesUserIndicator() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR);
  }

  public get favoritesUserIndicatorOffline() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR_OFFLINE);
  }

  public get favoritesUserIndicatorOnline() {
    return $(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR_ONLINE);
  }

  public get slimbar() {
    return $(SELECTORS.SLIMBAR);
  }

  public get slimbarButtonNav() {
    return this.slimbar.$(SELECTORS.SLIMBAR_BUTTON_NAV);
  }

  public get slimbarChatsButton() {
    return this.slimbarButtonNav.$(SELECTORS.SLIMBAR_CHATS_BUTTON);
  }

  public get slimbarFilesButton() {
    return this.slimbarButtonNav.$(SELECTORS.SLIMBAR_FILES_BUTTON);
  }

  public get slimbarFriendsButton() {
    return this.slimbarButtonNav.$(SELECTORS.SLIMBAR_FRIENDS_BUTTON);
  }

  public get slimbarSettingsButton() {
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
    await driver.waitUntil(
      async () => {
        return await $(SELECTORS.SLIMBAR).$(favoritesLocator);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected Favorite User was never displayed after 15 seconds",
      },
    );
    const favoritesElement = await $(SELECTORS.SLIMBAR).$(favoritesLocator);
    return favoritesElement;
  }

  async getFavoritesUserImage(username: string) {
    const favoriteLocator = await this.getFavoritesUserByAriaLabel(username);
    await driver.waitUntil(
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
    await driver.waitUntil(
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
    await driver.waitUntil(
      async () => {
        return await favoriteLocator.$(
          SELECTORS.FAVORITES_USER_INDICATOR_ONLINE,
        );
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected indicator online was never displayed on Favorite User after 15 seconds",
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
      await rightClickOnMacOS(userImageProfile);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(userImageProfile);
    }
    await driver.waitUntil(
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
    await driver.waitUntil(
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

export default new FavoritesSidebar();
