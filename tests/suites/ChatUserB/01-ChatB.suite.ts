import acceptRequest from "../../specs/reusable-accounts/ChatUserB/01-accept-request-and-chat.spec";
import quickProfileUserB from "../../specs/reusable-accounts/ChatUserB/02-quick-profile-with-B.spec";
import sidebarWithUserB from "../../specs/reusable-accounts/ChatUserB/03-sidebar-with-B.spec";

describe("Chat and Friends Tests with User B", function () {
  describe(
    "Accept request and chats tests with User B",
    acceptRequest.bind(this)
  );
  describe("Quick Profile Tests with User B", quickProfileUserB.bind(this));
  describe("Sidebar Tests with User B", sidebarWithUserB.bind(this));
});
