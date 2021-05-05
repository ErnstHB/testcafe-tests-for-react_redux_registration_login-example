import { Selector } from "testcafe";
import * as registration from "../pages/react_redux_registration_login_example_registration.page";
import * as login from "../pages/react_redux_registration_login_example_login.page";
import * as hi from "../pages/react_redux_registration_login_example_hi.page";

fixture`React Redux Registration Login Example - Registration`
  .page`http://localhost:8080/login`;

test("Register new User", async (t) => {
  await t
    .click(login.registerLink)
    .typeText(registration.firstNameField, registration.userFirstName)
    .typeText(registration.lastNameField, registration.userLastName)
    .typeText(registration.userNameField, registration.userName)
    .typeText(registration.passNameField, registration.password)
    .click(registration.registerButton)
    .expect(login.alertSuccess.innerText)
    .ok(login.REGISTRATION_SUCCESSFUL);
});

fixture`React Redux Registration Login Example - Login`
  .page`http://localhost:8080/login`.beforeEach(async (t) => {
  // It would make better sense to register the testing users via an API endpoint, which does not seem to be a thing in this Example site
  await t
    .click(login.registerLink)
    .typeText(registration.firstNameField, registration.userFirstName)
    .typeText(registration.lastNameField, registration.userLastName)
    .typeText(registration.userNameField, registration.userName)
    .typeText(registration.passNameField, registration.password)
    .click(registration.registerButton)
    .expect(login.alertSuccess.innerText)
    .ok(login.REGISTRATION_SUCCESSFUL);
});

test("Fail to Login with Invalid Credentials", async (t) => {
  await t
    .typeText(login.userNameField, "pedro")
    .typeText(login.passNameField, registration.password)
    .click(login.loginButton)
    .expect(login.alertDanger.innerText)
    .ok(login.CREDENTIALS_INCORRECT);
});

test("Fail to Login with Invalid Password", async (t) => {
  await t
    .typeText(login.userNameField, registration.userName)
    .typeText(login.passNameField, "123456")
    .click(login.loginButton)
    .expect(login.alertDanger.innerText)
    .ok(login.CREDENTIALS_INCORRECT);
});

test("Login with Valid Credentials", async (t) => {
  await t
    .typeText(login.userNameField, registration.userName)
    .typeText(login.passNameField, registration.password)
    .click(login.loginButton)
    .expect(hi.loggedInWelcome.visible)
    .ok();
});

fixture`React Redux Registration Login Example - Delete User; Logout`
  .page`http://localhost:8080/login`.beforeEach(async (t) => {
  await t
    .click(login.registerLink)
    .typeText(registration.firstNameField, registration.userFirstName)
    .typeText(registration.lastNameField, registration.userLastName)
    .typeText(registration.userNameField, registration.userName)
    .typeText(registration.passNameField, registration.password)
    .click(registration.registerButton)
    .expect(login.alertSuccess.innerText)
    .ok(login.REGISTRATION_SUCCESSFUL)
    .typeText(login.userNameField, registration.userName)
    .typeText(login.passNameField, registration.password)
    .click(login.loginButton);
});

test("Delete User", async (t) => {
  await t
    .click(hi.userListItem)
    .click(hi.deleteUserLink)
    .expect(hi.userListItem.exists)
    .notOk();
});

test("Log Out", async (t) => {
  await t.click(hi.logoutLink).expect(login.loginHeader.visible).ok();
});
