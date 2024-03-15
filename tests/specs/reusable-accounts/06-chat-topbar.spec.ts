require("module-alias/register");
import InputBar from "@screenobjects/chats/InputBar";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import PinnedMessages from "@screenobjects/chats/PinnedMessages";
import Topbar from "@screenobjects/chats/Topbar";
import {
  activateFirstApplication,
  grabCacheFolder,
  resetAndLoginWithCache,
} from "@helpers/commands";
const chatsContextMenu = new ContextMenu();
const chatsInput = new InputBar();
const chatsTopbar = new Topbar();
const messageLocal = new MessageLocal();
const messageGroupLocal = new MessageGroupLocal();
const pinnedMessages = new PinnedMessages();

describe("Chats Topbar - Tests", function () {
  before(async () => {
    await resetAndLoginWithCache("ChatUserA");
  });

  it("Chat User A - Validate Chat Screen tooltips are displayed", async () => {
    // Validate Favorites button tooltip
    await activateFirstApplication();
    await chatsTopbar.hoverOnFavoritesButton();
    const favoritesAddTooltipText =
      await chatsTopbar.topbarAddToFavoritesTooltipText;
    await expect(favoritesAddTooltipText).toHaveText("Add to Favorites");

    // Validate Pinned Messages button tooltip
    await chatsTopbar.hoverOnPinnedMessagesButton();
    const pinnedMessagesTooltipText =
      await chatsTopbar.topbarPinnedMessagesTooltipText;
    await expect(pinnedMessagesTooltipText).toHaveText("Pinned Messages");

    // Validate Upload button tooltip
    await chatsInput.hoverOnUploadButton();
    const uploadTooltipText = await chatsInput.uploadTooltipText;
    await expect(uploadTooltipText).toHaveText("Upload");

    // Validate Send button tooltip
    await chatsInput.hoverOnSendButton();
    const sendMessageTooltipText = await chatsInput.sendMessageTooltipText;
    await expect(sendMessageTooltipText).toHaveText("Send");
  });

  it("Chat User A - Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await chatsTopbar.hoverOnCallButton();
    const callTooltipText = await chatsTopbar.topbarCallTooltipText;
    await expect(callTooltipText).toHaveText("Coming soon");

    // Validate Videocall button tooltip contains "Coming soon"
    await chatsTopbar.hoverOnVideocallButton();
    const videoCallTooltipText = await chatsTopbar.topbarVideocallTooltipText;
    await expect(videoCallTooltipText).toHaveText("Coming soon");
  });

  it("Pinned Messages - Container is empty when no pinned messages have been added", async () => {
    // Go to Pinned Messages and validate container is empty
    await chatsTopbar.clickOnPinnedMessages();
    await pinnedMessages.validatePinnedMessagesIsDisplayed();
    await pinnedMessages.validateEmptyPinnedMessagesIsDisplayed();

    // Exit from Pinned Messages
    await chatsTopbar.clickOnTopbar();
  });

  it("Pinned Messages - Pin a message with attachments", async () => {
    // Look for the latest message received by User A, open context menu and pin message
    await messageLocal.openContextMenuOnSentMessage("Attached2");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.selectContextOptionPin();

    // Ensure that message shows a pin indicator
    await messageGroupLocal.validateLastMessageSentHasPinIndicator();
  });

  it("Pinned Messages - Pinned message shows timestamp, sender and message", async () => {
    // Go to Pinned Messages and validate container shows message
    await chatsTopbar.clickOnPinnedMessages();
    await pinnedMessages.validatePinnedMessagesIsDisplayed();

    // Validate pinned message shows timestamp, sender and message
    await pinnedMessages.validateFirstPinnedMessageImageProfileIsShown();
    await pinnedMessages.validateFirstPinnedMessageTimestampIsShown();
    await pinnedMessages.validateFirstPinnedMessageSender("ChatUserA");
    await pinnedMessages.validateFirstPinnedMessageText("Attached2");
  });

  it("Pinned Messages - Pinned message with attachment shows icon, extension, filename and metadata", async () => {
    // Validate attachment elements are shown in pinned message
    await pinnedMessages.validateFirstPinnedMessageAttachmentFileIcon();
    await pinnedMessages.validateFirstPinnedMessageAttachmentFileIconExtension(
      "txt",
    );
    await pinnedMessages.validateFirstPinnedMessageAttachmentFileMeta("47 B");
    await pinnedMessages.validateFirstPinnedMessageAttachmentFileName(
      "testfile.txt",
    );
  });

  it("Pinned Messages - User can be redirected to the message when clicking on Go to message", async () => {
    // Click on Go to Message
    await pinnedMessages.clickOnGoToMessage(0);

    // Open pinned messages
    await chatsTopbar.clickOnPinnedMessages();
  });

  it("Pinned Messages - Remove a pinned message", async () => {
    // Click on Unpin button to remove message from pinned messages
    await pinnedMessages.clickOnUnpinMessage(0);

    // Validate that no posts are pinned
    await pinnedMessages.validateEmptyPinnedMessagesIsDisplayed();

    // Close pinned messages
    await chatsTopbar.clickOnTopbar();
  });

  after(async () => {
    await grabCacheFolder("ChatUserA");
  });
});
