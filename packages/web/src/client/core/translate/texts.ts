export const TEXTS = {
  EMAIL: "Email",
  LOGIN: "Login",
  NAME: "Name",
  USERNAME: "Username",
  SURNAME: "Surname",
  PHONE: "Phone",
  PASSWORD: "Password",
  ENTER_LOGIN: "Enter your login",
  ENTER_EMAIL: "Enter your email",
  ENTER_PASSWORD: "Enter your password",
  ENTER_USERNAME: "Enter your username",
  ENTER_NAME: "Enter your name",
  ENTER_SURNAME: "Enter your surname",
  ENTER_PHONE: "Enter your phone",

  SIGN_UP: "Sign Up",
  SIGN_IN: "Sign In",
  OR_SIGN_UP: "Or Sign Up",
  OR_SIGN_IN: "Or login",
  LOGIN_WITH_YA: "Login with Yandex",

  OLD_PASSWORD: "Old password",
  NEW_PASSWORD: "New password",
  ENTER_NEW_PASSWORD: "Enter your new password",
  CONFIRM_NEW_PASSWORD: "Confirm your new password",
  ENTER_PASSWORD_AGAIN: "Enter your new password again",

  CHANGE_PASSWORD: "Change password",
  EDIT_PROFILE: "Edit profile",
  LEADERBOARD: "Leaderboard",

  SAVE: "Save",
  CANCEL: "Cancel",
  LOGOUT: "Logout",

  THIS_PAGE_WAS_STOLEN: "This page was stolen by aliens :(",
  GO_BACK_TO_HOME_PAGE: "Go back to the main page",

  GAME: {
    PRESS_TO_START: "Press Enter to Start",
    SCORE: (score: number): string => `Score: ${score}`,
    HIGH_SCORE: (score: number): string => `High Score: ${score}`,
    GAME_OVER_WITH_SCORE: (score: number): string =>
      `Game Over. Score: ${score}`,
  },

  FORUM: {
    CREATE_TOPIC: "Create topic",
    HEADER: "Community - games forum",
    SEND_MESSAGE: "Send message",
    ENTER_MESSAGE: "Enter the message",
    NO_COMMENT: "No comment",
    INFO: "Describe the main point",
  },

  ERRORS: {
    SOMETHING_WENT_WRONG: "Something went wrong",
    ERROR_HAS_OCCURED: "An error has occurred, we are already fixing it!",
  },
};
