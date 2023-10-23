import "module-alias/register";
import chatTopbarTests from "@specs/reusable-accounts/06-chat-topbar.spec";
import createChatAccountsTests from "@specs/reusable-accounts/01-create-accounts-and-friends.spec";
import groupChatTests from "@specs/reusable-accounts/09-group-chats.spec";
import groupChatEditTests from "@specs/reusable-accounts/10-group-chats-edit.spec";
import groupChatSidebarTests from "@specs/reusable-accounts/11-group-chats-sidebar.spec";
import messageAttachmentsTests from "@specs/reusable-accounts/05-message-attachments.spec";
import messageContextMenuTests from "@specs/reusable-accounts/03-message-context-menu.spec";
import messageInputTests from "@specs/reusable-accounts/04-message-input.spec";
import repliesTests from "@specs/reusable-accounts/02-chat-replies.spec";
import quickProfileTests from "@specs/reusable-accounts/07-quick-profile.spec";
import sidebarChatsTests from "@specs/reusable-accounts/08-sidebar-chats.spec";

describe("Windows Chats Tests", function () {
  xdescribe(
    "Create Accounts and Chat Tests",
    createChatAccountsTests.bind(this)
  );
  xdescribe("Chat Replies Tests", repliesTests.bind(this));
  xdescribe("Message Context Menu Tests", messageContextMenuTests.bind(this));
  xdescribe("Message Input Tests", messageInputTests.bind(this));
  xdescribe("Message Attachments Tests", messageAttachmentsTests.bind(this));
  xdescribe("Chat Topbar Tests", chatTopbarTests.bind(this));
  xdescribe("Quick Profile Tests", quickProfileTests.bind(this));
  xdescribe("Sidebar Chats Tests", sidebarChatsTests.bind(this));
  xdescribe("Group Chats Tests", groupChatTests.bind(this));
  xdescribe("Group Chats Edit Tests", groupChatEditTests.bind(this));
  xdescribe(
    "Group Chats Favorites and Sidebar Tests",
    groupChatSidebarTests.bind(this)
  );
});
