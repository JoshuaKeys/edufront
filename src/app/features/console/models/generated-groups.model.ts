import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../../calender/models/class-group.model';

export interface GeneratedGroupsModel {
  classes: ClassModel[],
  groupName: string;
  id?: string;
  draggedOver?: boolean;
}
