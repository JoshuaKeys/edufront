import { ClassModel } from 'src/app/shared/models/class.model';

export interface ExtendedClassModel extends ClassModel {
  selected?: boolean;
}
