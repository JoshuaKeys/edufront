import { ExtendedProfileDTOModel } from './extended-profiledto.model';

export class SectionModel {
  classId: string;
  sections: {
    sectionName: string;
    sectionIdx?: number;
    subjects: ExtendedProfileDTOModel[];
  }[]
}

export interface ISectionModel {
  id: string;
  sectionName: string;
  classId: string;
  studentIds: null;
}
