export {};

declare global {
  const NODE_ENV: "development" | "production";
  const IS_SSR: boolean;
  const USE_HMR: boolean;
}
