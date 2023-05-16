import quickProfileUserA from "../../specs/reusable-accounts/ChatUserA/02-quick-profile-with-A.spec";
import sendRequest from "../../specs/reusable-accounts/ChatUserA/01-send-request-and-chat.spec";
import sidebarWithUserA from "../../specs/reusable-accounts/ChatUserA/03-sidebar-with-A.spec";

describe("Chat and Friends Tests with User A", function () {
  describe("Send request and chats tests with User A", sendRequest.bind(this));
  describe("Quick Profile Tests with User A", quickProfileUserA.bind(this));
  describe("Sidebar Tests with User A", sidebarWithUserA.bind(this));
});
