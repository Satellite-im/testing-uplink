import { getUserKey, loginWithTestUser } from "../../../helpers/commands";
import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import ComposeAttachment from "../../../screenobjects/chats/ComposeAttachment";
import ContextMenu from "../../../screenobjects/chats/ContextMenu";
import InputBar from "../../../screenobjects/chats/InputBar";
import Messages from "../../../screenobjects/chats/Messages";
import MessageGroup from "../../../screenobjects/chats/MessageGroup";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";

export default async function sendRequest() {
  it("Load Chat User A account and go to friends screen", async () => {
    // Go to Friends Screen
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();

    // Go to Friends
    await FriendsScreen.waitForIsShown(true);
  });

  it("Send friend request to Chat User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB");
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Ensure that friend request sent was accepted", async () => {
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();
  });

  it("Go to chat with friend and wait until user is online", async () => {
    await FriendsScreen.chatWithFriendButton.click();
    await Topbar.validateTopbarExists();

    // Wait until Chat User B is online
    await Topbar.waitUntilRemoteUserIsOnline();
  });

  it("Chats - Validate Messages secured text displayed on top of conversation", async () => {
    await ChatsLayout.encryptedMessagesText.waitForDisplayed();
    await expect(ChatsLayout.encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network."
    );
  });

  it("Chats - Send a message to the other user", async () => {
    await InputBar.typeMessageOnInput("Testing...");
    await InputBar.clickOnSendMessage();

    const textFromMessage = await Messages.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("Testing...");
  });

  it("Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroup.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText = await Messages.getLastMessageSentText();
    await expect(messageText).toHaveTextContaining("Testing...");
  });

  it("Validate Chat Message Group displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroup.getLastGroupWrapSentImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await MessageGroup.getLastGroupWrapSentOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chats - Topbar information", async () => {
    // Validate user image, username and online indicator are displayed on Chat Topbar
    await expect(Topbar.topbarUserImage).toBeDisplayed();
    await expect(Topbar.topbarUserName).toHaveTextContaining("ChatUserB");
    await expect(Topbar.topbarIndicatorOnline).toBeDisplayed();
  });

  it("Chats - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await Topbar.addToFavorites();
    await Topbar.favorites.waitForExist();

    // Favorites Sidebar should be displayed
    await expect(Topbar.favoritesUserImage).toBeDisplayed();
    await expect(Topbar.favoritesUserIndicatorOnline).toBeDisplayed();
    await expect(Topbar.favoritesUserName).toHaveTextContaining("CHATUSERB");
  });

  it("Chats - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await Topbar.removeFromFavorites();
    await Topbar.favorites.waitForExist({ reverse: true });
  });

  it("Receive Reply - Validate reply message is received from remote user", async () => {
    // Wait until reply is received
    await Messages.chatMessageReply.waitForDisplayed({ timeout: 180000 });
  });

  it("Receive Reply - Validate reply message contents", async () => {
    // Validate message replied appears smaller above your reply
    const replyReceived = await Messages.getLastReply();
    const replyReceivedText = await Messages.getLastReplyText();
    await expect(replyReceived).toBeDisplayed();
    await expect(replyReceivedText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const textFromMessage = await Messages.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Myreply...");
  });

  it("Receive Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroup.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Receive Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroup.getLastGroupWrapReceivedImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await MessageGroup.getLastGroupWrapReceivedOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Send two more messages to Chat User B", async () => {
    // Send two messages to Chat User B
    await InputBar.typeMessageOnInput("Two...");
    await InputBar.clickOnSendMessage();

    await InputBar.typeMessageOnInput("Three...");
    await InputBar.clickOnSendMessage();
  });

  it("Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await Messages.openContextMenuOnLastSent();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "Two..."
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Two...");
  });

  it("Context Menu - Edit Message", async () => {
    // Open context menu on last message sent, select option for editing and type a new message
    await Messages.openContextMenuOnLastSent();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionEdit();
    await InputBar.typeOnEditMessageInput("edited...");

    // Validate message edited contents is shown on Chat Screen
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("edited...");
  });

  it("Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await InputBar.clearInputBar();
    await InputBar.clearInputBar();
    await InputBar.clickOnInputBar();
    await InputBar.clickOnSendMessage();

    // Ensure that input bar is empty and press Enter Key
    await InputBar.clearInputBar();
    await InputBar.clickOnInputBar();
    await InputBar.pressEnterKeyOnInputBar();

    // Validate latest message sent displayed on Chat Conversation is still "edited..."
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("edited...");
  });

  // Skipping test failing on CI due to slowness on driver typing 1024 characters
  xit("Message Input - User can type up to 1024 chars on input bar", async () => {
    // Generate a random text with 1024 chars
    const longText = await InputBar.generateRandomText();
    // Type long text with 1024 chars on input bar and attempt to add 4 more chars (efgh)
    await InputBar.typeMessageOnInput(longText + "efgh");

    // Ensure that latest chars were not added to input bar, since the max number of chars has been reached
    // Input bar text should be equal to long text with 1024 chars
    await expect(InputBar.inputText).toHaveText(longText);

    // Clear input bar to finish test
    await InputBar.clearInputBar();
  });

  it("Chats - Validate compose attachments contents", async () => {
    // Click on upload button and attach a file to compose attachment
    await InputBar.uploadFile("./tests/fixtures/logo.jpg");

    // Get the full path of file selected
    const expectedPath = await InputBar.getFilePath(
      "./tests/fixtures/logo.jpg"
    );

    // Validate contents on Compose Attachments are displayed
    await expect(ComposeAttachment.composeAttachmentsFileEmbed).toBeDisplayed();
    await expect(ComposeAttachment.composeAttachmentsFileIcon).toBeDisplayed();
    await expect(ComposeAttachment.composeAttachmentsFileInfo).toBeDisplayed();

    await expect(
      ComposeAttachment.composeAttachmentsFileNameText
    ).toHaveTextContaining(expectedPath);
  });

  it("Chats - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await ComposeAttachment.deleteFileOnComposeAttachment();

    // Validate contents on Compose Attachments are displayed
    await ComposeAttachment.composeAttachmentsFileEmbed.waitForExist({
      reverse: true,
    });
  });

  it("Chats - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await InputBar.uploadFile("./tests/fixtures/logo.jpg");

    // Validate contents on Compose Attachments are displayed
    await expect(ComposeAttachment.composeAttachmentsFileEmbed).toBeDisplayed();

    // Type a text message and send it
    await InputBar.typeMessageOnInput("Attached...");
    await InputBar.clickOnSendMessage();
  });

  it("Chats - Message Sent With Attachment - Text contents", async () => {
    // Validate text from message containing attachment
    await Messages.chatMessageFileEmbedLocal.waitForExist();
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached...");
  });

  it("Chats - Message Sent With Attachment - File Meta Data", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await Messages.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chats - Message Sent With Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await Messages.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chats - Message Sent With Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await Messages.getLastMessageSentFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chats - Message Sent With Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await Messages.getLastMessageSentDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });

  it("Validate Chat Screen tooltips are displayed", async () => {
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

  it("Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
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
