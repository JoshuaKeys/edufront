import { ClassModel } from 'src/app/shared/models/class.model';

export interface GroupClassMapModel {
  groupName: string;
  id?: string;
  classes: ClassModel[]
}
