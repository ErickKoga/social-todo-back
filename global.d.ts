namespace NodeJS {
  interface ProcessEnv {
    WEB_HOST: string;
    WEB_PORT: number;
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
}
