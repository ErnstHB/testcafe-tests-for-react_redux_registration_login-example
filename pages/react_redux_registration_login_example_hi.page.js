import { Selector } from "testcafe";
import * as registration from "./react_redux_registration_login_example_registration.page";

// Hi Page Selectors

export const loggedInWelcome = Selector("#app p").withText(
  "You're logged in with React!!"
);
export const userListItem = Selector("#app li").withText(
  `${registration.userFirstName} ${registration.userLastName} - Delete`
);
export const deleteUserLink = Selector("#app a").withText("Delete");
export const logoutLink = Selector("#app a").withText("Logout");

// Hi Page String Constants
