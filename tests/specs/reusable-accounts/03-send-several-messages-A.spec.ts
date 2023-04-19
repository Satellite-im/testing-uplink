//import { resetAndLoginWithCache } from "../../helpers/commands";
import { grabCacheFolder, loginWithTestUser } from "../../helpers/commands";
import ChatScreen from "../../screenobjects/ChatScreen";
import FriendsScreen from "../../screenobjects/FriendsScreen";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";
import { faker } from "@faker-js/faker";

describe("Two users at the same time - Chat User A", async () => {
  it("Load Chat User A account and go to friends screen", async () => {
    // Assumming that you have copied .uplink folder from user with several friends and groups into ./fixutes/users/ChatUserA
    // Login with the test user
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();

    // Go to Friends
    await FriendsScreen.waitForIsShown(true);
  });

  it("Open a Chat conversation with ChatUserB", async () => {
    await FriendsScreen.chatWithFriend("ChatUserB");
    await ChatScreen.waitForIsShown(true);
    await (
      await ChatScreen.topbarIndicatorOnline
    ).waitForDisplayed({ timeout: 240000 });
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserB", async () => {
      // Code
      await ChatScreen.typeMessageOnInput(message);
      await ChatScreen.clickOnSendMessage();
    });
  }

  /*it("Open a Chat conversation with ChatUserC", async () => {
    await ChatScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserC");
    await ChatScreen.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserC", async () => {
      await ChatScreen.typeMessageOnInput(message);
      await ChatScreen.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserD", async () => {
    await ChatScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserD");
    await ChatScreen.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserD", async () => {
      await ChatScreen.typeMessageOnInput(message);
      await ChatScreen.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserE", async () => {
    await ChatScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserE");
    await ChatScreen.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserE", async () => {
      await ChatScreen.typeMessageOnInput(message);
      await ChatScreen.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserF", async () => {
    await ChatScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserF");
    await ChatScreen.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserF", async () => {
      await ChatScreen.typeMessageOnInput(message);
      await ChatScreen.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with First Group", async () => {
    const locator =
      '//XCUIElementTypeGroup[@label="Chats"]//XCUIElementTypeGroup[@label="Username"]';
    await $$(locator)[6].click();
    await ChatScreen.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to First Group", async () => {
      await ChatScreen.typeMessageOnInput(message);
      await ChatScreen.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with Second Group", async () => {
    await ChatScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    const locator =
      '//XCUIElementTypeGroup[@label="Chats"]//XCUIElementTypeGroup[@label="Username"]';
    await $$(locator)[6].click();
    await ChatScreen.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to Second Group", async () => {
      await ChatScreen.typeMessageOnInput(message);
      await ChatScreen.clickOnSendMessage();
    });
  }*/

  it("Chats - Grab cache folder", async () => {
    await grabCacheFolder("ChatUserA");
  });
});
