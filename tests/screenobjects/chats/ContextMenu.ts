import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_OPTION: '[name="Context Item"]',
};

const SELECTORS_MACOS = {
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_OPTION: "~Context Item",
  TOOLTIP: "~tooltip",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ContextMenu extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CONTEXT_MENU);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuOption() {
    return $$(SELECTORS.CONTEXT_MENU_OPTION);
  }

  async selectContextOption(option: number) {
    await this.contextMenuOption[option].click();
  }

  async validateContextMenuIsOpen() {
    await this.contextMenu.waitForDisplayed();
  }
}

export default new ContextMenu();
