// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  App_Name: 'TaskSheet App',
  production: true,
  version: env.npm_package_version,
  serverUrl: 'https://api.chucknorris.io',
  apiUrl: 'https://tasksheetapi.azurewebsites.net/api',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  credentialsKey: 'jnwoi3u4542q6462',
  profileKey: 'hF10K8H087Mi',
};

export const Feature = {
  CanDelete: false,
  CanView: false,
  Tasks: {
    MapTracker: true,
  },
};
