import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ClassesModel } from '../../models/classes-model';

export function removePreviouslySelectedState(classes: ClassesModel[], exclude: number) {
  return classes.map((classItem, idx) => {
    if (exclude !== idx) {
      classItem.class.selected = false;
    }
    return {
      id: classItem.class.id,
      changes: {
        ...classItem
      }
    }
  })
}
