import { Selector } from "testcafe";

// Register Page Selectors

export const firstNameField = Selector('input[name="firstName"]');
export const lastNameField = Selector('input[name="lastName"]');
export const userNameField = Selector('input[name="username"]');
export const passNameField = Selector('input[name="password"]');

export const registerButton = Selector('button[class="btn btn-primary"]');

// Registration Page String Constants

export const REGISTRATION_SUCCESSFUL = "Registration successful";
export const userFirstName = "Pepe";
export const userLastName = "Perez";
export const userName = "pepe";
export const password = "1234";
