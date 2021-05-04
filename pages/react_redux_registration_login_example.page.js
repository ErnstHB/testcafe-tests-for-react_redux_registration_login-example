import { Selector } from "testcafe";

// Login Page

export const registerLink = Selector('input[href = "/register"]');

// Register Page

export const firstNameField = Selector('input[name="firstName"]');
export const lastNameField = Selector('input[name="lastName"]');
export const userNameField = Selector('input[name="username"]');
export const passNameField = Selector('input[name="password"]');
