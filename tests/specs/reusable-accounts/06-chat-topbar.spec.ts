require("module-alias/register");
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import PinnedMessages from "@screenobjects/chats/PinnedMessages";
import Topbar from "@screenobjects/chats/Topbar";
import {
  activateFirstApplication,
  closeFirstApplication,
  launchFirstApplication,
} from "@helpers/commands";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";

export default async function chatTopbarTests() {
  before(async () => {
    await launchFirstApplication();
    await CreatePinScreen.loginWithTestUser();
  });

  it("Chat User A - Validate Chat Screen tooltips are displayed", async () => {
    // Validate Favorites button tooltip
    await activateFirstApplication();
    await Topbar.hoverOnFavoritesButton();
    const favoritesAddTooltipText =
      await Topbar.topbarAddToFavoritesTooltipText;
    await expect(favoritesAddTooltipText).toHaveText("Add to Favorites");

    // Validate Pinned Messages button tooltip
    await Topbar.hoverOnPinnedMessagesButton();
    const pinnedMessagesTooltipText =
      await Topbar.topbarPinnedMessagesTooltipText;
    await expect(pinnedMessagesTooltipText).toHaveText("Pinned Messages");

    // Validate Upload button tooltip
    await InputBar.hoverOnUploadButton();
    const uploadTooltipText = await InputBar.uploadTooltipText;
    await expect(uploadTooltipText).toHaveText("Upload");

    // Validate Send button tooltip
    await InputBar.hoverOnSendButton();
    const sendMessageTooltipText = await InputBar.sendMessageTooltipText;
    await expect(sendMessageTooltipText).toHaveText("Send");
  });

  it("Chat User A - Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await Topbar.hoverOnCallButton();
    const callTooltipText = await Topbar.topbarCallTooltipText;
    await expect(callTooltipText).toHaveText("Coming soon");

    // Validate Videocall button tooltip contains "Coming soon"
    await Topbar.hoverOnVideocallButton();
    const videoCallTooltipText = await Topbar.topbarVideocallTooltipText;
    await expect(videoCallTooltipText).toHaveText("Coming soon");
  });

  it("Pinned Messages - Container is empty when no pinned messages have been added", async () => {
    // Go to Pinned Messages and validate container is empty
    await Topbar.clickOnPinnedMessages();
    await PinnedMessages.validatePinnedMessagesIsDisplayed();
    await PinnedMessages.validateEmptyPinnedMessagesIsDisplayed();

    // Exit from Pinned Messages
    await Topbar.clickOnTopbar();
  });

  it("Pinned Messages - Pin a message with attachments", async () => {
    // Look for the latest message received by User A, open context menu and pin message
    await MessageLocal.openContextMenuOnSentMessage("Attached2");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionPin();

    // Ensure that message shows a pin indicator
    await MessageGroupLocal.validateLastMessageSentHasPinIndicator();
  });

  it("Pinned Messages - Pinned message shows timestamp, sender and message", async () => {
    // Go to Pinned Messages and validate container shows message
    await Topbar.clickOnPinnedMessages();
    await PinnedMessages.validatePinnedMessagesIsDisplayed();

    // Validate pinned message shows timestamp, sender and message
    await PinnedMessages.validateFirstPinnedMessageImageProfileIsShown();
    await PinnedMessages.validateFirstPinnedMessageTimestampIsShown();
    await PinnedMessages.validateFirstPinnedMessageSender("ChatUserA");
    await PinnedMessages.validateFirstPinnedMessageText("Attached2");
  });

  it("Pinned Messages - Pinned message with attachment shows icon, extension, filename and metadata", async () => {
    // Validate attachment elements are shown in pinned message
    await PinnedMessages.validateFirstPinnedMessageAttachmentFileIcon();
    await PinnedMessages.validateFirstPinnedMessageAttachmentFileIconExtension(
      "txt",
    );
    await PinnedMessages.validateFirstPinnedMessageAttachmentFileMeta("47 B");
    await PinnedMessages.validateFirstPinnedMessageAttachmentFileName(
      "testfile.txt",
    );
  });

  it("Pinned Messages - User can be redirected to the message when clicking on Go to message", async () => {
    // Click on Go to Message
    await PinnedMessages.clickOnGoToMessage(0);

    // Open pinned messages
    await Topbar.clickOnPinnedMessages();
  });

  it("Pinned Messages - Remove a pinned message", async () => {
    // Click on Unpin button to remove message from pinned messages
    await PinnedMessages.clickOnUnpinMessage(0);

    // Validate that no posts are pinned
    await PinnedMessages.validateEmptyPinnedMessagesIsDisplayed();

    // Close pinned messages
    await Topbar.clickOnTopbar();
  });

  after(async () => {
    await closeFirstApplication();
  });
}
