import { GeneratedGroupsModel } from './generated-groups.model';
import { ExtendedClassModel } from '../../subjects/models/extend-class.model';
import { ConsoleAggregatedSectionData } from './console-aggregated-section-data';
import { AggregatedResult } from './aggregated-result.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { ISubjectWithTeachers } from 'src/app/shared/models/subject.model';

export interface ConsoleClassesStateModel {
  classes?: ExtendedClassModel[];
  classesAndGroups?: {
    assignedClasses?: ExtendedClassModel[];
    groups?: GeneratedGroupsModel[];
    sections?: {
      unalteredAggregate?: AggregatedResult[];
      aggregate?: AggregatedResult[];
      classes?: ExtendedClassModel[];
      students?: StaffModel[];
    };
    subjects?: {
      classes?: ExtendedClassModel[],
      subjects?: ISubjectWithTeachers[]
    }
  };
}
