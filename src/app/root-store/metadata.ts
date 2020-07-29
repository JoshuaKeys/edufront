import { EntityMetadataMap, DefaultDataServiceConfig } from '@ngrx/data';

export const appEntityMetadata: EntityMetadataMap = {
  class: {},
  classSection: {},
  teachers: {},
  subjects: {},
  academicYear: {}
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/api/v1',
  entityHttpResourceUrls: {
    class: {
      entityResourceUrl: '/api/v1/class',
      collectionResourceUrl: '/api/v1/class'
    },
    classSection: {
      entityResourceUrl: '/api/v1/classSection',
      collectionResourceUrl: '/api/v1/classSection'
    },
    teachers: {
      entityResourceUrl: '/api/v1/profile/context/teacher',
      collectionResourceUrl: '/api/v1/profile/context/teacher'
    },
    subjects: {
      entityResourceUrl: '/api/v1/subject',
      collectionResourceUrl: '/api/v1/subject'
    },
    academicYear: {
      entityResourceUrl: '/api/v1/academicYear',
      collectionResourceUrl: '/api/v1/academicYear'
    }
  },
  timeout: 3000 // request timeout
};
