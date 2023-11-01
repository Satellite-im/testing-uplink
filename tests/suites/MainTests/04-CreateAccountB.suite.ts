import "module-alias/register";
import createSecondAccount from "@specs/16-create-second-account.spec";

describe("MacOS Tests - Create Second Account", function () {
    describe("Create and Save Second Account", createSecondAccount.bind(this));
})