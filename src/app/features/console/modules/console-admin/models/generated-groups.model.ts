import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';

export interface GeneratedGroupsModel {
  classes?: ExtendedClassModel[];
  groupName: string;
  id?: string;
  draggedOver?: boolean;
}
