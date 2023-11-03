import "module-alias/register";
import mainChatsTestsUserB from "@specs/reusable-accounts/ChatUserB/01-main-chats-userB.spec";
import repliesTestsUserB from "@specs/reusable-accounts/ChatUserB/02-chat-replies-userB.spec";
import messageContextMenuTestsUserB from "@specs/reusable-accounts/ChatUserB/03-message-context-menu-userB.spec";
import messageInputTestsUserB from "@specs/reusable-accounts/ChatUserB/04-message-input-userB.spec";
import messageAttachmentsTestsUserB from "@specs/reusable-accounts/ChatUserB/05-message-attachments-userB.spec";
import quickProfileTestsUserB from "@specs/reusable-accounts/ChatUserB/06-quick-profile-userB.spec";
import sidebarChatsTestsUserB from "@specs/reusable-accounts/ChatUserB/07-sidebar-chats-userB.spec";
import groupChatTestsUserB from "@specs/reusable-accounts/ChatUserB/08-group-chats-userB.spec";
import groupChatEditTestsUserB from "@specs/reusable-accounts/ChatUserB/09-group-chat-edit-userB.spec";
import groupChatSidebarTestsUserB from "@specs/reusable-accounts/ChatUserB/10-group-chats-sidebar-userB.spec";

describe("MacOS Chats Tests - User B", async () => {
  describe("Send friend request and Chat", mainChatsTestsUserB.bind(this));
  describe("Chat Replies", repliesTestsUserB.bind(this));
  describe("Message Context Menu", messageContextMenuTestsUserB.bind(this));
  describe("Message Input", messageInputTestsUserB.bind(this));
  describe("Message Attachments", messageAttachmentsTestsUserB.bind(this));
  describe("Quick Profile", quickProfileTestsUserB.bind(this));
  describe("Sidebar Chats", sidebarChatsTestsUserB.bind(this));
  describe("Group Chats Main", groupChatTestsUserB.bind(this));
  describe("Group Chats Edit", groupChatEditTestsUserB.bind(this));
  describe("Group Chats Sidebar", groupChatSidebarTestsUserB.bind(this));
});
