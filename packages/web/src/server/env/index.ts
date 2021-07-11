import path from "path";
import { load, EnvType } from "ts-dotenv";
import { schema } from "./schema";

export type Env = EnvType<typeof schema>;

export let env: Env;

export const loadEnv = (
  nodeEnv: "development" | "production" = "development"
): Env => {
  const envName = nodeEnv === "production" ? ".env" : ".env.dev";
  const pathToEnv = path.resolve(process.cwd(), `../../${envName}`);

  env = load(schema, {
    path: pathToEnv,
  });

  return env;
};
