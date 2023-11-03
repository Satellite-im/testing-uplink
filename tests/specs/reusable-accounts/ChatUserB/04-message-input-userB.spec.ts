import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import Messages from "@screenobjects/chats/Messages";
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);

export default async function messageInputTestsUserB() {
  it("Chat Input Text - Validate messages with bold markdowns were received in expected format", async () => {
    // With Chat User B, validate message with with ** markdown was received in bolds
    await chatsMessagesFirstUser.waitForReceivingMessage("Bolds1");

    // With Chat User B, validate message with with __ markdown was received in bolds
    await chatsMessagesFirstUser.waitForReceivingMessage("Bolds2");
  });

  // Skipping test that is failing often on CI - Requires investigation to improve execution
  xit("Chat Input Text - Validate message with code markdown is received in expected format", async () => {
    // With Chat User B, validate code message was received and is displayed correctly
    await chatsMessagesFirstUser.waitForReceivingCodeMessage("JavaScript");
    const codeMessageTextReceived =
      await chatsMessagesFirstUser.getLastMessageReceivedCodeMessage();
    await expect(codeMessageTextReceived).toEqual("let a = 1;");
  });

  it("Chat Input Text - Validate messages with links were received correctly", async () => {
    // With Chat User B, validate message with URL starting with https:// was received as link
    await chatsMessagesFirstUser.waitForReceivingLink("https://www.google.com");

    // With Chat User B, validate message with URL starting with www. was received as link
    await chatsMessagesFirstUser.waitForReceivingLink("www.apple.com");

    // With Chat User B, validate message with URL starting with http:// was received as link
    await chatsMessagesFirstUser.waitForReceivingLink(
      "http://www.satellite.im",
    );
  });

  it("Chat User - Chat Messages containing links contents on remote side", async () => {
    // Validate link embed contents on chat message
    const linkEmbedReceived =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbed();
    const linkEmbedReceivedDetailsText =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbedDetailsText();
    const linkEmbedReceivedIcon =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbedIcon();
    const linkEmbedReceivedIconTitle =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbedIconTitle();

    await linkEmbedReceived.waitForExist();
    await expect(linkEmbedReceivedDetailsText).toHaveTextContaining(
      "P2P Chat, Voice &#38; Video Open-source, stored on IPFS. End to end encryption... trackers not included.",
    );
    await linkEmbedReceivedIcon.waitForExist();
    await linkEmbedReceivedIconTitle.waitForExist();
  });

  // Skipping test failing on because the typing indicator is gone before the test can validate it
  xit("Validate Typing Indicator is displayed if remote user is typing", async () => {
    // Switch to second user and validate that Typing Indicator is displayed
    await chatsLayoutFirstUser.typingIndicator.waitForExist({
      timeout: 30000,
    });
    await expect(
      chatsLayoutFirstUser.typingIndicatorTextValue,
    ).toHaveTextContaining("ChatUserA is typing");
  });
}
