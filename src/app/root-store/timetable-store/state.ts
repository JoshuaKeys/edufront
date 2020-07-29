import {
  ITeacher,
  ISubjectWithTeachers
} from 'src/app/shared/models/subject.model';
import {
  TimetableSkeleton,
  IPeriodSavedData
} from 'src/app/core/models/timetable';
import { GetClassesResponseModel } from 'src/app/shared/models/get-classes-response.model';

export interface UIState {
  loading: boolean;
  loaded: boolean;
  error: any;
}

export interface TimetableFeatureState {
  classes: GetClassesResponseModel[];
  sections: any[];
  timetableSkeleton: TimetableSkeleton[];
  subjects: ISubjectWithTeachers[];
  teachers: ITeacher[];
  ui: {
    classes: UIState;
    sections: UIState;
    subjects: UIState;
    teachers: UIState;
    timetableSkeleton: UIState;
    submitting: boolean;
    submitted: boolean;
  };

  timetableAPIData: IPeriodSavedData[];

  timetableData: {
    [key: string]: {
      periodId: string;
      period: any;
      data: any[];
    };
  };
}

export const INITIAL_STATE: TimetableFeatureState = {
  timetableData: {},
  timetableAPIData: [],
  classes: [],
  sections: [],
  timetableSkeleton: [],
  subjects: [],
  teachers: [],
  ui: {
    submitting: false,
    submitted: false,
    classes: {
      loading: false,
      loaded: false,
      error: null
    },
    sections: {
      loading: false,
      loaded: false,
      error: null
    },
    subjects: {
      loading: false,
      loaded: false,
      error: null
    },
    teachers: {
      loading: false,
      loaded: false,
      error: null
    },
    timetableSkeleton: {
      loading: false,
      loaded: false,
      error: null
    }
  }
};
