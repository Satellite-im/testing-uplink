import "module-alias/register";
import mainChatsTestsUserA from "@specs/reusable-accounts/ChatUserA/01-main-chats-userA.spec";
import repliesTestsUserA from "@specs/reusable-accounts/ChatUserA/02-chat-replies-userA.spec";
import messageContextMenuTestsUserA from "@specs/reusable-accounts/ChatUserA/03-message-context-menu-userA.spec";
import messageInputTestsUserA from "@specs/reusable-accounts/ChatUserA/04-message-input-userA.spec";
import messageAttachmentsTestsUserA from "@specs/reusable-accounts/ChatUserA/05-message-attachments-userA.spec";
import chatTopbarTestsUserA from "@specs/reusable-accounts/ChatUserA/06-chat-topbar-userA.spec";
import quickProfileTestsUserA from "@specs/reusable-accounts/ChatUserA/07-quick-profile-userA.spec";
import sidebarChatsTestsUserA from "@specs/reusable-accounts/ChatUserA/08-sidebar-chats-userA.spec";
import groupChatTestsUserA from "@specs/reusable-accounts/ChatUserA/09-group-chats-userA.spec";
import groupChatEditTestsUserA from "@specs/reusable-accounts/ChatUserA/10-group-chat-edit-userA.spec";
import groupChatSidebarTestsUserA from "@specs/reusable-accounts/ChatUserA/11-group-chats-sidebar-userA.spec";

describe("MacOS Chats Tests - User A", async () => {
  describe("Accept friend request and Chat", mainChatsTestsUserA.bind(this));
  describe("Chat Replies", repliesTestsUserA.bind(this));
  describe("Message Context Menu", messageContextMenuTestsUserA.bind(this));
  describe("Message Input", messageInputTestsUserA.bind(this));
  describe("Message Attachments", messageAttachmentsTestsUserA.bind(this));
  describe("Chat Topbar", chatTopbarTestsUserA.bind(this));
  describe("Quick Profile", quickProfileTestsUserA.bind(this));
  describe("Sidebar Chats", sidebarChatsTestsUserA.bind(this));
  describe("Group Chats Main", groupChatTestsUserA.bind(this));
  describe("Group Chats Edit", groupChatEditTestsUserA.bind(this));
  describe("Group Chats Sidebar", groupChatSidebarTestsUserA.bind(this));
});
