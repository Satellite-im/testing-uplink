import "module-alias/register";
import createSecondAccount from "@specs/14-create-reusable-accounts.spec";

describe("MacOS Tests - Create Second Account", function () {
    describe("Create Pin and Account Tests", createSecondAccount.bind(this));
})