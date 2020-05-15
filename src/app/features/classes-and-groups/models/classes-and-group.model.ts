import { GetClassesResponseModel } from './get-classes-response.model';
import { ClassModel } from './class.model'
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
  }
}
