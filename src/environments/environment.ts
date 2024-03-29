// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  App_Name: 'TaskSheet App',
  production: false,
  version: env.npm_package_version + '-dev',
  serverUrl: '/api',
  apiUrl: 'http://localhost:5001/api',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  credentialsKey: 'credentials',
  profileKey: 'userprofile',
  appInsights: {
    instrumentationKey: '424c81f6-304b-4fae-9cd9-526a46945461',
    appName: 'TaskSheet Web App',
  },
  umamiInsights: {
    srcUrl: 'https://umami-analytics-webapp.azurewebsites.net/umami.js',
    appCode: '2c0d13bc-782f-4fb1-b6f4-dd8628aa1167',
  },
};

export const Feature = {
  CanDelete: false,
  CanView: false,
  Tasks: {
    MapTracker: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
