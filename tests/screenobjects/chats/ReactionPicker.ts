import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  ADD_MESSAGE_REACTION: '[name="add-message-reaction"]',
  REACTION_100: '[name="💯"]',
  REACTION_CRY: '[name="😢"]',
  REACTION_HEART: '[name="❤️"]',
  REACTION_HEART_EYES: '[name="😍"]',
  REACTION_LAUGH: '[name="😂"]',
  REACTION_LIKE: '[name="👍"]',
  REACTION_OPEN_MOUTH: '[name="😮"]',
  REACTION_RAGE: '[name="😡"]',
  REACTION_SUNGLASSES: '[name="😎"]',
  REACTION_THINKING: '[name="🤔"]',
};

const SELECTORS_MACOS = {
  ADD_MESSAGE_REACTION: "~add-message-reaction",
  REACTION_100: "~💯",
  REACTION_CRY: "~😢",
  REACTION_HEART: "~❤️",
  REACTION_HEART_EYES: "~😍",
  REACTION_LAUGH: "~😂",
  REACTION_LIKE: "~👍",
  REACTION_OPEN_MOUTH: "~😮",
  REACTION_RAGE: "~😡",
  REACTION_SUNGLASSES: "~😎",
  REACTION_THINKING: "~🤔",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ReactionPicker extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.ADD_MESSAGE_REACTION);
  }

  get reaction100 {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_100)
  }

  get reactionCry {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_CRY)
  }

  get reactionHeart {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_HEART)
  }

  get reactionHeartEyes {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_HEART_EYES)
  }

  get reactionLaugh {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_LAUGH)
  }

  get reactionLike {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_LIKE)
  }

  get reactionOpenMouth {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_OPEN_MOUTH)
  }

  get reactionRage {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_RAGE)
  }

  get reactionSunglasses {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_SUNGLASSES)
  }

  get reactionThinking {
    return this.instance.$(SELECTORS.ADD_MESSAGE_REACTION).$(SELECTORS.REACTION_THINKING)
  }
}
