import { ExtendedProfileDTOModel } from './extended-profiledto.model';

export class SectionModel {
  classId: string;
  sections: {
    sectionName: string;
    subjects: ExtendedProfileDTOModel[];
  }[]
}
