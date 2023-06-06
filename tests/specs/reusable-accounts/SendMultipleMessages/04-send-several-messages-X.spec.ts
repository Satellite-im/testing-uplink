const userToTestWith = "ChatUserB";
import { faker } from "@faker-js/faker";
import { grabCacheFolder, loginWithTestUser } from "../../../helpers/commands";
import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import InputBar from "../../../screenobjects/chats/InputBar";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";
let chatsInputFirstUser = new InputBar("userA");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

describe("Two users at the same time - Chat User A", async () => {
  it("Load Chat User A account and go to friends screen", async () => {
    // Assuming that you have copied .uplink folder from user with several friends and groups into ./fixutes/users/ChatUserA
    // Login with the test user
    await loginWithTestUser();
    await welcomeScreenFirstUser.goToFriends();

    // Go to Friends
    await friendsScreenFirstUser.waitForIsShown(true);
  });

  it("Open a Chat conversation with ChatUserA", async () => {
    await friendsScreenFirstUser.chatWithFriend("ChatUserA");
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.topbarIndicatorOnline.waitForDisplayed({
      timeout: 240000,
    });
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserA", async () => {
      // Code
      await chatsInputFirstUser.typeMessageOnInput(message);
      await chatsInputFirstUser.clickOnSendMessage();
    });
  }

  /*it("Open a Chat conversation with ChatUserC", async () => {
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.chatWithFriend("ChatUserC");
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserC", async () => {
      await chatsInputFirstUser.typeMessageOnInput(message);
      await chatsInputFirstUser.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserD", async () => {
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.chatWithFriend("ChatUserD");
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserD", async () => {
      await chatsInputFirstUser.typeMessageOnInput(message);
      await chatsInputFirstUser.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserE", async () => {
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.chatWithFriend("ChatUserE");
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserE", async () => {
      await chatsInputFirstUser.typeMessageOnInput(message);
      await chatsInputFirstUser.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserF", async () => {
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.chatWithFriend("ChatUserF");
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserF", async () => {
      await chatsInputFirstUser.typeMessageOnInput(message);
      await chatsInputFirstUser.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with First Group", async () => {
    const locator =
      '//XCUIElementTypeGroup[@label="Chats"]//XCUIElementTypeGroup[@label="Username"]';
    await this.instance.$($(locator)[0].click();
    await chatsLayoutFirstUser.waitForIsShown(true);
    await browser.pause(15000);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to First Group", async () => {
      await chatsInputFirstUser.typeMessageOnInput(message);
      await chatsInputFirstUser.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with Second Group", async () => {
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    const locator =
      '//XCUIElementTypeGroup[@label="Chats"]//XCUIElementTypeGroup[@label="Username"]';
    await this.instance.$($(locator)[6].click();
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to Second Group", async () => {
      await chatsInputFirstUser.typeMessageOnInput(message);
      await chatsInputFirstUser.clickOnSendMessage();
    });
  }*/

  it("Chats - Grab cache folder", async () => {
    await grabCacheFolder(userToTestWith, "userA");
  });
});
