import path from 'path';
import dotenv from 'dotenv';

/**
 * This is an environment variable sanitizer.
 * It checks if all environment variables are present and can be assigned the right type.
 * Even if the variables pass the sanitizer, they should always be checked first.
 */

// Load the environment variables from config.env.
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Defines the types for the environment variables.
interface ENV {
  API_PORT: number | undefined;
}

// Defines the types that the final configuration object needs to be.
interface Config {
  API_PORT: number;
}

// Gets the environment variables and return them as an ENV object.
const getConfig = (): ENV => {
  return {
    API_PORT: process.env.API_PORT ? Number(process.env.API_PORT) : undefined,
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
