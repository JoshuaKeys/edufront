import { ExtendedClassModel } from '../../subjects/models/extend-class.model';

export interface GeneratedGroupsModel {
  classes: ExtendedClassModel[];
  groupName: string;
  id?: string;
  draggedOver?: boolean;
}
