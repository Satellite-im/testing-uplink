import sendRequest from "../../specs/reusable-accounts/ChatUserA/01-send-request-and-chat.spec";
import quickProfileUserA from "../../specs/reusable-accounts/ChatUserA/02-quick-profile-with-A.spec";

xdescribe("Chat and Friends Tests with User A", function () {
  describe("Send request and chats tests with User A", sendRequest.bind(this));
  describe("Quick Profile Tests with User A", quickProfileUserA.bind(this));
});
