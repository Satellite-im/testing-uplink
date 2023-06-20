import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  ADD_MESSAGE_REACTION: '[name="add-message-reaction"]',
  TEXT: "//Text",
};

const SELECTORS_MACOS = {
  ADD_MESSAGE_REACTION: "~add-message-reaction",
  TEXT: "//Text",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ReactionPicker extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.ADD_MESSAGE_REACTION);
  }

  get reaction100() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[3];
  }

  get reactionCry() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[6];
  }

  get reactionHeart() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[0];
  }

  get reactionHeartEyes() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[2];
  }

  get reactionLaugh() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[1];
  }

  get reactionLike() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[4];
  }

  get reactionOpenMouth() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[5];
  }

  get reactionRage() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[7];
  }

  get reactionSunglasses() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[9];
  }

  get reactionThinking() {
    return this.instance
      .$(SELECTORS.ADD_MESSAGE_REACTION)
      .$$(SELECTORS.TEXT)[8];
  }
}
