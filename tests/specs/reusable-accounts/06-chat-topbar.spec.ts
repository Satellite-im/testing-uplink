import "module-alias/register";
import InputBar from "@screenobjects/chats/InputBar";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import Messages from "@screenobjects/chats/Messages";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import PinnedMessages from "@screenobjects/chats/PinnedMessages";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsContextMenuFirstUser = new ContextMenu(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let pinnedMessagesFirstUser = new PinnedMessages(USER_A_INSTANCE);

export default async function chatTopbarTests() {
  it("Chat User A - Validate Chat Screen tooltips are displayed", async () => {
    // Validate Favorites button tooltip
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.hoverOnFavoritesButton();
    const favoritesAddTooltipText =
      await chatsTopbarFirstUser.topbarAddToFavoritesTooltipText;
    await expect(favoritesAddTooltipText).toHaveTextContaining(
      "Add to Favorites"
    );

    // Validate Pinned Messages button tooltip
    await chatsTopbarFirstUser.hoverOnPinnedMessagesButton();
    const pinnedMessagesTooltipText =
      await chatsTopbarFirstUser.topbarPinnedMessagesTooltipText;
    await expect(pinnedMessagesTooltipText).toHaveTextContaining(
      "Pinned Messages"
    );

    // Validate Upload button tooltip
    await chatsInputFirstUser.hoverOnUploadButton();
    const uploadTooltipText = await chatsInputFirstUser.uploadTooltipText;
    await expect(uploadTooltipText).toHaveTextContaining("Upload");

    // Validate Send button tooltip
    await chatsInputFirstUser.hoverOnSendButton();
    const sendMessageTooltipText =
      await chatsInputFirstUser.sendMessageTooltipText;
    await expect(sendMessageTooltipText).toHaveTextContaining("Send");
  });

  it("Chat User A - Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnCallButton();
    const callTooltipText = await chatsTopbarFirstUser.topbarCallTooltipText;
    await expect(callTooltipText).toHaveTextContaining("Coming soon");

    // Validate Videocall button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnVideocallButton();
    const videoCallTooltipText =
      await chatsTopbarFirstUser.topbarVideocallTooltipText;
    await expect(videoCallTooltipText).toHaveTextContaining("Coming soon");
  });

  it("Pinned Messages - Container is empty when no pinned messages have been added", async () => {
    // Go to Pinned Messages and validate container is empty
    await chatsTopbarFirstUser.clickOnPinnedMessages();
    await pinnedMessagesFirstUser.validatePinnedMessagesIsDisplayed();
    await pinnedMessagesFirstUser.validateEmptyPinnedMessagesIsDisplayed();

    // Exit from Pinned Messages
    await chatsTopbarFirstUser.clickOnPinnedMessages();
  });

  it("Pinned Messages - Pin a message with attachments", async () => {
    // Look for the latest message received by User A, open context menu and pin message
    await chatsMessagesFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionPin();

    // Ensure that message shows a pin indicator
    await chatsMessageGroupsFirstUser.validateLastMessageReceivedHasPinIndicator();
  });

  it("Pinned Messages - Pinned message shows timestamp, sender and message", async () => {
    // Go to Pinned Messages and validate container shows message
    await chatsTopbarFirstUser.clickOnPinnedMessages();
    await pinnedMessagesFirstUser.validatePinnedMessagesIsDisplayed();

    // Validate pinned message shows timestamp, sender and message
    await pinnedMessagesFirstUser.validateFirstPinnedMessageImageProfileIsShown();
    await pinnedMessagesFirstUser.validateFirstPinnedMessageTimestampIsShown();
    await pinnedMessagesFirstUser.validateFirstPinnedMessageSender("ChatUserB");
    await pinnedMessagesFirstUser.validateFirstPinnedMessageText("Reply");
  });

  it("Pinned Messages - Pinned message with attachment shows icon, extension, filename and metadata", async () => {
    // Validate attachment elements are shown in pinned message
    await pinnedMessagesFirstUser.validateFirstPinnedMessageAttachmentFileIcon();
    await pinnedMessagesFirstUser.validateFirstPinnedMessageAttachmentFileIconExtension(
      "txt"
    );
    await pinnedMessagesFirstUser.validateFirstPinnedMessageAttachmentFileMeta(
      "47 B"
    );
    await pinnedMessagesFirstUser.validateFirstPinnedMessageAttachmentFileName(
      "testfile.txt"
    );
  });

  it("Pinned Messages - User can be redirected to the message when clicking on Go to message", async () => {
    // Click on Go to Message
    await pinnedMessagesFirstUser.clickOnGoToMessage(0);

    // Open pinned messages
    await chatsTopbarFirstUser.clickOnPinnedMessages();
  });

  it("Pinned Messages - Remove a pinned message", async () => {
    // Click on Unpin button to remove message from pinned messages
    await pinnedMessagesFirstUser.clickOnUnpinMessage(0);

    // Validate that no posts are pinned
    await pinnedMessagesFirstUser.validateEmptyPinnedMessagesIsDisplayed();

    // Close pinned messages
    await chatsTopbarFirstUser.clickOnPinnedMessages();
  });
}
