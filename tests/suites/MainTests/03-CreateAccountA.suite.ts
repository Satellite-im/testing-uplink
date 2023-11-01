import "module-alias/register";
import createFirstAccount from "@specs/15-create-first-account.spec";

describe("MacOS Tests - Create First Account", function () {
    describe("Create and Save First Account", createFirstAccount.bind(this));
})