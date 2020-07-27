// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    IP: 'devapi.edufront.education',
    SECURE: true,
    SKIN: 'default',
    PORT: 443,
    ALLEXIS_SDK_URL:
      's3-eu-west-1.amazonaws.com/allexis-client-js-development/latest',
    ALLEXIS_APP_PUBLIC_TOKEN: '94db9a1b-fe79-4bf3-958b-23ef821f0b12',
    ALLEXIS_FEEDS: ['30dfa101-9d0c-47e2-a52f-ab429b9c5c5d'],
    KEYCLOAK: {
      BASE_URL:
        'https://devlogin.edufront.education/auth/realms/edufront/protocol/openid-connect/',
      CLIENT_ID: 'edu-angular'
    },
    FROALA_LICENSE: 'dB8A5C5A2A-9H3E2I2B2C6C3E4B5B1D1pBKBOb1a1PQd1ERGRe1B==',
    FEATURES: {
      BASKET: 2
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
