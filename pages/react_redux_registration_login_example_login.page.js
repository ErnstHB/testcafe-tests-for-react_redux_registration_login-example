import { Selector } from "testcafe";

// Login Page Selectors

export const loginHeader = Selector("#app h2").withText("Login");
export const alertSuccess = Selector('div[class="alert alert-success"]');
export const alertDanger = Selector('div[class="alert alert-danger"]');
export const userNameField = Selector('input[name="username"]');
export const passNameField = Selector('input[name="password"]');
export const loginButton = Selector("#app button").withText("Login");
export const registerLink = Selector("#app a").withText("Register");

// Login Page String Constants

export const REGISTRATION_SUCCESSFUL = "Registration successful";
export const CREDENTIALS_INCORRECT = "Username or password is incorrect";
