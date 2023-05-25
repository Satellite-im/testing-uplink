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
let chatsAttachmentFirstUser = new ComposeAttachment("userA");
let chatsContextMenuFirstUser = new ContextMenu("userA");
let chatsInputFirstUser = new InputBar("userA");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsMessageGroupsFirstUser = new MessageGroup("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

export default async function sendRequest() {
  it("Load Chat User A account and go to friends screen", async () => {
    // Go to Friends Screen
    await loginWithTestUser();
    await welcomeScreenFirstUser.goToFriends();

    // Go to Friends
    await friendsScreenFirstUser.waitForIsShown(true);
  });

  it("Send friend request to Chat User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB");
    await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  });

  it("Ensure that friend request sent was accepted", async () => {
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();
  });

  it("Go to chat with friend and wait until user is online", async () => {
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsTopbarFirstUser.validateTopbarExists();

    // Wait until Chat User B is online
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();
  });

  it("Chats - Validate Messages secured text displayed on top of conversation", async () => {
    await chatsLayoutFirstUser.encryptedMessagesText.waitForDisplayed();
    await expect(
      chatsLayoutFirstUser.encryptedMessagesText
    ).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network."
    );
  });

  it("Chats - Send a message to the other user", async () => {
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await chatsInputFirstUser.clickOnSendMessage();

    const textFromMessage =
      await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("Testing...");
  });

  it("Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(messageText).toHaveTextContaining("Testing...");
  });

  it("Validate Chat Message Group displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chats - Topbar information", async () => {
    // Validate user image, username and online indicator are displayed on Chat Topbar
    await expect(chatsTopbarFirstUser.topbarUserImage).toBeDisplayed();
    await expect(chatsTopbarFirstUser.topbarUserName).toHaveTextContaining(
      "ChatUserB"
    );
    await expect(chatsTopbarFirstUser.topbarIndicatorOnline).toBeDisplayed();
  });

  it("Chats - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await chatsTopbarFirstUser.addToFavorites();
    await chatsTopbarFirstUser.favorites.waitForExist();

    // Favorites Sidebar should be displayed
    await expect(chatsTopbarFirstUser.favoritesUserImage).toBeDisplayed();
    await expect(
      chatsTopbarFirstUser.favoritesUserIndicatorOnline
    ).toBeDisplayed();
    await expect(chatsTopbarFirstUser.favoritesUserName).toHaveTextContaining(
      "CHATUSERB"
    );
  });

  it("Chats - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await chatsTopbarFirstUser.removeFromFavorites();
    await chatsTopbarFirstUser.favorites.waitForExist({ reverse: true });
  });

  it("Receive Reply - Validate reply message is received from remote user", async () => {
    // Wait until reply is received
    await chatsMessagesFirstUser.chatMessageReply.waitForDisplayed({
      timeout: 180000,
    });
  });

  it("Receive Reply - Validate reply message contents", async () => {
    // Validate message replied appears smaller above your reply
    const replyReceived = await chatsMessagesFirstUser.getLastReply();
    const replyReceivedText = await chatsMessagesFirstUser.getLastReplyText();
    await expect(replyReceived).toBeDisplayed();
    await expect(replyReceivedText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const textFromMessage =
      await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Myreply...");
  });

  it("Receive Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Receive Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapReceivedImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsFirstUser.getLastGroupWrapReceivedOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Send two more messages to Chat User B", async () => {
    // Send two messages to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Two...");
    await chatsInputFirstUser.clickOnSendMessage();

    await chatsInputFirstUser.typeMessageOnInput("Three...");
    await chatsInputFirstUser.clickOnSendMessage();
  });

  it("Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "Two..."
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Two...");
  });

  it("Context Menu - Edit Message", async () => {
    // Open context menu on last message sent, select option for editing and type a new message
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionEdit();
    await chatsInputFirstUser.typeOnEditMessageInput("edited...");

    // Validate message edited contents is shown on Chat Screen
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("edited...");
  });

  it("Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.clickOnInputBar();
    await chatsInputFirstUser.clickOnSendMessage();

    // Ensure that input bar is empty and press Enter Key
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.clickOnInputBar();
    await chatsInputFirstUser.pressEnterKeyOnInputBar();

    // Validate latest message sent displayed on Chat Conversation is still "edited..."
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("edited...");
  });

  // Skipping test failing on CI due to slowness on driver typing 1024 characters
  xit("Message Input - User can type up to 1024 chars on input bar", async () => {
    // Generate a random text with 1024 chars
    const longText = await chatsInputFirstUser.generateRandomText();
    // Type long text with 1024 chars on input bar and attempt to add 4 more chars (efgh)
    await chatsInputFirstUser.typeMessageOnInput(longText + "efgh");

    // Ensure that latest chars were not added to input bar, since the max number of chars has been reached
    // Input bar text should be equal to long text with 1024 chars
    await expect(chatsInputFirstUser.inputText).toHaveText(longText);

    // Clear input bar to finish test
    await chatsInputFirstUser.clearInputBar();
  });

  it("Chats - Validate compose attachments contents", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFile("./tests/fixtures/logo.jpg");

    // Get the full path of file selected
    const expectedPath = await chatsInputFirstUser.getFilePath(
      "./tests/fixtures/logo.jpg"
    );

    // Validate contents on Compose Attachments are displayed
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileEmbed
    ).toBeDisplayed();
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileIcon
    ).toBeDisplayed();
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileInfo
    ).toBeDisplayed();

    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileNameText
    ).toHaveTextContaining(expectedPath);
  });

  it("Chats - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsAttachmentFirstUser.deleteFileOnComposeAttachment();

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentFirstUser.composeAttachmentsFileEmbed.waitForExist({
      reverse: true,
    });
  });

  it("Chats - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFile("./tests/fixtures/logo.jpg");

    // Validate contents on Compose Attachments are displayed
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileEmbed
    ).toBeDisplayed();

    // Type a text message and send it
    await chatsInputFirstUser.typeMessageOnInput("Attached...");
    await chatsInputFirstUser.clickOnSendMessage();
  });

  it("Chats - Message Sent With Attachment - Text contents", async () => {
    // Validate text from message containing attachment
    await chatsMessagesFirstUser.chatMessageFileEmbedLocal.waitForExist();
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached...");
  });

  it("Chats - Message Sent With Attachment - File Meta Data", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await chatsMessagesFirstUser.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chats - Message Sent With Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await chatsMessagesFirstUser.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chats - Message Sent With Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await chatsMessagesFirstUser.getLastMessageSentFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chats - Message Sent With Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesFirstUser.getLastMessageSentDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });

  it("Validate Chat Screen tooltips are displayed", async () => {
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

  it("Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
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
