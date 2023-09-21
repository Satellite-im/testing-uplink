import "module-alias/register";
import InputBar from "@screenobjects/chats/InputBar";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);

export default async function chatTooltipsTests() {
  it("Chat User A - Validate Chat Screen tooltips are displayed", async () => {
    // Validate Favorites button tooltip
    await chatsTopbarFirstUser.hoverOnFavoritesButton();
    const favoritesAddTooltip =
      await chatsTopbarFirstUser.topbarAddToFavoritesTooltip;
    const favoritesAddTooltipText =
      await chatsTopbarFirstUser.topbarAddToFavoritesTooltipText;

    await favoritesAddTooltip.waitForExist();
    await expect(favoritesAddTooltipText).toHaveTextContaining(
      "Add to Favorites"
    );

    // Validate Pinned Messages button tooltip
    await chatsTopbarFirstUser.hoverOnPinnedMessagesButton();
    const pinnedMessagesTooltip =
      await chatsTopbarFirstUser.topbarPinnedMessagesTooltip;
    const pinnedMessagesTooltipText =
      await chatsTopbarFirstUser.topbarPinnedMessagesTooltipText;
    await pinnedMessagesTooltip.waitForExist();
    await expect(pinnedMessagesTooltipText).toHaveTextContaining(
      "Pinned Messages"
    );

    // Validate Upload button tooltip
    await chatsInputFirstUser.hoverOnUploadButton();
    const uploadTooltip = await chatsInputFirstUser.uploadTooltip;
    const uploadTooltipText = await chatsInputFirstUser.uploadTooltipText;
    await uploadTooltip.waitForExist();
    await expect(uploadTooltipText).toHaveTextContaining("Upload");

    // Validate Send button tooltip
    await chatsInputFirstUser.hoverOnSendButton();
    const sendMessageTooltip = await chatsInputFirstUser.sendMessageTooltip;
    const sendMessageTooltipText =
      await chatsInputFirstUser.sendMessageTooltipText;
    await sendMessageTooltip.waitForExist();
    await expect(sendMessageTooltipText).toHaveTextContaining("Send");
  });

  it("Chat User A - Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnCallButton();
    const callTooltip = await chatsTopbarFirstUser.topbarCallTooltip;
    const callTooltipText = await chatsTopbarFirstUser.topbarCallTooltipText;
    await callTooltip.waitForExist();
    await expect(callTooltipText).toHaveTextContaining("Coming soon");

    // Validate Videocall button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnVideocallButton();
    const videoCallTooltip = await chatsTopbarFirstUser.topbarVideocallTooltip;
    const videoCallTooltipText =
      await chatsTopbarFirstUser.topbarVideocallTooltipText;
    await videoCallTooltip.waitForExist();
    await expect(videoCallTooltipText).toHaveTextContaining("Coming soon");
  });
}
