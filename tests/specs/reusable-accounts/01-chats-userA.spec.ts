import { getUserKey, loginWithTestUser } from "../../helpers/commands";
import ChatScreen from "../../screenobjects/ChatScreen";
import FriendsScreen from "../../screenobjects/FriendsScreen";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";

describe("Two users at the same time - Chat User A", async () => {
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

    await expect(
      await FriendsScreen.toastNotificationText
    ).toHaveTextContaining("Friend Request Sent!");

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Ensure that friend request sent was accepted", async () => {
    await FriendsScreen.waitUntilUserAcceptedFriendRequest(280000);
  });

  it("Go to chat with friend and wait until user is online", async () => {
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    // Wait until Chat User B is online
    await (
      await ChatScreen.topbarIndicatorOnline
    ).waitForDisplayed({ timeout: 240000 });
  });

  it("Chats - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await ChatScreen.addToFavorites();
    await (await ChatScreen.favorites).waitForDisplayed();

    // Favorites Sidebar should be displayed
    await expect(await ChatScreen.favoritesUserImage).toBeDisplayed();
    await expect(await ChatScreen.favoritesUserIndicatorOnline).toBeDisplayed();
    await expect(await ChatScreen.favoritesUserName).toHaveTextContaining(
      "CHATUSERB"
    );
  });

  // Needs to be fixed before unskipping
  xit("Validate Chat Message Group displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chats - Topbar information", async () => {
    // Validate user image, username and online indicator are displayed on Chat Topbar
    await expect(await ChatScreen.topbarUserImage).toBeDisplayed();
    await expect(await ChatScreen.topbarUserName).toHaveTextContaining(
      "ChatUserB"
    );
    await expect(await ChatScreen.topbarIndicatorOnline).toBeDisplayed();
  });

  it("Chats - Validate Messages secured text displayed on top of conversation", async () => {
    await (await ChatScreen.encryptedMessagesText).waitForDisplayed();
    await expect(await ChatScreen.encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network."
    );
  });

  it("Chats - Send a message to the other user", async () => {
    await ChatScreen.typeMessageOnInput("testing...");
    await ChatScreen.clickOnSendMessage();

    const textFromMessage = await ChatScreen.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("testing...");
  });

  it("Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveText(
      /^ChatUserA - (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await ChatScreen.getLastMessageSentLocator();
    await expect(lastMessage).toBeDisplayed();
  });

  it("Chats - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await ChatScreen.removeFromFavorites();
    await (await ChatScreen.favorites).waitForExist({ reverse: true });

    await ChatScreen.hoverOnUsernameTopbar();
  });

  // Needs to be fixed on Chat User B before unskipping
  xit("Receive Reply - Validate reply message is received from remote user", async () => {
    // Wait until reply is received
    await (
      await ChatScreen.chatMessageReply
    ).waitForDisplayed({ timeout: 180000 });
  });

  // Needs to be fixed on Chat User B before unskipping
  xit("Receive Reply - Validate reply message contents", async () => {
    // Validate message replied appears smaller above your reply
    const replyReceived = await ChatScreen.getLastReplyReceived();
    const replyReceivedText = await ChatScreen.getLastReplyReceivedText();
    await expect(replyReceived).toBeDisplayed();
    await expect(replyReceivedText).toHaveTextContaining("testing...");

    // Validate reply message sent appears as last message
    const textFromMessage = await ChatScreen.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("this is a reply");
  });

  // Needs to be fixed on Chat User B before unskipping
  xit("Receive Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveText(
      /^ChatUserB - (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  // Needs to be fixed on Chat User B before unskipping
  xit("Receive Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Send two more messages to Chat User B", async () => {
    // Send two messages to Chat User B
    await ChatScreen.typeMessageOnInput("message two");
    await ChatScreen.clickOnSendMessage();

    await ChatScreen.typeMessageOnInput("message three");
    await ChatScreen.clickOnSendMessage();
  });

  it("Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option with index = 3 (delete)
    await ChatScreen.openContextMenuOnSentMessage();
    await ChatScreen.selectContextOption(3);

    // Validate that last message was deleted and therefore the last message displayed is "message two"
    const textFromMessage = await ChatScreen.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("message two");
  });

  it("Context Menu - Edit Message", async () => {
    // Open context menu on last message sent, select option with index = 2 (edit) and type a new message
    await ChatScreen.openContextMenuOnSentMessage();
    await ChatScreen.selectContextOption(2);
    await ChatScreen.typeOnEditMessageInput("edited...");

    // Validate message edited contents is shown on Chat Screen
    const textFromMessage = await ChatScreen.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("edited...");
  });

  it("Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await ChatScreen.clearInputBar();
    await ChatScreen.clearInputBar();
    await ChatScreen.clickOnInputBar();
    await ChatScreen.clickOnSendMessage();

    // Ensure that input bar is empty and press Enter Key
    await ChatScreen.clearInputBar();
    await ChatScreen.clickOnInputBar();
    await ChatScreen.pressEnterKeyOnInputBar();

    // Validate latest message sent displayed on Chat Conversation is still "edited..."
    const latestMessage = await ChatScreen.getLastMessageSentText();
    await expect(latestMessage).toHaveTextContaining("edited...");
  });

  // Skipping since typing of a lot characters is flakky on CI
  xit("Message Input - User can type up to 1024 chars on input bar", async () => {
    // Generate a random text with 1024 chars
    const longText = await ChatScreen.generateRandomText();
    // Type long text with 1024 chars on input bar and attempt to add 4 more chars (efgh)
    await ChatScreen.typeMessageOnInput(longText + "efgh");

    // Ensure that latest chars were not added to input bar, since the max number of chars has been reached
    // Input bar text should be equal to long text with 1024 chars
    await expect(ChatScreen.inputText).toHaveText(longText);

    // Clear input bar to finish test
    await ChatScreen.clearInputBar();
  });

  it("Chats - Validate compose attachments contents", async () => {
    // Click on upload button and attach a file to compose attachment
    await ChatScreen.uploadFile("./tests/fixtures/logo.jpg");

    // Get the full path of file selected
    const expectedPath = await ChatScreen.getFilePath(
      "./tests/fixtures/logo.jpg"
    );

    // Validate contents on Compose Attachments are displayed
    await expect(await ChatScreen.composeAttachmentsFileEmbed).toBeDisplayed();
    await expect(await ChatScreen.composeAttachmentsFileIcon).toBeDisplayed();
    await expect(await ChatScreen.composeAttachmentsFileInfo).toBeDisplayed();

    await expect(
      await ChatScreen.composeAttachmentsFileNameText
    ).toHaveTextContaining(expectedPath);
  });

  it("Chats - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await ChatScreen.deleteFileOnComposeAttachment();

    // Validate contents on Compose Attachments are displayed
    await (
      await ChatScreen.composeAttachmentsFileEmbed
    ).waitForExist({ reverse: true });
  });

  it("Chats - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await ChatScreen.uploadFile("./tests/fixtures/logo.jpg");

    // Validate contents on Compose Attachments are displayed
    await expect(await ChatScreen.composeAttachmentsFileEmbed).toBeDisplayed();

    // Type a text message and send it
    await ChatScreen.typeMessageOnInput("message with attachment");
    await ChatScreen.clickOnSendMessage();
  });

  // Needs to be fixed before unskipping
  xit("Chats - Message Sent With Attachment - Text contents", async () => {
    // Validate text from message containing attachment
    const textFromMessage = await ChatScreen.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining(
      "message with attachment"
    );
  });

  it("Chats - Message Sent With Attachment - File Meta Data", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await ChatScreen.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chats - Message Sent With Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await ChatScreen.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chats - Message Sent With Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await ChatScreen.getLastMessageSentFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chats - Message Sent With Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await ChatScreen.getLastMessageSentDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });

  // Skipping since hovering on inactive elements is flakky on CI
  xit("Validate Chat Screen tooltips for Call and Videocall display Coming soon", async () => {
    // Validate Call button tooltip contains "Coming soon"
    await ChatScreen.hoverOnCallButton();
    await expect(await ChatScreen.topbarCallTooltipText).toHaveTextContaining(
      "Coming soon"
    );

    // Validate Videocall button tooltip contains "Coming soon"
    await ChatScreen.hoverOnVideocallButton();
    await expect(
      await ChatScreen.topbarVideocallTooltipText
    ).toHaveTextContaining("Coming soon");
  });

  it("Validate Chat Screen tooltips are displayed", async () => {
    // Validate Favorites button tooltip
    await ChatScreen.hoverOnFavoritesButton();
    await expect(
      await ChatScreen.topbarAddToFavoritesTooltipText
    ).toHaveTextContaining("Add to Favorites");

    // Validate Upload button tooltip
    await ChatScreen.hoverOnUploadButton();
    await expect(await ChatScreen.uploadTooltipText).toHaveTextContaining(
      "Upload"
    );

    // Validate Send button tooltip
    await ChatScreen.hoverOnSendButton();
    await expect(await ChatScreen.sendMessageTooltipText).toHaveTextContaining(
      "Send"
    );
  });

  after(async () => {
    // Pause for 30 seconds before finishing execution
    await browser.pause(30000);
  });
});
