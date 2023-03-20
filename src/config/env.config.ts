import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

/**
 * This is an environment variable sanitizer.
 * It checks if all environment variables are present and can be assigned the right type.
 * Even if the variables pass the sanitizer, they should always be checked first.
 */

// Load the environment variables from config.env.
dotenvExpand.expand(
  dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })
);
// Defines the types for the environment variables.
interface ENV {
  API_HOST: string | undefined;
  API_PORT: number | undefined;
  JWT_KEY: string | undefined;
  DB_DATABASE: string | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_ROOT_PASSWORD: string | undefined;
  DB_HOST: string | undefined;
  DB_HOST_ALIAS: string | undefined;
  DB_PORT: number | undefined;
  DB_URL: string | undefined;
  DB_URL_ALIAS: string | undefined;
}

// Defines the types that the final configuration object needs to be.
interface Config {
  API_HOST: string;
  API_PORT: number;
  JWT_KEY: string;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_ROOT_PASSWORD: string;
  DB_HOST: string;
  DB_HOST_ALIAS: string;
  DB_PORT: number;
  DB_URL: string;
  DB_URL_ALIAS: string;
}

// Gets the environment variables and return them as an ENV object.
const getConfig = (): ENV => {
  return {
    API_HOST: process.env.API_HOST ? String(process.env.API_HOST) : undefined,
    API_PORT: process.env.API_PORT ? Number(process.env.API_PORT) : undefined,
    DB_DATABASE: process.env.DB_DATABASE
      ? String(process.env.DB_DATABASE)
      : undefined,
    DB_USERNAME: process.env.DB_USERNAME
      ? String(process.env.DB_USERNAME)
      : undefined,
    DB_PASSWORD: process.env.DB_PASSWORD
      ? String(process.env.DB_PASSWORD)
      : undefined,
    DB_ROOT_PASSWORD: process.env.DB_ROOT_PASSWORD
      ? String(process.env.DB_ROOT_PASSWORD)
      : undefined,
    DB_HOST: process.env.DB_HOST ? String(process.env.DB_HOST) : undefined,
    DB_HOST_ALIAS: process.env.DB_HOST_ALIAS
      ? String(process.env.DB_HOST_ALIAS)
      : undefined,
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    DB_URL: process.env.DB_URL ? String(process.env.DB_URL) : undefined,
    DB_URL_ALIAS: process.env.DB_URL_ALIAS
      ? String(process.env.DB_URL_ALIAS)
      : undefined,
    JWT_KEY: process.env.JWT_KEY ? String(process.env.JWT_KEY) : undefined,
  };
};

// Sanitizes the ENV object and return it as a Config object
const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    // If the value is undefined, throw an error indicating the missing key.
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env.`);
    }
  }
  // Casts the ENV object to a Config object and return it.
  return config as Config;
};

// Get the environment variables and sanitize them.
const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

// Export the sanitized configuration object as the default export.
export default sanitizedConfig;
