import { createAction, props } from '@ngrx/store';
import { ConsoleAggregatedSectionData } from '../../../models/console-aggregated-section-data';
import { ConsoleSectionModel } from '../../../models/console-section.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { AggregatedResult } from '../../../models/aggregated-result.model';
import { StaffModel } from 'src/app/shared/models/staff.model';

export const fetchSectionData = createAction(
  '[ConsoleSectionsComponent] fetchSectionData',
)
export const fetchSectionDataSuccess = createAction(
  '[ConsoleSectionsEffect] fetchSectionDataSuccess',
  props<{ sections: AggregatedResult[] }>()
)
export const aggregateSectionDataRequest = createAction(
  '[ConsoleSectionsEffect] aggregateSectionDataRequest',
  props<{ sections: ConsoleSectionModel[], classes: ExtendedClassModel[] }>()
)
export const aggregateSectionStudentsDataRequest = createAction(
  '[ConsoleSectionsEffect] aggregateSectionStudentsDataRequest',
  props<{ sections: ConsoleSectionModel[], classes: ExtendedClassModel[] }>()
)
