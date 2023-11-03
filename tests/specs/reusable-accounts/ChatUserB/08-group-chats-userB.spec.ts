import "module-alias/register";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import Messages from "@screenobjects/chats/Messages";
import Topbar from "@screenobjects/chats/Topbar";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);

export default async function groupChatTestsUserB() {
  it("User B - Group Chat is displayed on remote participant users sidebar", async () => {
    // Validate group chat is displayed on remote participant users sidebar and then go to group chat
    await chatsSidebarFirstUser.waitForGroupToBeCreated("Test");
    const statusFromGroupOnUserB =
      await chatsSidebarFirstUser.getSidebarGroupStatus("Test");
    await expect(statusFromGroupOnUserB).toHaveTextContaining(
      "No messages sent yet, send one!",
    );
    await chatsSidebarFirstUser.goToSidebarGroupChat("Test");

    await chatsTopbarFirstUser.validateTopbarExists();

    const topbarUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarUserName).toHaveTextContaining("Test");

    const topbarUserStatus = await chatsTopbarFirstUser.topbarUserStatusValue;
    await expect(topbarUserStatus).toHaveTextContaining("Members (2)");
    await chatsSidebarFirstUser.goToSidebarChat("ChatUserA");

    await chatsTopbarFirstUser.validateTopbarExists();
  });

  it("Group Chat - User B receives the message in group chat", async () => {
    // Validate message is received in group chat
    await chatsSidebarFirstUser.goToSidebarGroupChat("Test");
    await chatsMessagesFirstUser.waitForReceivingMessage("Sup");
  });

  it("Group Chat - User B - Group is displayed", async () => {
    // Validate search results for a string not matching any group chat or user
    await chatsTopbarFirstUser.validateTopbarExists();

    const topbarUserName = await chatsTopbarFirstUser.topbarUserNameValue;
    await expect(topbarUserName).toHaveTextContaining("Test");
  });
}
