import "module-alias/register";
import InputBar from "@screenobjects/chats/InputBar";
import PinnedMessages from "@screenobjects/chats/PinnedMessages";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let pinnedMessagesFirstUser = new PinnedMessages(USER_A_INSTANCE);

export default async function chatTooltipsTests() {
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
    await chatsTopbarFirstUser.goToPinnedMessages();
    await pinnedMessagesFirstUser.validatePinnedMessagesIsDisplayed();
    await pinnedMessagesFirstUser.validateEmptyPinnedMessagesIsDisplayed();
  });

  it("Pinned Messages - Pin a message", async () => {});
  it("Pinned Messages - Pinned message shows timestamp, sender and message", async () => {});
  it("Pinned Messages - User can be redirected to the message when clicking on Go to message", async () => {});
  it("Pinned Messages - Add a message with attachments to Pinned Messages", async () => {});
  it("Pinned Messages - Remove a pinned message", async () => {});
}
