import { GeneratedGroupsModel } from './generated-groups.model';
import { ExtendedClassModel } from '../../subjects/models/extend-class.model';

export interface ConsoleClassesStateModel {
  classes?: ExtendedClassModel[];
  classesAndGroups?: {
    groups?: GeneratedGroupsModel[]
  };
}
