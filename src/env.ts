import { config } from "dotenv";
import * as path from "path";
import * as pkg from "../package.json";
import {
    getDotEnvFile ,getOsEnv, normalizePort
} from "./config/env/env_utils";

/**
 * Load .env files
 */
config({path: path.join(process.cwd(), getDotEnvFile()) });

/**
 * Environment Variables
 */
export const env = {
    app: {
        description: (pkg as any).description,
        host: getOsEnv("APP_HOST"),
        name: getOsEnv("APP_NAME"),
        port: normalizePort(process.env.PORT) || getOsEnv("APP_PORT"),
        version: (pkg as any).version
    },
    isDevelopment: process.env.NODE_ENV === "DEV",
    isProduction: process.env.NODE_ENV === "PR",
    isTest: process.env.NODE_ENV === "TEST",
    log: {
        filename: getOsEnv("LOG_FILENAME"),
        level: getOsEnv("LOG_LEVEL"),
        maxfiles: getOsEnv("LOG_MAXFILES"),
        maxfilesize: getOsEnv("LOG_MAXFILESIZE"),
        output: getOsEnv("LOG_OUTPUT")
    },
    node: process.env.NODE_ENV || "DEV"
};
