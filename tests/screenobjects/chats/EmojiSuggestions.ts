require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  EMOJI_SUGGESTIONS_CLOSE_BUTTON: '[name="chatbar-suggestions-close-button"]',
  EMOJI_SUGGESTIONS_CONTAINER: '[name="chatbar-suggestions-container"]',
  EMOJI_SUGGESTIONS_HEADER: "<Text>",
  EMOJI_SUGGESTED: '//Group[contains(@Name, "emoji-suggested-")]',
  EMOJI_SUGGESTED_VALUE: "<Text>",
};

const SELECTORS_MACOS = {
  EMOJI_SUGGESTIONS_CLOSE_BUTTON: "~chatbar-suggestion-close-button",
  EMOJI_SUGGESTIONS_CONTAINER: "~chatbar-suggestions-container",
  EMOJI_SUGGESTIONS_HEADER:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "SUGGESTED EMOJI"`][2]',
  EMOJI_SUGGESTED:
    '-ios class chain:**/XCUIElementTypeGroup[`label BEGINSWITH "emoji-suggested-"`]',
  EMOJI_SUGGESTED_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EmojiSuggestions extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.EMOJI_SUGGESTIONS_CONTAINER);
  }

  get emojiSuggestionsCloseButton() {
    return this.emojiSuggestionsContainer.$(
      SELECTORS.EMOJI_SUGGESTIONS_CLOSE_BUTTON,
    );
  }

  get emojiSuggestionsContainer() {
    return $(SELECTORS.EMOJI_SUGGESTIONS_CONTAINER);
  }

  get emojiSuggestionsHeader() {
    return this.emojiSuggestionsContainer.$(SELECTORS.EMOJI_SUGGESTIONS_HEADER);
  }

  get emojiSuggested() {
    return this.emojiSuggestionsContainer.$$(SELECTORS.EMOJI_SUGGESTED);
  }

  get emojiSuggestedValue() {
    return this.emojiSuggestionsContainer.$(SELECTORS.EMOJI_SUGGESTED_VALUE);
  }

  async clickOnEmojiSuggested(emojiToClick: string) {
    await this.validateEmojiSuggestionsContainerIsShown();
    const currentDriver = await this.getCurrentDriver();
    let emojiLocator, emojiElement;
    if (currentDriver === MACOS_DRIVER) {
      emojiLocator = "~emoji-suggested-" + emojiToClick;
      emojiElement = await $(emojiLocator);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const emojiLocatorWindows =
        '[name="emoji-suggested-"' + emojiToClick + '"]';
      emojiLocator = await driver.findElement("name", emojiLocatorWindows);
      emojiElement = await $(emojiLocator);
    }
    await this.hoverOnElement(emojiElement);
    await emojiElement.click();
  }

  async clickOnCloseButton() {
    const closeButton = await this.emojiSuggestionsCloseButton;
    await closeButton.click();
  }

  async getEmojisSuggested() {
    await this.validateEmojiSuggestionsContainerIsShown();
    const emojiSuggestedList = await this.emojiSuggestionsContainer.$$(
      SELECTORS.EMOJI_SUGGESTED,
    );
    let results = [];
    for (let item of emojiSuggestedList) {
      const itemValue = await item.$(SELECTORS.EMOJI_SUGGESTED_VALUE);
      const itemValueText = await itemValue.getText();
      results.push(itemValueText);
    }
    return results;
  }

  async validateEmojiSuggestionsContainerIsShown() {
    await this.emojiSuggestionsContainer.waitForExist();
  }

  async validateEmojiSuggestionsContainerIsNotShown() {
    await this.emojiSuggestionsContainer.waitForExist({
      reverse: true,
    });
  }

  async validateEmojiSuggestionsHeader(expectedHeader: string) {
    await this.emojiSuggestionsHeader.waitForDisplayed();
    const emojiSuggestionsHeader = await this.emojiSuggestionsHeader;
    await expect(emojiSuggestionsHeader).toHaveText(expectedHeader);
  }

  async validateEmojiSuggestionsReceived(expectedEmojiList: string[]) {
    const emojiSuggestedList = await this.getEmojisSuggested();
    await expect(emojiSuggestedList).toEqual(expectedEmojiList);
  }
}
