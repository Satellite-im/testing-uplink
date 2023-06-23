import InputBar from "../../screenobjects/chats/InputBar";
import Topbar from "../../screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "../../helpers/constants";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);

export default async function chatTooltipsTests() {
  it("Chat User A - Validate Chat Screen tooltips are displayed", async () => {
    // Validate Favorites button tooltip
    await chatsTopbarFirstUser.hoverOnFavoritesButton();
    await chatsTopbarFirstUser.topbarAddToFavoritesTooltip.waitForDisplayed();
    await expect(
      chatsTopbarFirstUser.topbarAddToFavoritesTooltipText
    ).toHaveTextContaining("Add to Favorites");

    // Validate Upload button tooltip
    await chatsInputFirstUser.hoverOnUploadButton();
    await chatsInputFirstUser.uploadTooltip.waitForDisplayed();
    await expect(chatsInputFirstUser.uploadTooltipText).toHaveTextContaining(
      "Upload"
    );

    // Validate Send button tooltip
    await chatsInputFirstUser.hoverOnSendButton();
    await chatsInputFirstUser.sendMessageTooltip.waitForDisplayed();
    await expect(
      chatsInputFirstUser.sendMessageTooltipText
    ).toHaveTextContaining("Send");
  });

  it("Chat User A - Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnCallButton();
    await chatsTopbarFirstUser.topbarCallTooltip.waitForDisplayed();
    await expect(
      chatsTopbarFirstUser.topbarCallTooltipText
    ).toHaveTextContaining("Coming soon");

    // Validate Videocall button tooltip contains "Coming soon"
    await chatsTopbarFirstUser.hoverOnVideocallButton();
    await chatsTopbarFirstUser.topbarVideocallTooltip.waitForDisplayed();
    await expect(
      chatsTopbarFirstUser.topbarVideocallTooltipText
    ).toHaveTextContaining("Coming soon");
  });
}
