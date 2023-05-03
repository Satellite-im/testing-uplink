//import { resetAndLoginWithCache } from "../../helpers/commands";
import { grabCacheFolder, loginWithTestUser } from "../../helpers/commands";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import InputBar from "../../screenobjects/chats/InputBar";
import Topbar from "../../screenobjects/chats/Topbar";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";
import { faker } from "@faker-js/faker";
const userToTestWith = "ChatUserB";

describe("Two users at the same time - Chat User A", async () => {
  it("Load Chat User A account and go to friends screen", async () => {
    // Assumming that you have copied .uplink folder from user with several friends and groups into ./fixutes/users/ChatUserA
    // Login with the test user
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();

    // Go to Friends
    await FriendsScreen.waitForIsShown(true);
  });

  it("Open a Chat conversation with ChatUserA", async () => {
    await FriendsScreen.chatWithFriend("ChatUserA");
    await ChatsLayout.waitForIsShown(true);
    await Topbar.topbarIndicatorOnline.waitForDisplayed({
      timeout: 240000,
    });
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserA", async () => {
      // Code
      await InputBar.typeMessageOnInput(message);
      await InputBar.clickOnSendMessage();
    });
  }

  /*it("Open a Chat conversation with ChatUserC", async () => {
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserC");
    await ChatsLayout.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserC", async () => {
      await InputBar.typeMessageOnInput(message);
      await InputBar.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserD", async () => {
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserD");
    await ChatsLayout.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserD", async () => {
      await InputBar.typeMessageOnInput(message);
      await InputBar.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserE", async () => {
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserE");
    await ChatsLayout.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserE", async () => {
      await InputBar.typeMessageOnInput(message);
      await InputBar.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with ChatUserF", async () => {
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    await FriendsScreen.chatWithFriend("ChatUserF");
    await ChatsLayout.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to ChatUserF", async () => {
      await InputBar.typeMessageOnInput(message);
      await InputBar.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with First Group", async () => {
    const locator =
      '//XCUIElementTypeGroup[@label="Chats"]//XCUIElementTypeGroup[@label="Username"]';
    await $$(locator)[0].click();
    await ChatsLayout.waitForIsShown(true);
    await browser.pause(15000);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to First Group", async () => {
      await InputBar.typeMessageOnInput(message);
      await InputBar.clickOnSendMessage();
    });
  }

  it("Open a Chat conversation with Second Group", async () => {
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    const locator =
      '//XCUIElementTypeGroup[@label="Chats"]//XCUIElementTypeGroup[@label="Username"]';
    await $$(locator)[6].click();
    await ChatsLayout.waitForIsShown(true);
  });

  for (let i = 0; i < 100; i++) {
    const message = faker.lorem.sentence(5);
    it("Chats - Send multiple messages to Second Group", async () => {
      await InputBar.typeMessageOnInput(message);
      await InputBar.clickOnSendMessage();
    });
  }*/

  it("Chats - Grab cache folder", async () => {
    await grabCacheFolder(userToTestWith);
  });
});
