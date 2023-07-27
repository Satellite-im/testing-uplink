import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  FAVORITES: '[name="Favorites"]',
  FAVORITES_CONTEXT_CHAT: '[name="favorites-chat"]',
  FAVORITES_CONTEXT_REMOVE: '[name="favorites-remove"]',
  FAVORITES_HEADER: '[name="favorites-label"]',
  FAVORITES_HEADER_TEXT: "//Text",
  FAVORITES_USER: "//Group",
  FAVORITES_USER_IMAGE: '[name="User Image"]',
  FAVORITES_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FAVORITES_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FAVORITES_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FAVORITES_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  FAVORITES_USER_NAME: "//Text[2]/Text",
};

const SELECTORS_MACOS = {
  FAVORITES: "~Favorites",
  FAVORITES_CONTEXT_CHAT: "~favorites-chat",
  FAVORITES_CONTEXT_REMOVE: "~favorites-remove",
  FAVORITES_HEADER: "~favorites-label",
  FAVORITES_HEADER_TEXT: "-ios class chain:**/XXCUIElementTypeStaticText",
  FAVORITES_USER: "-ios class chain:**/XCUIElementTypeGroup",
  FAVORITES_USER_IMAGE: "~User Image",
  FAVORITES_USER_IMAGE_PROFILE: "~user-image-profile",
  FAVORITES_USER_IMAGE_WRAP: "~user-image-wrap",
  FAVORITES_USER_INDICATOR_OFFLINE: "~indicator-offline",
  FAVORITES_USER_INDICATOR_ONLINE: "~indicator-online",
  FAVORITES_USER_NAME:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
};

currentOS === windowsDriver
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class FavoritesSidebar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.FAVORITES);
  }

  get favorites() {
    return this.instance.$(SELECTORS.SIDEBAR).$(SELECTORS.FAVORITES);
  }

  get favoritesChat() {
    return this.instance.$(SELECTORS.FAVORITES_CONTEXT_CHAT);
  }

  get favoritesRemove() {
    return this.instance.$(SELECTORS.FAVORITES_CONTEXT_REMOVE);
  }

  get favoritesHeader() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_HEADER);
  }

  get favoritesHeaderText() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_HEADER)
      .$(SELECTORS.FAVORITES_HEADER_TEXT);
  }

  get favoriteUsers() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER);
  }

  get favoritesUserImage() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get favoritesUserImageProfile() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_PROFILE);
  }

  get favoritesUserImageWrap() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_WRAP);
  }

  get favoritesUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_INDICATOR_OFFLINE);
  }

  get favoritesUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_INDICATOR_ONLINE);
  }

  get favoritesUserName() {
    return this.instance
      .$(SELECTORS.SIDEBAR)
      .$(SELECTORS.FAVORITES)
      .$(SELECTORS.FAVORITES_USER_NAME);
  }

  // Favorites methods

  async clickOnContextMenuFavoritesChat() {
    await this.favoritesChat.click();
  }

  async clickOnContextMenuFavoriteRemove() {
    await this.favoritesRemove.click();
  }

  async getUsersFromFavorites() {
    const favoriteUsers = await this.favoritesUserName;
    let currentFavoriteUsers = [];
    for (let name of favoriteUsers) {
      currentFavoriteUsers.push(await this.instance.$(name).getText());
    }
    return currentFavoriteUsers;
  }

  async getLocatorOfFavoritesUser(name: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator =
        '-ios class chain:**//XCUIElementTypeGroup[`label == "' + name + '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = '//Group[@Name="' + name + '"]';
    }
    return locator;
  }

  async openContextMenuOnFavoritesUser(name: string) {
    const locator = await this.getLocatorOfFavoritesUser(name);
    const element = await this.favorites.$(locator);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(element, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(element, this.executor);
    }
    await this.contextMenu.waitForDisplayed();
  }

  async validateUserIsInFavorites(locator: string) {
    const element = await this.getLocatorOfFavoritesUser(locator);
    await this.favorites.$(element).waitForExist({ timeout: 10000 });
  }
}
