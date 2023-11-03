import "module-alias/register";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "@screenobjects/chats/ContextMenuSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let contextMenuSidebarFirstUser = new ContextMenuSidebar(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);

export default async function groupChatSidebarTestsUserB() {
  it("Group Chat - Send message to the group with User B", async () => {
    // Send message to the group
    await chatsInputFirstUser.typeMessageOnInput("HelloGroup");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("HelloGroup");
  });

  it("Group Chat - Send another message to show again the group chat", async () => {
    // Send message to the group
    await chatsInputFirstUser.typeMessageOnInput("Hey!");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Hey!");
  });

  it("Group Chat - Sidebar - Leave group", async () => {
    // Leave group chat
    await chatsSidebarFirstUser.openContextMenuOnGroupChat("X");
    await contextMenuSidebarFirstUser.selectChatsLeaveGroup();
    await chatsSidebarFirstUser.validateSidebarChatIsNotDisplayed("X");
  });

  it("Group Chat - Ensure in remote side that user was added again to the group", async () => {
    // Ensure that user was added again to the group
    await chatsSidebarFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await filesScreenFirstUser.goToMainScreen();
    await chatsSidebarFirstUser.validateSidebarChatsIsShown();
    await chatsSidebarFirstUser.waitForGroupToBeCreated("X");
    await chatsSidebarFirstUser.goToSidebarGroupChat("X");
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate topbar contents has correct name
    const topbarUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarUserName).toHaveTextContaining("X");
  });

  it("Group Chat - Sidebar - Deleted group is not shown on remote side", async () => {
    // Ensure that group was removed on this side too
    await chatsSidebarFirstUser.validateSidebarChatIsNotDisplayed("X");
  });
}
