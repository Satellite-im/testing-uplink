import "module-alias/register";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  EMOJI_SUGGESTIONS_CONTAINER: '[name="emoji-suggestions-container"]',
  EMOJI_SUGGESTED: '//Group[contains(@value, "emoji-suggested-")]',
  EMOJI_SUGGESTED_VALUE: "<Text>",
};

const SELECTORS_MACOS = {
  EMOJI_SUGGESTIONS_CONTAINER: "~emoji-suggestions-container",
  EMOJI_SUGGESTED:
    '//XCUIElementTypeGroup[contains(@value, "emoji-suggested-")]',
  EMOJI_SUGGESTED_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EmojiSuggestions extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.EMOJI_SUGGESTIONS_CONTAINER);
  }

  get emojiSuggestionsContainer() {
    return this.instance.$(SELECTORS.EMOJI_SUGGESTIONS_CONTAINER);
  }

  get emojiSuggested() {
    return this.emojiSuggestionsContainer.$$(SELECTORS.EMOJI_SUGGESTED);
  }

  get emojiSuggestedValue() {
    return this.emojiSuggestionsContainer.$(SELECTORS.EMOJI_SUGGESTED_VALUE);
  }

  async clickOnEmojiSuggested(emojiToClick: string) {
    const container = await this.emojiSuggestionsContainer;
    await container.waitForDisplayed();
    const currentDriver = await this.getCurrentDriver();
    let emojiLocator, emojiElement;
    if (currentDriver === MACOS_DRIVER) {
      emojiLocator = "~emoji-suggested-" + emojiToClick;
      emojiElement = await this.instance.$(emojiLocator);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const emojiLocatorWindows =
        '[name="emoji-suggested-"' + emojiToClick + '"]';
      emojiLocator = await this.instance.findElement(
        "name",
        emojiLocatorWindows
      );
      emojiElement = await this.instance.$(emojiLocator);
    }
    await this.hoverOnElement(emojiElement);
    await emojiElement.click();
  }
}
