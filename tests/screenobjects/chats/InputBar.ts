import { faker } from "@faker-js/faker";
import { selectFileOnMacos, selectFileOnWindows } from "../../helpers/commands";
import { join } from "path";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  INPUT_GROUP: '[name="input-group"]',
  INPUT_TEXT: "//Edit",
  SEND_MESSAGE_BUTTON: '[name="send-message-button"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  UPLOAD_BUTTON: '[name="upload-button"]',
};

const SELECTORS_MACOS = {
  INPUT_GROUP: "~input-group",
  INPUT_TEXT: "-ios class chain:**/XCUIElementTypeTextView",
  SEND_MESSAGE_BUTTON: "~send-message-button",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  UPLOAD_BUTTON: "~upload-button",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class InputBar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.INPUT_GROUP);
  }

  get inputGroup() {
    return this.instance.$(SELECTORS.CHAT_LAYOUT).$(SELECTORS.INPUT_GROUP);
  }

  get inputText() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.INPUT_GROUP)
      .$(SELECTORS.INPUT_TEXT);
  }

  get sendMessageButton() {
    return this.instance.$(SELECTORS.SEND_MESSAGE_BUTTON);
  }

  get sendMessageTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get sendMessageTooltipText() {
    return this.instance.$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get uploadButton() {
    return this.instance.$(SELECTORS.UPLOAD_BUTTON);
  }

  get uploadTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get uploadTooltipText() {
    return this.instance.$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  async clearInputBar() {
    await this.inputText.clearValue();
  }

  async clickOnInputBar() {
    await this.inputText.click();
  }

  async clickOnSendMessage() {
    await this.sendMessageButton.click();
  }

  async clickOnUploadFile() {
    await this.uploadButton.click();
  }

  async generateRandomText() {
    // Get a random word of 9 chars and add it a space
    const wordToRepeat = faker.lorem.word(9) + " ";
    // Then repeat the same word for 102 times (1020 chars)
    let longParagraph = wordToRepeat.repeat(102);
    // Now, add 4 more chars, to have 1024 chars
    longParagraph += "abcd";
    return longParagraph;
  }

  async getFilePath(relativePath: string) {
    return join(process.cwd(), relativePath);
  }

  async hoverOnSendButton() {
    const element = await this.sendMessageButton;
    await this.hoverOnElement(element);
  }

  async hoverOnUploadButton() {
    const element = await this.uploadButton;
    await this.hoverOnElement(element);
  }

  async pressEnterKeyOnInputBar() {
    const currentDriver = await this.getCurrentDriver();
    let enterValue;
    currentDriver === "windows" ? (enterValue = "\uE007") : (enterValue = "\n");
    await this.inputText.setValue(enterValue);
  }

  async typeMessageOnInput(text: string) {
    await this.inputText.clearValue();
    await this.inputText.setValue(text);
    // Retry if webdriverio typing failed
    if ((await this.inputText.getValue()) !== text) {
      await this.inputText.clearValue();
      await this.inputText.setValue(text);
    }
  }

  async typeOnEditMessageInput(editedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let enterValue;
    currentDriver === "windows" ? (enterValue = "\uE007") : (enterValue = "\n");
    await this.instance.$$(SELECTORS.INPUT_TEXT)[1].clearValue();
    await this.instance
      .$$(SELECTORS.INPUT_TEXT)[1]
      .setValue(editedMessage + enterValue);
  }

  async uploadFile(relativePath: string) {
    const currentDriver = await this.getCurrentDriver();
    await this.clickOnUploadFile();
    if (currentDriver === "mac2") {
      await selectFileOnMacos(relativePath, this.executor);
    } else if (currentDriver === "windows") {
      await selectFileOnWindows(relativePath);
    }
  }
}
