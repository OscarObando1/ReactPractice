/**
 * Single source of truth for every route path. Components and the router import
 * from here instead of hard-coding URL strings, so a path only ever changes in
 * one place (DRY) and typos surface as import errors.
 */
export const PATHS = {
  home: "/",
  login: "/login",
  myAccount: "/my-account",
  training: "/training",
  joinUs: "/join-us",
  changePassword: "/change-password",
  registration: "/registration",
  registrationVerification: "/registration-verification",
};
