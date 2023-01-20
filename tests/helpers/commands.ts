import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import UplinkMainScreen from "../screenobjects/UplinkMainScreen";

export function customPredicateString(
  elementType: string,
  attribute: string,
  value: string,
  comparisonOperator: string
) {
  const predicateString: string = `-ios predicate string:elementType == ${elementType} AND ${attribute} ${comparisonOperator} '${value}'`;
  return predicateString;
}

export function getPredicateForTextValueEqual(value: string) {
  const predicateString: string = `-ios predicate string:elementType == 48 AND value == '${value}'`;
  return predicateString;
}

export async function loginToApp(pin: string, username: string) {
  // Enter Pin and click on Create Account
  await CreatePinScreen.enterPin(pin);
  await CreatePinScreen.clickOnCreateAccount();

  // Enter Username and click on Create Account
  await CreateUserScreen.enterUsername("test123");
  await CreateUserScreen.clickOnCreateAccount();

  // Ensure Main Screen is displayed
  await UplinkMainScreen.waitForIsShown(true)
}