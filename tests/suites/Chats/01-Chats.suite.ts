require("module-alias/register");
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

describe("MacOS Chats Tests", function () {
  describe(
    "Create Accounts and Chat Tests",
    createChatAccountsTests.bind(this),
  );
  /*describe("Chat Replies Tests", repliesTests.bind(this));
  describe("Message Context Menu Tests", messageContextMenuTests.bind(this));
  describe("Message Input Tests", messageInputTests.bind(this));
  describe("Message Attachments Tests", messageAttachmentsTests.bind(this));
  describe("Chat Topbar Tests", chatTopbarTests.bind(this));
  describe("Quick Profile Tests", quickProfileTests.bind(this));
  describe("Sidebar Chats Tests", sidebarChatsTests.bind(this));
  describe("Group Chats Tests", groupChatTests.bind(this));
  describe("Group Chats Edit Tests", groupChatEditTests.bind(this));
  describe(
    "Group Chats Favorites and Sidebar Tests",
    groupChatSidebarTests.bind(this),
  );*/
});
