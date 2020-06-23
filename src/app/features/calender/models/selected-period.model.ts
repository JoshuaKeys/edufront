import { ClassGroupModel } from './class-group.model';
import { DayModel } from './day.model';

export interface SelectedPeriodModel {
    classGroup: ClassGroupModel;
    day: DayModel
}