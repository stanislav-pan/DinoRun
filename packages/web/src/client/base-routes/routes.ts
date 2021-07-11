export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/login",
  SIGN_UP: "/signup",
  LEADERBOARD: "/leaderboard",
  PROFILE: "/profile",
  PROFILE_CHANGE: "/profile/:setting",
  FORUM: "/forum",
  FORUM_TOPIC: "/forum/:topicId",
  GAME: "/game",
  ERROR: "/500",
  NOT_FOUND: "*",
};

export const getAvailableRoutes = (): string[] => Object.values(ROUTES);
