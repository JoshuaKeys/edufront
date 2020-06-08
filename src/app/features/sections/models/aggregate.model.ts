import { ClassesModel } from './classes-model';
import { SectionModel } from './section.model';
import { ExtendedProfileDTOModel } from './extended-profiledto.model';

export interface AggregateModel {
  classItem: string;
  sections: { sectionName: string; subjects: ExtendedProfileDTOModel[] }[]
}
