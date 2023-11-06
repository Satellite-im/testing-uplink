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
  xdescribe("Chat Replies", repliesTestsUserA.bind(this));
  xdescribe("Message Context Menu", messageContextMenuTestsUserA.bind(this));
  xdescribe("Message Input", messageInputTestsUserA.bind(this));
  xdescribe("Message Attachments", messageAttachmentsTestsUserA.bind(this));
  xdescribe("Chat Topbar", chatTopbarTestsUserA.bind(this));
  xdescribe("Quick Profile", quickProfileTestsUserA.bind(this));
  xdescribe("Sidebar Chats", sidebarChatsTestsUserA.bind(this));
  xdescribe("Group Chats Main", groupChatTestsUserA.bind(this));
  xdescribe("Group Chats Edit", groupChatEditTestsUserA.bind(this));
  xdescribe("Group Chats Sidebar", groupChatSidebarTestsUserA.bind(this));
});
