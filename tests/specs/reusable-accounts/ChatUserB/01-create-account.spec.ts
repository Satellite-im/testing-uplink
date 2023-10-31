import "module-alias/register";
import {
  loginWithTestUser,
} from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);


export default async function friendRequestUserBTests() {
  it("Chat User B - Login with account previously created", async () => {
    // Login with account previously created
    await loginWithTestUser();
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
    await welcomeScreenFirstUser.goToFriends()
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  })
}
