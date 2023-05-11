import { launchAppForChatUserA } from "../../helpers/commands";
import InputBar from "../../screenobjects/chats/InputBar";
import Topbar from "../../screenobjects/chats/Topbar";

export default async function chatTooltipsTests() {
  it("Chat User A - Validate Chat Screen tooltips are displayed", async () => {
    await launchAppForChatUserA();
    // Validate Favorites button tooltip
    await Topbar.hoverOnFavoritesButton();
    await Topbar.topbarAddToFavoritesTooltip.waitForDisplayed();
    await expect(Topbar.topbarAddToFavoritesTooltipText).toHaveTextContaining(
      "Add to Favorites"
    );

    // Validate Upload button tooltip
    await InputBar.hoverOnUploadButton();
    await InputBar.uploadTooltip.waitForDisplayed();
    await expect(InputBar.uploadTooltipText).toHaveTextContaining("Upload");

    // Validate Send button tooltip
    await InputBar.hoverOnSendButton();
    await InputBar.sendMessageTooltip.waitForDisplayed();
    await expect(InputBar.sendMessageTooltipText).toHaveTextContaining("Send");
  });

  it("Chat User A - Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await Topbar.hoverOnCallButton();
    await Topbar.topbarCallTooltip.waitForDisplayed();
    await expect(Topbar.topbarCallTooltipText).toHaveTextContaining(
      "Coming soon"
    );

    // Validate Videocall button tooltip contains "Coming soon"
    await Topbar.hoverOnVideocallButton();
    await Topbar.topbarVideocallTooltip.waitForDisplayed();
    await expect(Topbar.topbarVideocallTooltipText).toHaveTextContaining(
      "Coming soon"
    );
  });
}
