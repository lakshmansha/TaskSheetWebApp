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
  appInsights: {
    instrumentationKey: 'ac32bab6-2161-4100-a73f-d5b5520fb4f3',
    appName: 'TaskSheet Web App',
  },
  umamiInsights: {
    srcUrl: 'https://umami-analytics-webapp.azurewebsites.net/umami.js',
    appCode: '0cc8e164-979b-461d-8d7a-334e2315914c',
  },
};

export const Feature = {
  CanDelete: false,
  CanView: false,
  Tasks: {
    MapTracker: true,
  },
};
