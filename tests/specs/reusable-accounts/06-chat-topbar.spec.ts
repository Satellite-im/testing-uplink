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
    await chatsTopbarFirstUser.hoverOnFavoritesButton();
    await chatsTopbarFirstUser.topbarAddToFavoritesTooltip.waitForExist();
    const favoritesAddTooltipText =
      await chatsTopbarFirstUser.topbarAddToFavoritesTooltipText;
    await expect(favoritesAddTooltipText).toHaveTextContaining(
      "Add to Favorites"
    );

    // Validate Pinned Messages button tooltip
    await chatsTopbarFirstUser.hoverOnPinnedMessagesButton();
    await chatsTopbarFirstUser.topbarPinnedMessagesTooltip.waitForExist();
    const pinnedMessagesTooltipText =
      await chatsTopbarFirstUser.topbarPinnedMessagesTooltipText;
    await expect(pinnedMessagesTooltipText).toHaveTextContaining(
      "Pinned Messages"
    );

    // Validate Upload button tooltip
    await chatsInputFirstUser.hoverOnUploadButton();
    await chatsInputFirstUser.uploadTooltip.waitForExist();
    const uploadTooltipText = await chatsInputFirstUser.uploadTooltipText;
    await expect(uploadTooltipText).toHaveTextContaining("Upload");

    // Validate Send button tooltip
    await chatsInputFirstUser.hoverOnSendButton();
    await chatsInputFirstUser.sendMessageTooltip.waitForExist();
    const sendMessageTooltipText =
      await chatsInputFirstUser.sendMessageTooltipText;
    await expect(sendMessageTooltipText).toHaveTextContaining("Send");
  });

  it("Chat User A - Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnCallButton();
    await chatsTopbarFirstUser.topbarCallTooltip.waitForExist();
    const callTooltipText = await chatsTopbarFirstUser.topbarCallTooltipText;
    await expect(callTooltipText).toHaveTextContaining("Coming soon");

    // Validate Videocall button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnVideocallButton();
    await chatsTopbarFirstUser.topbarVideocallTooltip.waitForExist();
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

  it("Pinned Messages - Pin a message", async () => {
    // Look for the latest message sent by User A, open context menu and pin message
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionPin();

    // Ensure that message shows a pin indicator
    await chatsMessageGroupsFirstUser.validateLastMessageSentHasPinIndicator();
  });

  it("Pinned Messages - Pinned message shows timestamp, sender and message", async () => {
    // Go to Pinned Messages and validate container shows message
    await chatsTopbarFirstUser.clickOnPinnedMessages();
    await pinnedMessagesFirstUser.validatePinnedMessagesIsDisplayed();

    // Close pinned messages
    await chatsTopbarFirstUser.clickOnPinnedMessages();
  });

  xit("Pinned Messages - User can be redirected to the message when clicking on Go to message", async () => {});
  xit("Pinned Messages - Add a message with attachments to Pinned Messages", async () => {});
  xit("Pinned Messages - Remove a pinned message", async () => {});
}
