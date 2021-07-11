export type LeaderboardNewLeaderRequestData = {
  data: Record<string, unknown>;
  ratingFieldName: string;
};

export type LeaderboardRequestData = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};
