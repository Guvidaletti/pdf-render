import { config as loadEnv } from 'dotenv';
loadEnv();

// API configuration.
export const API_PORT = parseInt(process.env.API_PORT || '8081');

// API
export const tempFolder = `${__dirname}/tmp/`;

type env = 'development' | 'production';
export const Environment: env =
  (process.env.ENVIRONMENT as env) ?? 'development';
