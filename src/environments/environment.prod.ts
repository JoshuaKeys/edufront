export const environment = {
  production: true,
  config1: {
    IP: 'education.development.allexis.io',
    SECURE: true,
    SKIN: 'default',
    PORT: 443,
    ALLEXIS_SDK_URL:
      's3-eu-west-1.amazonaws.com/allexis-client-js-development/latest',
    ALLEXIS_APP_PUBLIC_TOKEN: '94db9a1b-fe79-4bf3-958b-23ef821f0b12',
    ALLEXIS_FEEDS: ['30dfa101-9d0c-47e2-a52f-ab429b9c5c5d'],
    KEYCLOAK: {
      BASE_URL:
        'https://login.development.allexis.digital/auth/realms/education/protocol/openid-connect/',
      CLIENT_ID: 'edu-angular'
    },
    FROALA_LICENSE: 'dB8A5C5A2A-9H3E2I2B2C6C3E4B5B1D1pBKBOb1a1PQd1ERGRe1B==',
    FEATURES: {
      BASKET: 2
    }
  }
};
