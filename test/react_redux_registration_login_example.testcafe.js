import { Selector } from "testcafe";
import * as example from "../pages/react_redux_registration_login_example.page";

fixture`React Redux Registration Login Example - Registration`
  .page`http://localhost:8080/login`;

test("Register new User", async (t) => {
  await t
    .click(example.registerLink)
    .typeText(example.firstNameField, "Pepe")
    .typeText(example.lastNameField, "Perez")
    .typeText(example.userNameField, "pepe")
    .typeText(example.passNameField, "1234")
    .click(Selector("#app button").withText("Register"))
    .expect(
      Selector("#app div").withText("Registration successful").nth(3).visible
    )
    .ok();
});

fixture`React Redux Registration Login Example - Login`
  .page`http://localhost:8080/login`.beforeEach(async (t) => {
  // It would make better sense to register the testing users via an API endpoint, which does not seem to be a thing in this Example site
  await t
    .click(Selector("#app a").withText("Register"))
    .typeText("#app .form-control", "Pepe")
    .typeText(Selector("#app .form-control").nth(1), "Perez")
    .typeText(Selector("#app .form-control").nth(2), "pepe")
    .typeText(Selector("#app .form-control").nth(3), "1234")
    .click(Selector("#app button").withText("Register"))
    .expect(
      Selector("#app div").withText("Registration successful").nth(3).visible
    )
    .ok();
});

test("Fail to Login with Invalid Credentials", async (t) => {
  await t
    .expect(Selector("#app .form-control").visible)
    .ok()
    .typeText("#app .form-control", "pedro")
    .typeText(Selector("#app .form-control").nth(1), "1234")
    .click(Selector("#app button").withText("Login"))
    .expect(
      Selector("#app div").withText("Username or password is incorrect").nth(3)
        .visible
    )
    .ok();
});

test("Fail to Login with Invalid Password", async (t) => {
  await t
    .expect(Selector("#app .form-control").visible)
    .ok()
    .typeText("#app .form-control", "pepe")
    .typeText(Selector("#app .form-control").nth(1), "123456")
    .click(Selector("#app button").withText("Login"))
    .expect(
      Selector("#app div").withText("Username or password is incorrect").nth(3)
        .visible
    )
    .ok();
});

test("Login with Valid Credentials", async (t) => {
  await t
    .expect(Selector("#app .form-control").visible)
    .ok()
    .typeText("#app .form-control", "pepe")
    .typeText(Selector("#app .form-control").nth(1), "1234")
    .click(Selector("#app button").withText("Login"))
    .expect(
      Selector("#app p").withText("You're logged in with React!!").visible
    )
    .ok();
});

fixture`React Redux Registration Login Example - Delete User; Logout`
  .page`http://localhost:8080/login`.beforeEach(async (t) => {
  // It would make better sense to register the testing users via an API endpoint, which does not seem to be a thing in this Example site
  await t
    .click(Selector("#app a").withText("Register"))
    .typeText("#app .form-control", "Pepe")
    .typeText(Selector("#app .form-control").nth(1), "Perez")
    .typeText(Selector("#app .form-control").nth(2), "pepe")
    .typeText(Selector("#app .form-control").nth(3), "1234")
    .click(Selector("#app button").withText("Register"))
    .expect(
      Selector("#app div").withText("Registration successful").nth(3).visible
    )
    .ok()
    .typeText("#app .form-control", "pepe")
    .typeText(Selector("#app .form-control").nth(1), "1234")
    .click(Selector("#app button").withText("Login"));
});

test("Delete User", async (t) => {
  // It makes little sense to delete the signed in user. But it seems to be a feature in the Example site at test.
  await t
    .click(Selector("#app li").withText("Pepe Perez - Delete"))
    .click(Selector("#app a").withText("Delete"))
    .expect(Selector("#app li").withText("Pepe Perez - Delete").exists)
    .notOk();
});

test("Log Out", async (t) => {
  await t
    .click(Selector("#app a").withText("Logout"))
    .expect(Selector("#app h2").withText("Login").visible)
    .ok();
});
