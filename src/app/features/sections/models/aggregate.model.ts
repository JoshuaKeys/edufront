import { ClassesModel } from '../../../shared/models/classes-model';
import { SectionModel } from '../../../shared/models/section.model';
import { ExtendedProfileDTOModel } from 'src/app/shared/models/extended-profiledto.model';

export interface AggregateModel {
  classItem: string;
  sections: { sectionName: string; subjects: ExtendedProfileDTOModel[] }[]
}
