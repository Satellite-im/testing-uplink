import chatTooltipsTests from "../../specs/reusable-accounts/06-chat-tooltips.spec";
import createChatAcountsTests from "../../specs/reusable-accounts/01-create-accounts-and-friends.spec";
import messageAttachmentsTests from "../../specs/reusable-accounts/05-message-attachments.spec";
import messageContextMenuTests from "../../specs/reusable-accounts/03-message-context-menu.spec";
import messageInputTests from "../../specs/reusable-accounts/04-message-input.spec";
import repliesTests from "../../specs/reusable-accounts/02-chat-replies.spec";
import quickProfileTests from "../../specs/reusable-accounts/07-quick-profile.spec";

describe("Chat and Friends Tests with two users", function () {
  describe("Create Accounts and Chat Tests", createChatAcountsTests.bind(this));
  describe("Chat Replies Tests", repliesTests.bind(this));
  describe("Message Context Menu Tests", messageContextMenuTests.bind(this));
  describe("Message Input Tests", messageInputTests.bind(this));
  describe("Message Attachments Tests", messageAttachmentsTests.bind(this));
  describe("Chat Tooltips Tests", chatTooltipsTests.bind(this));
  describe("Quick Profile Tests", quickProfileTests.bind(this));
});
