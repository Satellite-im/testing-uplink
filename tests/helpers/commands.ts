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

export async function loginWithNewAccount(pin: string, username: string) {
  await CreatePinScreen.enterPin(pin);
  await CreatePinScreen.clickOnCreateAccount();
  await CreateUserScreen.waitForIsShown(true);
  await CreateUserScreen.enterUsername(username);
  await CreateUserScreen.clickOnCreateAccount();
  await UplinkMainScreen.waitForIsShown(true);
}
