import { GroupClassMapModel } from './group-class-map.model';
import { ClassModel } from 'src/app/shared/models/class.model';

export interface ClassesAndGroupsModel {
  groupsOfClassesNum?: number;
  inputError?: {
    msg: string,
    value: string
  },
  classes?: ClassModel[],
  modals?: {
    startModal: boolean,
    endModal: boolean
  },
  groupsClassesMap?: GroupClassMapModel[]
}
