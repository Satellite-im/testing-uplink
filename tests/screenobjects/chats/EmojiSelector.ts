import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  EMOJI: '[name="emoji"]',
  EMOJI_VALUE: "//Text",
  EMOJI_SELECTOR: '[name="emoji-selector"]',
  EMOJIS_CONTAINER: '[name="emojis-container"]',
};

const SELECTORS_MACOS = {
  EMOJI: "~emoji",
  EMOJI_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  EMOJI_SELECTOR: "~emoji-selector",
  EMOJIS_CONTAINER: "~emojis-container",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EmojiSelector extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.EMOJI_SELECTOR);
  }

  get emoji() {
    return this.instance.$(SELECTORS.EMOJI_SELECTOR).$$(SELECTORS.EMOJI);
  }

  get emojiValue() {
    return this.instance
      .$(SELECTORS.EMOJI_SELECTOR)
      .$$(SELECTORS.EMOJI)
      .$$(SELECTORS.EMOJI_VALUE);
  }

  get emojiSelector() {
    return this.instance.$(SELECTORS.EMOJI_SELECTOR);
  }

  get emojisContainer() {
    return this.instance
      .$(SELECTORS.EMOJI_SELECTOR)
      .$$(SELECTORS.EMOJIS_CONTAINER);
  }

  async clickOnEmoji(emojiToClick: string) {
    const currentDriver = await this.getCurrentDriver();
    let emojiLocator;
    if (currentDriver === MACOS_DRIVER) {
      emojiLocator = await this.instance.$(
        '//XCUIElementTypeGroup[@label="emoji"]/XCUIElementTypeStaticText[@value="' +
          emojiToClick +
          '"]'
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      emojiLocator = await this.instance.$(
        '//Group[@Name="emoji"]/Text[@Name="' + emojiToClick + '"]'
      );
    }
    await emojiLocator.click();
    await this.emojiSelector.waitForExist({ reverse: true });
  }
}
