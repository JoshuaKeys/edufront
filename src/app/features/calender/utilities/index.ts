import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../models/class-group.model';

export function clearClassOffGroups(classItem: ClassModel, groups: ClassGroupModel[], skipGroup: ClassGroupModel) {
    return groups.map(group=> {
        if(group.id !== skipGroup.id) {
            const filteredClasses = group.classes.map(groupClassItem=> {
                if(classItem.id === groupClassItem.id) {
                    return undefined;
                }
                return groupClassItem
            }).filter(item => item)
            group.classes = filteredClasses
        }
        return group;
    })
}